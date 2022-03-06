import { Transaction } from '../models';

/**
 * This function will be injected into the active page,
 * so everything that this function references (except typescript models)
 * must be included in this function's scope.
 */
(async () => {
  const timeoutPromise = async (timeout: number): Promise<void> =>
    new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });

  const waitFor = async <T>(
    predicate: () => T | null | undefined,
    timeout = 100,
  ): Promise<T> => {
    let result = null;

    while (!result) {
      result = predicate();
      await timeoutPromise(timeout);
    }

    return result;
  };

  const getAmountParts = (amountString: string): [number, string] => {
    if (!amountString?.length) {
      return [0, 'N/A'];
    }
    const parts = amountString.split(' ');

    const amount = Number(`${parts[0]}${parts[1]}`);

    return [isNaN(amount) ? 0 : amount, parts[3] || 'N/A'];
  };

  const formatDate = (dateObj: Date): string => {
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();

    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
  };

  /**
   * Exceptions thrown inside this function are swallowed,
   * so they need to be caught and manually logged to the
   * console.
   */
  try {
    const transactionRows =
      document.querySelectorAll<HTMLTableRowElement>('table tr');

    if (!transactionRows?.length) {
      return [];
    }

    const transactions: Transaction[] = [];

    for (const transactionRow of transactionRows) {
      transactionRow.click();
      const modalElement = await waitFor(() =>
        document.querySelector('.Modal.TransactionDetails'),
      );

      const transactionType = await waitFor(
        () => modalElement.querySelector('header > h6')?.textContent,
      );

      const dataRows = modalElement.querySelectorAll('main > div');
      if (!dataRows?.length) {
        continue;
      }

      const transaction: Transaction = {
        id: '',
        type: transactionType,
        status: 'approved',
        date: '',
        origin: '',
        originAmount: 0,
        originCurrency: '',
        destination: '',
        destinationAmount: 0,
        destinationCurrency: '',
        usdEquivalentAmount: 0,
        outstandingLoanAmount: 0,
        notes: '',
      };
      const amountRow = dataRows[0];

      const transactionDetailsRow = dataRows[2];
      transaction.id =
        transactionDetailsRow?.children?.[0]?.children?.[1]?.children?.[0]
          ?.textContent ?? '';

      const dateStatusRow = dataRows[1];

      const dateString =
        dateStatusRow?.children?.[0]?.textContent?.replace('•', '') ?? '';
      const date = new Date(dateString);
      transaction.date = formatDate(date);

      transaction.status =
        dateStatusRow?.children?.[1]?.children?.[0]?.textContent?.toLowerCase() ??
        'approved';

      let notesRow = dataRows[dataRows.length - 1];
      switch (transactionType) {
        case 'Interest': {
          notesRow = dataRows[3];
          break;
        }
      }
      transaction.notes = notesRow?.children?.[1]?.textContent ?? '';

      switch (transactionType) {
        case 'Top Up Crypto':
        case 'Exchange Top Up': {
          transaction.origin = '';
          break;
        }

        case 'Exchange Cashback':
        case 'Interest':
        case 'Exchange': {
          transaction.origin = 'Nexo';
          break;
        }
      }

      transaction.destination = 'Nexo';

      switch (transactionType) {
        case 'Top Up Crypto':
        case 'Exchange Cashback':
        case 'Loan Withdrawal':
        case 'Interest':
        case 'Sell Order':
        case 'Internal Transfer': {
          const usdEquivalentAmountString =
            amountRow?.children?.[2]?.textContent ?? '';
          const [usdEquivalentAmount] = getAmountParts(
            usdEquivalentAmountString,
          );

          transaction.usdEquivalentAmount = usdEquivalentAmount;
          break;
        }
      }

      switch (transactionType) {
        case 'Top Up Crypto':
        case 'Exchange Top Up':
        case 'Exchange Cashback':
        case 'Interest':
        case 'Additional Interest':
        case 'Loan Withdrawal':
        case 'Repayment':
        case 'Sell Order':
        case 'Top Up Fiat':
        case 'Internal Transfer': {
          const destinationAmountString =
            amountRow?.children?.[1]?.textContent ?? '';

          const [destinationAmount, destinationCurrency] = getAmountParts(
            destinationAmountString,
          );

          transaction.originAmount = 0;
          transaction.originCurrency = 'N/A';
          transaction.destinationAmount = destinationAmount;
          transaction.destinationCurrency = destinationCurrency;
          break;
        }

        case 'Exchange': {
          const destinationAmountString =
            amountRow?.children?.[1]?.textContent ?? '';
          const originAmountString =
            amountRow?.children?.[2]?.textContent ?? '';

          const [originAmount, originCurrency] =
            getAmountParts(originAmountString);
          const [destinationAmount, destinationCurrency] = getAmountParts(
            destinationAmountString,
          );

          transaction.originAmount = originAmount;
          transaction.originCurrency = originCurrency;
          transaction.destinationAmount = destinationAmount;
          transaction.destinationCurrency = destinationCurrency;
          break;
        }
      }

      transactions.push(transaction);

      const closeElement = await waitFor(() =>
        document.querySelector<HTMLAnchorElement>('a.close'),
      );
      closeElement.click();
      await waitFor(() => !document.querySelector('.Portal.backdrop'));
    }

    return transactions;
  } catch (error) {
    console.error('Error in scrape-transactions.ts script', error);
    return [];
  }
})();
