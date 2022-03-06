import { FunctionComponent, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import {
  getCurrentTab,
  isNexoTransactionsTab,
  runScript,
} from '../../../helpers';
import { Transaction } from '../../../models';
import { Layout } from '../ui';

const CorrectTab: FunctionComponent = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isScraping, setIsScraping] = useState(false);

  const onGetTransactionsClicked = () => {
    const scrapeTransactions = async () => {
      setIsScraping(true);
      const result = await runScript<Transaction[]>(
        'scrape-transactions.js',
        [],
      );

      setIsScraping(false);
      setTransactions(result);
    };

    scrapeTransactions();
  };

  useEffect(() => {
    const storeTransactions = async () => {
      await chrome.storage.sync.set({
        transactions: JSON.stringify(transactions),
      });
    };

    if (transactions?.length) {
      storeTransactions();
    }
  }, [transactions]);

  return (
    <Button
      sx={{ width: '100%' }}
      variant="contained"
      color="primary"
      size="large"
      onClick={onGetTransactionsClicked}
      disabled={isScraping}
    >
      {isScraping ? <CircularProgress /> : 'Get Transactions'}
    </Button>
  );
};

const IncorrectTab: FunctionComponent = () => (
  <Typography>
    Transactions not found on the current page, please navigate to the Nexo
    Transactions page.
  </Typography>
);

export const HomeTab: FunctionComponent = () => {
  const [isCorrectTab, setIsCorrectTab] = useState(false);

  useEffect(() => {
    const getIsCorrectTab = async () => {
      const currentTab = await getCurrentTab();

      setIsCorrectTab(isNexoTransactionsTab(currentTab));
    };

    getIsCorrectTab();
  }, []);

  return (
    <Layout>
      <Typography variant="h5" component="h1" gutterBottom>
        Nexo Transaction Scraper
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingX: 2,
        }}
      >
        {isCorrectTab ? <CorrectTab /> : <IncorrectTab />}
      </Box>
    </Layout>
  );
};
