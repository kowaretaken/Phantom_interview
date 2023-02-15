import react from "react";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import { useStore } from "../../store";
import { getAssetList } from "../../features/assetList";
import { useCallback } from "react";

const HeaderContainer = styled(Grid)``;
const BalanceContainer = styled(Grid)``;
const AssetsContainer = styled(Grid)``;

export const Assets = () => {
  const walletAddress = useStore((state) => state.appSlice.walletAddress);
  const assetList = useCallback(() => {
    // Get asset list here.
    return getAssetList({
      page: 0,
      // perPage: number;
      publicKey: walletAddress,
    });
  }, [walletAddress]);
  return (
    <Grid container>
      <HeaderContainer item xs={12}>
        <h3>
          Wallet 1 (
          {`${walletAddress.slice(0, 4)}...${walletAddress.slice(
            walletAddress.length - 5,
            walletAddress.length - 1
          )}`}
          )
        </h3>
      </HeaderContainer>
      <BalanceContainer item xs={12}>
        
      </BalanceContainer>
      <AssetsContainer item xs={12}>
        {assetList.map((asset) => {
          return (
            <div key={asset.assetId}>
              <h4>{asset.assetName}</h4>
              <p>{asset.assetId}</p>
              <p>{asset.assetBalance}</p>
            </div>
          );
        })
        }
      </AssetsContainer>
    </Grid>
  );
};
