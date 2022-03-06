import { getCurrentTab } from './current-tab';

export const runScript = async <T>(
  filename: string,
  defaultReturn: T,
): Promise<T> => {
  const tab = await getCurrentTab();
  const tabId = tab?.id;

  if (!tabId) {
    return defaultReturn;
  }

  const frames = await chrome.scripting.executeScript({
    target: { tabId },
    files: [filename],
  });

  return frames?.[0]?.result ?? defaultReturn;
};
