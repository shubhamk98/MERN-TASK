/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import BarChart from "./BarChart";
import axios from "axios";
import PieChart from "./PieChart";
import Statistics from "./Statistics";
import { monthsArr } from "../Tabel";



const AllCharts = () => {
  const [month, setMonth] = useState(1);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [statsData, setStatsData] = useState([]);

  console.log(month);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/CombineData?month=${month}`
        );
        const data = response.data;
        console.log(data);
        setBarChartData(data.barChart);
        setPieChartData(data.pieChart);
        setStatsData(data.statistics);
      } catch (error) {
        console.error("Error fetching bar chart data:", error);
      }
    };

    fetchData();
  }, [month]);

  return (
    <div className="mx-3 md:mx-24">
      <div className=" mx-auto my-20">
        <p className="block mb-2 text-sm font-medium text-gray-900">
          Select an Month
        </p>
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className=" border text-gray-700 text-sm rounded-lg  block w-full p-2.5 font-semibold"
        >
          {monthsArr.map((month) => (
            <option
              key={month.value}
              value={month.value}
              className="text-gray-800 font-semibold "
            >
              {month.name}
            </option>
          ))}
        </select>
      </div>
      <div className="my-10 ">
        <Statistics statsData={statsData} />
      </div>
      <p className="font-bold text-xl my-4 text-center">Bar Chart</p>
      <div className="bg-purple-100 flex justify-center rounded-md">
        <div className="py-12 w-[80%]">
          <BarChart  barChartData={barChartData} />
        </div>
      </div>
      <p className="font-bold text-xl my-4 text-center">Pie Chart</p>
      <div className="bg-purple-100  rounded-md my-10 flex justify-center">
        <div className="py-12">
          <PieChart pieChartData={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default AllCharts;
