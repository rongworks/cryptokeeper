export const ACTIONS={
  ADD_ASSET: "ADD_ASSET",
  SAVE_ASSETS: "SAVE_ASSETS",
  REMOVE_ASSETS: "REMOVE_ASSETS",
  DELETE_ASSET: "DELETE_ASSET"
};
export const addAsset = asset => ({ type: ACTIONS.ADD_ASSET, payload: asset });
export const saveAssets = assets => ({ type: ACTIONS.SAVE_ASSETS, payload: {} });
export const removeAssets = assets => ({ type: ACTIONS.REMOVE_ASSETS, payload: {} });
export const deleteAsset = asset => ({ type: ACTIONS.DELETE_ASSET, payload: asset });
