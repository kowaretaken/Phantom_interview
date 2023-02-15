/**
 * Creates a store that can be used to manage the state of the application.
 * @returns A store that can be used to manage the state of the application.
 */
import create from 'zustand';
import { persist, devtools, subscribeWithSelector } from 'zustand/middleware';
import merge from 'lodash/merge';
import { immer } from 'zustand/middleware/immer';
import { appSlice, IAppSlice } from './base/AppSlice';
import { WritableDraft } from 'immer/dist/internal';
function callerName() {
  try {
    throw new Error();
  } catch (e: any) {
    try {
      return e.stack.split('at ')[3].split(' ')[0];
    } catch (e) {
      return '';
    }
  }
}

export interface SliceCreator<T> {
  (
    set: SetStore<IStore>,
    get: () => IStore,
    api: any,
    setSelf: SetSelf<T>,
    getSelf: GetSelf<T>
  ): T;
}
export interface ISlice {
  initSubscription: () => {
    [unSubKey: string]: () => void;
  };
}

export interface IStore {
  addSubscriptions: (slicesToAdd: {
    [sliceName: string]: { [unSubKey: string]: () => void };
  }) => void;
  removeSubscriptions: (sliceToRemove: {
    [sliceName: string]: any[] | null;
  }) => void;
  unSubSlices: (
    slicesToUnSub: { [sliceName: string]: any[] | null } | null
  ) => void;
  subscriptions: { [sliceName: string]: { [unSubKey: string]: () => void } };
  appSlice: IAppSlice;
  set: SetStore<IStore>;
}

export type SetStore<T> = (
  nextStateOrUpdater: T | Partial<T> | ((state: WritableDraft<T>) => void),
  shouldReplace?: boolean | undefined,
  action?:
    | string
    | {
        type: unknown;
      }
    | undefined
) => void;
export type SetSelf<T> = (fn: (state: WritableDraft<T>) => void) => void;
export type GetSelf<T> = () => T;

export const useStore = create<
  IStore,
  [
    ['zustand/devtools', never],
    ['zustand/subscribeWithSelector', never],
    ['zustand/immer', never],
    ['zustand/persist', any]
  ]
>(
  devtools(
    subscribeWithSelector(
      immer(
        persist(
          (set: SetStore<IStore>, get: () => IStore, api) => {
            const setter = (slice: any) => (fn: any) =>
              set(fn, false, `${slice.name}: ${callerName()}`);
            return {
              // Store unsubscribe functions, to use for slice unmount.
              subscriptions: {},
              addSubscriptions: (slicesToAdd: IStore['subscriptions']) => {
                const curr = get().subscriptions;
                set(
                  (state: WritableDraft<IStore>) => {
                    state.subscriptions = { ...curr, ...slicesToAdd };
                  },
                  false,
                  'addSubscriptions'
                );
              },
              removeSubscriptions: (slicesToRemove: {
                [sliceName: string]: any[] | null;
              }) => {
                get().unSubSlices(slicesToRemove);
                set(
                  (state: any) => {
                    const draft = state.subscriptions;
                    for (const [sliceName, unSubKeys] of Object.entries(
                      slicesToRemove
                    )) {
                      if (draft[sliceName] !== undefined) {
                        if (unSubKeys === null) delete draft[sliceName];
                        else {
                          for (const unSubKey of unSubKeys) {
                            if (draft[sliceName][unSubKey] !== null) {
                              delete draft[sliceName][unSubKey];
                            }
                          }
                        }
                      }
                    }
                  },
                  false,
                  'removeSubscriptions'
                );
              },
              unSubSlices: (
                slicesToUnSub: { [sliceName: string]: any[] | null } | null
              ) => {
                const subscriptions: IStore['subscriptions'] =
                  get().subscriptions;
                if (subscriptions) {
                  if (slicesToUnSub) {
                    for (const [sliceName, unSubKeys] of Object.entries(
                      slicesToUnSub
                    )) {
                      if (sliceName) {
                        if (unSubKeys) {
                          for (const unSubKey of unSubKeys) {
                            if (unSubKey) {
                              const unSub = subscriptions[sliceName][unSubKey];
                              if (unSub) {
                                unSub();
                              }
                            }
                          }
                        } else {
                          for (const unSubKey of Object.keys(
                            subscriptions[sliceName]
                          )) {
                            const unSub = subscriptions[sliceName][unSubKey];
                            if (unSub) {
                              unSub();
                            }
                          }
                        }
                      } else {
                        for (const [, unSubs] of Object.entries(
                          subscriptions
                        )) {
                          for (const [, unSub] of Object.entries(unSubs)) {
                            unSub();
                          }
                        }
                      }
                    }
                  }
                }
              },
              appSlice: appSlice(
                setter(appSlice),
                get,
                api,
                (fn) =>
                  setter(appSlice)((state: WritableDraft<IStore>) => {
                    fn(state.appSlice);
                  }),
                () => get().appSlice
              ),
              set,
              get,
              api,
            };
          },
          {
            partialize: (state) => {
              return {
                appSlice: {

                },
              };
            },
            name: 'PHANTOM_STORE',
            merge: (persistedState, currentState) =>
              merge(currentState, persistedState),
          }
        )
      )
    )
  )
);
