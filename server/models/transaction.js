import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
  id: Number,
  title: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  sold: Boolean,
  dateOfSale: Date,
});

const Transaction = model('Transaction', transactionSchema);

export default Transaction;
