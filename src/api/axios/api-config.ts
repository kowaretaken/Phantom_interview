import axios, { AxiosInstance } from "axios";

export const PhantomAssetListApi: AxiosInstance = axios.create({
  baseURL: `https://api.phantom.app/token-data/`,
});

export const TokenPricesApi: AxiosInstance = axios.create({
  baseURL: `https://api.coingecko.com/api/v3/simple/price`,
});
export interface TokenPricesParams {
  include_24hr_change?: boolean;
  vs_currencies?: number;
  ids: string[];
}

export interface PhantomAssetListParams {
  page?: number;
  perPage?: number;
  publicKey: string;
}
export interface PhantomAssetListResponse {
  page: number;
  perPage: number;
  total: number;
  records: {
    amount: string;
    imageUrl: string;
    mintAddress: string;
    name: string;
    symbol: string;
    tokenAccountAddress: string;
    type: "collectible" | "fungible" | "semi-fungible";
  }[];
}

export interface TokenPricesResponse {
  [key: string]: {
    usd: number;
    usd_24h_change: number | null;
  };
}