import { useEffect, useState } from 'react';
import { Transaction } from '../models';

const getStoredTransactions = async () => {
  const result = await chrome.storage.local.get('transactions');
  const rawTransactions = result?.transactions ?? '[]';

  try {
    return JSON.parse(rawTransactions);
  } catch (error) {
    console.error('Exception parsing stored transactions', error);
    return [];
  }
};

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const getTransactions = async () => {
      const result = await getStoredTransactions();
      setTransactions(result);
    };

    getTransactions();
    chrome.storage.onChanged.addListener(getTransactions);

    return () => {
      chrome.storage.onChanged.removeListener(getTransactions);
    };
  }, []);

  return transactions;
};
