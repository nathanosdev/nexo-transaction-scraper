const formatDate = (dateObj: Date): string => {
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();

  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${date}-${hours}-${minutes}`;
};

export const createFileDownlad = (content: string): void => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const date = formatDate(new Date());

  chrome.downloads.download({
    url,
    filename: `nexo-transactions-${date}.csv`,
    saveAs: true,
  });
};
