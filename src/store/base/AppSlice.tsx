import { SliceCreator } from "..";

export interface IAppSlice {
  setDoneInit: () => void;
  walletAddress: string;
  doneInit: boolean;

  initSubscription: () => {
    [unSubKey: string]: () => void;
  };
}

export const appSlice: SliceCreator<IAppSlice> = (
  set,
  get,
  api,
  setSelf,
  getSelf
) => {
  return {
    walletAddress: "8e9748974cb1025c3d3a5ffcff36f5f1",

    doneInit: false,

    setDoneInit() {
      if (getSelf().doneInit === true) return;
      set((state: any) => {
        state.appSlice.doneInit = true;
      });
    },
    initSubscription: () => {
      return {};
    },
  };
};
