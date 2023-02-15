import { useEffect, useState } from 'react';

/*
  ~ What it does? ~

  Enables you to keep track of events

*/

export default function useEventListener(
  contract,
  eventName,
  provider,
  startBlock,
  args
) {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    if (typeof provider !== 'undefined' && typeof startBlock !== 'undefined') {
      // if you want to read _all_ events from your contracts, set this to the block number it is deployed
      provider.resetEventsBlock(startBlock);
    }
    if (contract) {
      try {
        contract.on(eventName, (...args) => {
          const blockNumber = args[args.length - 1].blockNumber;
          setUpdates((messages) => [
            { blockNumber, ...args.pop().args },
            ...messages,
          ]);
        });
        return () => {
          contract.removeListener(eventName);
        };
      } catch (e) {
        console.log(e);
      }
    }
  }, [provider, startBlock, contract, eventName]);

  return updates;
}
