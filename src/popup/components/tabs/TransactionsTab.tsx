import { FunctionComponent } from 'react';
import Typography from '@mui/material/Typography';

import { Layout } from '../ui';

export const TransactionsTab: FunctionComponent = () => (
  <Layout>
    <Typography variant="h5" component="h1" gutterBottom>
      Transactions
    </Typography>
  </Layout>
);
