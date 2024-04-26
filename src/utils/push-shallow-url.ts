import { isWindowLoaded } from './check-window';

export const pushShallowUrl = (url: string) => {
  if (isWindowLoaded()) {
    window.history.pushState({}, '', url);
  }
};
