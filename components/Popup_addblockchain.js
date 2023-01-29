import styled from "styled-components";
import Close from "../public/images/close.svg";
import Image from "next/image";
import {setGlobalState} from "../state";
import StyledCloseButton from "../components/styled/StyledCloseButton";
import {useActivities} from "../context/context";
import StyledFormContainer from "./styled/StyledFormContainer";
import StyledPopup from "../components/styled/StyledPopup";
import StyledButtonMain from "./styled/StyledButtonMain";

export default function PopupAddBlockchain({trigger}) {
  const {handleSubmitBlockchain} = useActivities();

  function closePopupAdd() {
    setGlobalState("openPopupAddBlockchain", false);
  }

  return (
    trigger && (
      <StyledPopup>
        <StyledPopupInner>
          <StyledFormContainer onSubmit={handleSubmitBlockchain}>
            <StyledCloseButton onClick={() => closePopupAdd()}>
              <Image alt="close" src={Close} />
            </StyledCloseButton>
            <label htmlFor="blockchain">Blockchain:</label>
            <input
              placeholder="e.g. Optimism"
              type="text"
              name="blockchain"
              autoComplete="off"
            />
            <StyledButtonMain $form type="submit">
              Add blockchain
            </StyledButtonMain>
          </StyledFormContainer>
        </StyledPopupInner>
      </StyledPopup>
    )
  );
}

const StyledPopupInner = styled.div`
  position: relative;
  color: white;
  border-left: 10px solid #ccd;
  padding: 32px;
  width: 98%;
  z-index: 2;
  background-color: lightslategray;
  border-radius: 20px;
  overflow-y: scroll;
  margin-top: 200px;
  opacity: 0.9;
`;
