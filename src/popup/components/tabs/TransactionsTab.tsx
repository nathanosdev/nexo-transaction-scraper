import { FunctionComponent, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { Layout } from '../ui';
import { Transaction } from '../../../models';

const TransactionList: FunctionComponent<{ transactions: Transaction[] }> = ({
  transactions,
}) => {
  const transactionListItems = transactions.map((transaction) => (
    <ListItem>
      <ListItemText
        primary={transaction.type}
        secondary={
          <>
            <Typography variant="body2">{transaction.date}</Typography>
            {transaction.originAmount > 0 && (
              <Typography variant="body1" color="textPrimary">
                - {transaction.originAmount} {transaction.originCurrency}
              </Typography>
            )}
            <Typography variant="body1" color="textPrimary">
              + {transaction.destinationAmount}{' '}
              {transaction.destinationCurrency}
            </Typography>
            <Typography variant="body2">{transaction.notes}</Typography>
          </>
        }
      />
    </ListItem>
  ));

  return <List sx={{ overflowWrap: 'anywhere' }}>{transactionListItems}</List>;
};

const NoTransactions: FunctionComponent = () => (
  <Typography>
    No transactions scraped yet, please navigate to the Home tab and initiate
    the transaction scraping process.
  </Typography>
);

export const TransactionsTab: FunctionComponent = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTransactions = async () => {
      setIsLoading(true);

      const result = await chrome.storage.local.get('transactions');
      const rawTransactions = result?.transactions ?? '[]';

      try {
        const parsedTransactions = JSON.parse(rawTransactions);
        setTransactions(parsedTransactions);
      } catch (error) {
        console.error('Exception parsing stored transactions', error);
      } finally {
        setIsLoading(false);
      }
    };

    getTransactions();
  }, []);

  return (
    <Layout>
      {isLoading ? (
        <></>
      ) : transactions?.length ? (
        <TransactionList transactions={transactions} />
      ) : (
        <NoTransactions />
      )}
    </Layout>
  );
};
