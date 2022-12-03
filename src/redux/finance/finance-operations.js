import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.headers.common.Authorization =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI1YWQzMGMzMS1lOWU0LTQ3ZDMtODEzYi0yMzU0OGE3ODhjODYiLCJpYXQiOjE2Njk2NDEzMjQsImV4cCI6MTAwMDAwMDE2Njk2NDEzMjR9.Vbj1sYtiPhWsvH1dLrH4dCpVVK3RaatJI162J9IqfqY';

export const getAllTransactionsThunk = createAsyncThunk(
  'finance/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        'https://wallet.goit.ua/api/transactions'
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTransactionThunk = createAsyncThunk(
  'finance/addTransaction',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        'https://wallet.goit.ua/api/transactions',
        data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTransactionThunk = createAsyncThunk(
  'finance/deleteTransaction',
  async (transactionId, thunkAPI) => {
    try {
      await axios.delete(
        `https://wallet.goit.ua/api/transactions/${transactionId}`
      );

      return transactionId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editTransactionThunk = createAsyncThunk(
  'finance/editTransaction',
  async (transactionData, thunkAPI) => {
    try {
      const response = await axios.patch(
        `https://wallet.goit.ua/api/transactions/${transactionData.id}`,
        {
          transactionDate: transactionData.date,
          type: transactionData.operation,
          categoryId: transactionData.transaction,
          comment: transactionData.comment,
          amount: transactionData.sum,
        }
      );
      console.log('response.data :>> ', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);