import { isWindowLoaded } from './check-window';

export const pushWindowHistory = (url: string) => {
  if (isWindowLoaded()) {
    window.history.pushState({}, '', url);
  }
};
