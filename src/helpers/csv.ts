import { stringify } from 'csv-stringify/browser/esm/sync';

import { Transaction } from '../models';

const stringifyCsv = <T>(transactions: T[]): string =>
  stringify(transactions, {
    header: true,
  });

const mapVerboseTransactionType = (type: string, notes: string): string => {
  if (type === 'Internal Transfer') {
    if (notes === 'Transfer from Savings Wallet to Credit Line Wallet') {
      return 'Internal Transfer / Credit Line Wallet';
    }

    return 'Internal Transfer / Savings Wallet';
  }

  return type;
};

const mapVerboseOrigin = (
  type: string,
  origin: string,
  notes: string,
): string => {
  if (type === 'Internal Transfer') {
    if (notes === 'Transfer from Savings Wallet to Credit Line Wallet') {
      return 'Nexo';
    }

    return 'Nexo Credit Line';
  }

  return origin;
};

const mapVerboseDestination = (
  type: string,
  destination: string,
  notes: string,
): string => {
  if (type === 'Internal Transfer') {
    if (notes === 'Transfer from Savings Wallet to Credit Line Wallet') {
      return 'Nexo Credit Line';
    }

    return 'Nexo';
  }

  return destination;
};

export const createVerboseCsv = (transactions: Transaction[]): string => {
  const verboseTransactions = transactions.map((transaction) => {
    return {
      Id: transaction.id,
      Date: transaction.date,
      Type: mapVerboseTransactionType(transaction.type, transaction.notes),
      Origin: mapVerboseOrigin(
        transaction.type,
        transaction.origin,
        transaction.notes,
      ),
      'Origin Amount': transaction.originAmount,
      'Origin Currency': transaction.originCurrency,
      Destination: mapVerboseDestination(
        transaction.type,
        transaction.origin,
        transaction.notes,
      ),
      'Destination Amount': transaction.destinationAmount,
      'Destination Currency': transaction.destinationCurrency,
      'USD Equivalent': transaction.usdEquivalentAmount,
      Status: transaction.status,
      Notes: transaction.notes,
    };
  });

  return stringifyCsv(verboseTransactions);
};

const formatUsd = (amount: number): string =>
  amount.toLocaleString('en-US', {
    currency: 'USD',
    style: 'currency',
    minimumFractionDigits: 2,
    maximumFractionDigits: 20,
  });

const formatCrypto = (amount: number): string =>
  amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 20,
  });

const joinOriginDestination = (
  origin: string | null,
  destination: string | null,
): string => [origin, destination].filter(Boolean).join('/');

const mapTransactionType = (type: string, notes: string): string => {
  if (type === 'Exchange Top Up') {
    return 'ExchangeDepositedOn';
  }

  if (type === 'Top Up Fiat') {
    return 'DepositToExchange';
  }

  if (type === 'Internal Transfer') {
    if (notes === 'Transfer from Savings Wallet to Credit Line Wallet') {
      return 'TransferOut';
    }

    return 'TransferIn';
  }

  if (type === 'Top Up Crypto') {
    return 'Deposit';
  }

  if (type === 'Additional Interest') {
    return 'InterestAdditional';
  }

  if (type === 'Sell Order') {
    return 'Liquidation';
  }

  if (type === 'Loan Withdrawal') {
    return 'WithdrawalCredit';
  }

  return type;
};

export const createCompliantCsv = (transactions: Transaction[]): string => {
  const compliantTransactions = transactions.map((transaction) => {
    const originCurrency =
      transaction.originCurrency !== 'N/A' ? transaction.originCurrency : null;
    const destinationCurrency =
      transaction.destinationCurrency !== 'N/A'
        ? transaction.destinationCurrency
        : null;
    const currency = joinOriginDestination(originCurrency, destinationCurrency);

    const originAmount = transaction.originAmount
      ? formatCrypto(transaction.originAmount)
      : null;
    const destinationAmount = transaction.destinationAmount
      ? formatCrypto(transaction.destinationAmount)
      : null;
    const amount = joinOriginDestination(originAmount, destinationAmount);

    return {
      Transaction: transaction.id,
      Type: mapTransactionType(transaction.type, transaction.notes),
      Currency: currency,
      Amount: amount,
      'USD Equivalent': formatUsd(transaction.usdEquivalentAmount),
      Details: `${transaction.status} / ${transaction.notes}`,
      'Outstanding Loan': formatUsd(transaction.outstandingLoanAmount),
      'Date / Time': transaction.date,
    };
  });

  return stringifyCsv(compliantTransactions);
};
