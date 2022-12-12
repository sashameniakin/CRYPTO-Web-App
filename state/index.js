import {createGlobalState} from "react-hooks-global-state";

const {setGlobalState, useGlobalState} = createGlobalState({
  metamaskAddress: "",
  openPopup: false,
  openMMPopup: false,
  category: "cryptocurrency",
  user: {},
  openForm: false,
  openPopupAddBlockchain: false,
});

export {useGlobalState, setGlobalState};
