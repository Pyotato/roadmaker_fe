import { consoleLog } from './console-log';

export const setItem = (key: string, item: unknown) => {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(item));
    }
  } catch (err) {
    consoleLog('local storage setItem error:', err);
  }
};

export const getItem = (key: string) => {
  try {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(key);
    }
  } catch (err) {
    consoleLog('local storage getItem error:', err);
  }
};

export const removeItem = (key: string) => {
  try {
    if (typeof window !== 'undefined') {
      return window.localStorage.removeItem(key);
    }
  } catch (err) {
    consoleLog('local storage removeItem error:', err);
  }
};
