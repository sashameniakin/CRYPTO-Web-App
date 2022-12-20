import styled from "styled-components";
import Close from "../public/images/close.svg";
import Image from "next/image";
import {setGlobalState} from "../state";
import {StyledButton} from "./Popup_bookmarked";
import {useActivities} from "../context/context";

export default function PopupAddBlockchain({trigger}) {
  const {handleSubmitBlockchain} = useActivities();

  function closePopupAdd() {
    setGlobalState("openPopupAddBlockchain", false);
  }

  return (
    trigger && (
      <StyledPopup>
        <StyledPopupInner>
          <FormContainer onSubmit={handleSubmitBlockchain}>
            <StyledButton onClick={() => closePopupAdd()}>
              <Image alt="close" src={Close} />
            </StyledButton>
            <label htmlFor="blockchain">Blockchain:</label>
            <input placeholder="e.g. Optimism" type="text" name="blockchain" />
            <button type="submit">Add blockchain</button>
          </FormContainer>
        </StyledPopupInner>
      </StyledPopup>
    )
  );
}

const FormContainer = styled.form`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: stretch;
  padding: 20px;
  border-radius: 0.8em;
  transition: 0.2s;

  input {
    border: none;
    padding: 8px 20px;
    border-radius: 999px;
    background-color: #ccd;
    font-size: 1rem;
    align-self: center;
    width: 100%;
  }
`;

export const StyledPopup = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${props => (props.primary ? "1" : "2")};
  margin-top: ${props => (props.metamask ? "200px" : "")};
  background-color: ${props => (props.metamask ? "rgba (0, 0, 0, 0.2)" : "")};
`;
const StyledPopupInner = styled.div`
  position: relative;
  border-left: 14px solid #ccd;
  padding: 32px;
  width: 100%;
  z-index: 2;
  background-color: #d3e4e8;
  border-radius: 20px;
  overflow-y: scroll;
  margin-top: 200px;
  border: 1px solid #575757;
`;
