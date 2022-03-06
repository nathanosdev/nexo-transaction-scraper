export const getCurrentTab = async (): Promise<chrome.tabs.Tab> => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  return tab;
};

export const isNexoTransactionsTab = (tab: chrome.tabs.Tab): boolean =>
  tab?.url === 'https://platform.nexo.io/transactions' ||
  tab?.url === 'https://platform.nexo.io/transactions/';
