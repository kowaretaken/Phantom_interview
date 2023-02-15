import {
  PhantomAssetListApi,
  PhantomAssetListParams,
  PhantomAssetListResponse,
} from "../../api/axios/api-config";

export const getAssetList = async (
  param: PhantomAssetListParams
): Promise<PhantomAssetListResponse> => {
  const { data } = await PhantomAssetListApi.get("", { params: param });
  return data;
};

