import { getCurrentTab } from './current-tab';

export const runScript = async <T>(
  filename: string,
  defaultReturn: T,
): Promise<T> => {
  const tab = await getCurrentTab();
  const tabId = tab?.id ?? 0;

  const frames = await chrome.scripting.executeScript({
    target: { tabId },
    files: [filename],
  });

  console.log('Frames', frames);

  return frames?.[0]?.result ?? (defaultReturn as T);
};
