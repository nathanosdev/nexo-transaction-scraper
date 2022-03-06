import { FunctionComponent, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

import { runScript } from '../../../helpers';
import { Layout } from '../ui';

export const HomeTab: FunctionComponent = () => {
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    const scrapeTransactions = async () => {
      const result = await runScript('scrape-transactions.js', '');

      setPageTitle(result);
    };

    scrapeTransactions();
  }, []);

  return (
    <Layout>
      <Typography variant="h5" component="h1" gutterBottom>
        {pageTitle}
      </Typography>
    </Layout>
  );
};
