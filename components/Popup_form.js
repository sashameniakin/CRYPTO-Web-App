import styled from "styled-components";
import Close from "../public/images/close.svg";
import Image from "next/image";
import {setGlobalState, useGlobalState} from "../state";
import PopupAddBlockchain from "./Popup_addblockchain";
import AddBlockchain from "../public/images/addBlockchain.svg";
import StyledCloseButton from "../components/styled/StyledCloseButton";
import StyledPopup from "../components/styled/StyledPopup";
import {useActivities, useStates} from "../context/context";
import StyledFormContainer from "./styled/StyledFormContainer";
import StyledButtonMain from "./styled/StyledButtonMain";
import PopupDouble from "./Popup_double_BC";

function PopupForm({trigger}) {
  const {handleSubmit, options} = useActivities();
  const [openAddBlockchain] = useGlobalState("openPopupAddBlockchain");
  const {popupWellDone} = useStates();
  const {popupDouble} = useStates();

  function closePopup() {
    setGlobalState("openForm", false);
  }

  function openPopupAddBlockchain() {
    setGlobalState("openPopupAddBlockchain", true);
  }

  return (
    trigger && (
      <>
        <PopupAddBlockchain trigger={openAddBlockchain}/>
        <PopupDouble trigger={popupDouble} />
        <StyledPopup primary>
          <StyledPopupInner active={openAddBlockchain || popupWellDone || popupDouble}>
            <StyledCloseButton onClick={() => closePopup()}>
              <Image alt="close" src={Close}/>
            </StyledCloseButton>

            <StyledFormContainer onSubmit={handleSubmit}>
              <label htmlFor="titel">Titel:</label>
              <input
                placeholder="e.g. NFT claim"
                type="text"
                name="titel"
                autoComplete="off"
                required
              />
              <label htmlFor="link">Link:</label>
              <input
                placeholder="https://test.de"
                type="url"
                name="link"
                autoComplete="off"
              />
              <label htmlFor="question">Blockchain:</label>
              <StyledSelectContainer>
                <select name="blockchain" required>
                  {options?.map((options, i) => {
                    return <option key={i}>{options.blockchain}</option>;
                  })}
                </select>
                <StyledButtoAddBlockchain onClick={openPopupAddBlockchain}>
                  <StyledImage
                    alt="add blockchain button"
                    src={AddBlockchain}
                  />
                </StyledButtoAddBlockchain>
              </StyledSelectContainer>
              <label htmlFor="date">Date:</label>
              <input type="date" name="date" />
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                name="description"
                autoComplete="off"
                required
              />
              <StyledButtonMain $form type="submit">
                SUBMIT
              </StyledButtonMain>
            </StyledFormContainer>
          </StyledPopupInner>
        </StyledPopup>
      </>
    )
  );
}

export default PopupForm;

const StyledPopupInner = styled.div`
  position: relative;
  color: white;
  padding: 32px;
  width: 98%;
  border-left: 10px solid #ccd;
  background-color: lightslategray;
  opacity: 0.9;
  border-radius: 20px;
  margin-top: 60px;
  filter: ${props => (props.active === true ? "blur(2px)" : "")};
`;
const StyledImage = styled(Image)`
  text-align: center;
`;

const StyledButtoAddBlockchain = styled.button`
  background-color: transparent;
  border: none;
  z-index: 1;
`;

const StyledSelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
