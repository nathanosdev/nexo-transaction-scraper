import { FunctionComponent, useEffect, useState } from 'react';

import { runScript } from '../helpers';

export const App: FunctionComponent = () => {
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    const scrapeTransactions = async () => {
      const result = await runScript('scrape-transactions.js', '');

      setPageTitle(result);
    };

    scrapeTransactions();
  }, []);

  return (
    <>
      <h1>{pageTitle}</h1>
    </>
  );
};
