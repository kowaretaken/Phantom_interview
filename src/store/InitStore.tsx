/**
 * The main app component.
 * @returns None
 */
import React from 'react';
import { useStore } from '.';
import { useInitSubscribeSlices } from './hooks';

function InitStore() {
  // Initialize Zustand store here.
  const subscribeSlices = useInitSubscribeSlices();
  const setDoneInit = useStore((state) => state.appSlice.setDoneInit);


  React.useEffect(() => {
    subscribeSlices(setDoneInit);
  }, []);

  return <></>;
}

export default InitStore;
