import {createGlobalState} from "react-hooks-global-state";

const {setGlobalState, useGlobalState} = createGlobalState({
  metamaskAddress: "",
  openPopup: false,
  isConnecting: false,
  category: "cryptocurrency",
  user: {},
  openForm: false,
  openPopupAddBlockchain: false,
  openMMPopup: false,
  chainId: "",
  isConnected: false,
});

export {useGlobalState, setGlobalState};
