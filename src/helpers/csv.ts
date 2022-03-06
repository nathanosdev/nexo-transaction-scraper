import { stringify } from 'csv-stringify/browser/esm/sync';
import { Transaction } from '../models';

const stringifyCsv = <T>(transactions: T[]): string =>
  stringify(transactions, {
    header: true,
  });

export const createVerboseCsv = (transactions: Transaction[]): string =>
  stringifyCsv(transactions);

export const createCompliantCsv = (transactions: Transaction[]): string => {
  const compliantTransactions = transactions.map((transaction) => transaction);

  return stringifyCsv(compliantTransactions);
};
