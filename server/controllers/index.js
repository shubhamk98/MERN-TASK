import axios from "axios";
import Transaction from "../models/transaction.js";

export const fetchDataAndInsert = async (req, res) => {
    try {
        console.log("Running");
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;
        console.log(transactions);

        await Transaction.insertMany(transactions);
        res.status(201).json({
            success: true,
            message: "Data seeded successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to seed into database",
            error: error
        })
    }
}

export const getTransactions = async (req, res) => {
    try {
        const { page = 1, perPage = 10, search = '', month } = req.query;
        const searchRegex = new RegExp(search, 'i');

        const query = {
            $or: [
                { title: searchRegex },
                { description: searchRegex },
                { category: searchRegex },

            ]
        };

        if (!isNaN(Number(search))) {
            let searchPrice = (search);
            
            
            query.$or.push({
                price: {
                    $eq: searchPrice,
                }
            });
        }


        if (month) {
            query.$expr = {
                $eq: [{ $month: "$dateOfSale" }, Number(month)]
            };
        }


        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(Number(perPage));

        const total = await Transaction.countDocuments(query);

        res.json({
            transactions,
            total,
            page: Number(page),
            perPage: Number(perPage),
            totalPages: Math.ceil(total / perPage),
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};




export const getStatisticsByMonth = async (req, res, internalCall = false) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.status(400).json({ error: 'Month is required' });
        }

        const monthNumber = Number(month);

        if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
            return res.status(400).json({ error: 'Invalid month' });
        }

        const pipeline = [
            {
                $match: {
                    $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
                }
            },
            {
                $facet: {
                    totalSaleAmount: [
                        {
                            $group: {
                                _id: null,
                                totalAmount: { $sum: "$price" }
                            }
                        }
                    ],
                    totalSoldItems: [
                        {
                            $group: {
                                _id: null,
                                count: { $sum: 1 }
                            }
                        }
                    ],
                    totalNotSoldItems: [
                        {
                            $match: { sold: false }
                        },
                        {
                            $group: {
                                _id: null,
                                count: { $sum: 1 }
                            }
                        }
                    ]
                }
            }
        ];

        const result = await Transaction.aggregate(pipeline);

        const totalSaleAmount = result[0].totalSaleAmount[0]?.totalAmount || 0;
        const totalSoldItems = result[0].totalSoldItems[0]?.count || 0;
        const totalNotSoldItems = result[0].totalNotSoldItems[0]?.count || 0;
        if (internalCall) return {
            totalSaleAmount,
            totalSoldItems,
            totalNotSoldItems,
        };

        res.json({
            totalSaleAmount,
            totalSoldItems,
            totalNotSoldItems,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};





export const getBarChartData = async (req, res, internalCall = false) => {
    try {

        const { month } = req.query;

        if (!month) {
            return res.status(400).json({ error: 'Month is required' });
        }

        const monthNumber = Number(month);

        if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
            return res.status(400).json({ error: 'Invalid month' });
        }

        const priceRanges = [
            { label: "0-100", min: 0, max: 100, count: 0 },
            { label: "101-200", min: 101, max: 200, count: 0 },
            { label: "201-300", min: 201, max: 300, count: 0 },
            { label: "301-400", min: 301, max: 400, count: 0 },
            { label: "401-500", min: 401, max: 500, count: 0 },
            { label: "501-600", min: 501, max: 600, count: 0 },
            { label: "601-700", min: 601, max: 700, count: 0 },
            { label: "701-800", min: 701, max: 800, count: 0 },
            { label: "801-900", min: 801, max: 900, count: 0 },
            { label: "901-above", min: 901, max: Infinity, count: 0 }
        ];

        const transactions = await Transaction.find({
            $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
        });


        transactions.forEach(transaction => {
            const price = transaction.price;
            for (const range of priceRanges) {
                if (price >= range.min && price < range.max) {
                    range.count += 1;
                    break;
                }
            }
        });

        const chartData = priceRanges.map(range => ({
            range: range.label,
            count: range.count
        }));

        if (internalCall) return chartData;


        res.json(chartData);

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};



export const getPieChartData = async (req, res, internalCall = false) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.status(400).json({ error: 'Month is required' });
        }

        const monthNumber = Number(month);

        if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
            return res.status(400).json({ error: 'Invalid month' });
        }

        const transactions = await Transaction.find({
            $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
        });

        const resultMap = {};


        transactions.forEach(transaction => {
            if (!resultMap[transaction.category]) {
                resultMap[transaction.category] = 0;
            }
            resultMap[transaction.category]++;
        });


        const pieChartData = Object.keys(resultMap).map(category => ({
            category: category,
            count: resultMap[category]
        }));

        if (internalCall) return pieChartData;

        res.json(pieChartData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};




export const getCombinedData = async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.status(400).json({ error: 'Month is required' });
        }

        const statisticsData = await getStatisticsByMonth(req, res, true);
        const barChartData = await getBarChartData(req, res, true);
        const pieChartData = await getPieChartData(req, res, true);


        const combinedData = {
            statistics: statisticsData,
            barChart: barChartData,
            pieChart: pieChartData
        };

        res.json(combinedData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};