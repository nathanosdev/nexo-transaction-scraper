export const getStoredTransactions = async () => {
  const result = await chrome.storage.local.get('transactions');
  const rawTransactions = result?.transactions ?? '[]';

  try {
    return JSON.parse(rawTransactions);
  } catch (error) {
    console.error('Exception parsing stored transactions', error);
    return [];
  }
};
