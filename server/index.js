import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import transactionsRoutes from "./routes/transactions.js"
import cors from 'cors'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const URL = process.env.MONGODB_URL;

mongoose.connect(URL)
    .then(() => console.log("Database connected!!!"))
    .catch((error) => {
        console.log("DB Connection Error");
        console.error(error);
        process.exit(1);
    });

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send('Server Up and running!!');
});



app.listen(PORT, () => {
    console.log(`Server started at Port ${PORT}`);
});


app.use('/api', transactionsRoutes)
