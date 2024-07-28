import express from "express";
import { fetchDataAndInsert, getBarChartData, getCombinedData, getPieChartData, getStatisticsByMonth, getTransactions } from "../controllers/index.js";

const router = express.Router();

router.get('/seed', fetchDataAndInsert)
router.get('/all', getTransactions); 
router.get('/statistics', getStatisticsByMonth);
router.get('/barChart', getBarChartData);
router.get('/pieChart', getPieChartData);
router.get('/CombineData', getCombinedData);


export default router;