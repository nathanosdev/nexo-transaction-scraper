import { FunctionComponent, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { Layout } from '../ui';
import { Transaction } from '../../../models';
import {
  createCompliantCsv,
  createFileDownlad,
  createVerboseCsv,
  useTransactions,
} from '../../../helpers';

const ExportCompliantTransactions: FunctionComponent<{
  transactions: Transaction[];
}> = ({ transactions }) => {
  const [exportingTransactions, setExportingTransactions] = useState(false);

  const onExportTransactionsClicked = () => {
    setExportingTransactions(true);

    const csv = createCompliantCsv(transactions);
    createFileDownlad(csv);

    setExportingTransactions(false);
  };

  return (
    <>
      <Button
        sx={{ width: '100%', marginBottom: 1 }}
        variant="contained"
        color="primary"
        size="large"
        onClick={onExportTransactionsClicked}
        disabled={!transactions?.length || exportingTransactions}
      >
        {exportingTransactions ? (
          <CircularProgress />
        ) : (
          'Export compliant transactions'
        )}
      </Button>

      <Typography variant="body2" color="GrayText" sx={{ marginBottom: 2 }}>
        This will export all locally stored transactions as CSV file in a format
        that is compliant with the Nexo export format. This is best used when
        you want to import the transactions into 3rd party tools that rely on
        Nexo's format.
      </Typography>
    </>
  );
};

const ExportVerboseTransactions: FunctionComponent<{
  transactions: Transaction[];
}> = ({ transactions }) => {
  const [exportingTransactions, setExportingTransactions] = useState(false);

  const onExportTransactionsClicked = async () => {
    setExportingTransactions(true);

    const csv = createVerboseCsv(transactions);
    createFileDownlad(csv);

    setExportingTransactions(false);
  };

  return (
    <>
      <Button
        sx={{ width: '100%', marginBottom: 1 }}
        variant="contained"
        color="secondary"
        size="large"
        onClick={onExportTransactionsClicked}
        disabled={!transactions?.length || exportingTransactions}
      >
        {exportingTransactions ? (
          <CircularProgress />
        ) : (
          'Export verbose transactions'
        )}
      </Button>

      <Typography variant="body2" color="GrayText" sx={{ marginBottom: 2 }}>
        This will export all locally stored transactions as a CSV file with as
        much information as possible. Best for personal use in spreadsheets or
        other homegrown tools.
      </Typography>
    </>
  );
};

const DeleteTransactions: FunctionComponent<{
  transactions: Transaction[];
}> = ({ transactions }) => {
  const [deletingTransactions, setDeletingTransactions] = useState(false);

  const onDeleteTransactionsClicked = async () => {
    setDeletingTransactions(true);
    await chrome.storage.local.remove('transactions');
    setDeletingTransactions(false);
  };

  return (
    <>
      <Button
        sx={{ width: '100%', marginBottom: 1 }}
        variant="contained"
        color="warning"
        size="large"
        onClick={onDeleteTransactionsClicked}
        disabled={!transactions?.length || deletingTransactions}
      >
        {deletingTransactions ? (
          <CircularProgress />
        ) : (
          'Remove stored transactions'
        )}
      </Button>

      <Typography variant="body2" color="GrayText" sx={{ marginBottom: 2 }}>
        This will remove all the transactions that are stored locally in this
        extension's storage space.
      </Typography>
    </>
  );
};

export const ExportTab: FunctionComponent = () => {
  const transactions = useTransactions();

  return (
    <Layout>
      <ExportCompliantTransactions transactions={transactions} />
      <ExportVerboseTransactions transactions={transactions} />
      <DeleteTransactions transactions={transactions} />
    </Layout>
  );
};
