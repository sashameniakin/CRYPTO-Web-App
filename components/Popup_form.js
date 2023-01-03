import styled from "styled-components";
import Close from "../public/images/close.svg";
import Image from "next/image";
import {setGlobalState, useGlobalState} from "../state";
import PopupAddBlockchain from "./Popup_addblockchain";
import AddBlockchain from "../public/images/addBlockchain.svg";
import StyledCloseButton from "../components/styled/StyledCloseButton";
import StyledPopup from "../components/styled/StyledPopup";
import {useActivities} from "../context/context";
import StyledFormContainer from "./styled/StyledFormContainer";

function PopupForm({trigger}) {
  const {handleSubmit, options} = useActivities();
  const [openAddBlockchain] = useGlobalState("openPopupAddBlockchain");

  function closePopup() {
    setGlobalState("openForm", false);
  }

  function openPopupAddBlockchain() {
    setGlobalState("openPopupAddBlockchain", true);
  }

  return (
    trigger && (
      <>
        <PopupAddBlockchain trigger={openAddBlockchain}></PopupAddBlockchain>
        <StyledPopup primary>
          <StyledPopupInner active={openAddBlockchain}>
            <StyledCloseButton onClick={() => closePopup()}>
              <Image alt="close" src={Close}></Image>
            </StyledCloseButton>

            <StyledButtoAddBlockchain onClick={openPopupAddBlockchain}>
              <StyledImage alt="add blockchain button" src={AddBlockchain} />
            </StyledButtoAddBlockchain>
            <StyledFormContainer onSubmit={handleSubmit}>
              <label htmlFor="titel">Titel:</label>
              <input
                placeholder="e.g. NFT claim"
                type="text"
                name="titel"
                required
              />
              <label htmlFor="link">Link:</label>
              <input placeholder="https://test.de" type="url" name="link" />
              <label htmlFor="question">Blockchain:</label>
              <select name="blockchain" required>
                {options?.map((options, i) => {
                  return <option key={i}>{options.blockchain}</option>;
                })}
              </select>
              <label htmlFor="date">Date:</label>
              <input type="date" name="date" />
              <label htmlFor="description">Description:</label>
              <input type="text" name="description" required />
              <button type="submit">Add activity!</button>
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
  border-left: 14px solid #ccd;
  background-color: lightslategray;
  opacity: 0.9;
  border-radius: 20px;
  margin-top: 60px;
  filter: ${props => (props.active === true ? "blur(2px)" : "")};
`;
const StyledImage = styled(Image)`
  text-align: center;
  margin-top: 3px;
`;

const StyledButtoAddBlockchain = styled.button`
  position: absolute;
  background-color: transparent;
  border: none;
  top: 227px;
  right: 46px;
  z-index: 1;
`;
