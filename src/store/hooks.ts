import { useCallback } from 'react';
import { IStore, useStore } from './index';

export function useInitSubscribeSlices(): (setSubscribed?: any) => void {
  const {
    addSubscriptions,
    subscriptions,
    removeSubscriptions,
    unSubSlices,
    ...slices
  } = useStore((state: IStore) => state);
  return useCallback((setSubscribed: any) => {
    if (slices) {
      const subs: {
        [sliceName: string]: { [unSubKey: string]: () => void };
      } = {};
      for (const [key, slice] of Object.entries(slices)) {
        const initSubscription: Function =
          slice['initSubscription' as keyof object];
        if (initSubscription) {
          const unSubMap = initSubscription();
          if (unSubMap) {
            subs[key] = unSubMap;
          }
        }
      }
      addSubscriptions(subs);
      setSubscribed && setSubscribed(true);
    }
  }, []);
}

export function useUnSubSlices(): (
  slicesToUnsub: { [sliceName: string]: string[] | null }[] | null
) => void {
  const subscriptions = useStore((state: IStore) => state.subscriptions);
  return useCallback(
    (slicesToUnSub: { [sliceName: string]: string[] | null }[] | null) => {
      if (subscriptions) {
        if (slicesToUnSub) {
          for (const [sliceName, unSubKeys] of Object.entries(slicesToUnSub)) {
            if (sliceName && unSubKeys && unSubKeys[sliceName]) {
              for (const unSubKey of unSubKeys[sliceName]!) {
                if (unSubKey) {
                  const unSub = subscriptions[sliceName][unSubKey];
                  if (unSub) {
                    unSub();
                  }
                }
              }
            } else {
              for (const [, unSubs] of Object.entries(subscriptions)) {
                for (const [, unSub] of Object.entries(unSubs)) {
                  unSub();
                }
              }
            }
          }
        }
      }
    },
    [subscriptions]
  );
}
