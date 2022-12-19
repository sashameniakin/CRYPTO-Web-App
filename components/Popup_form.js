import styled from "styled-components";
import Close from "../public/images/close.svg";
import Image from "next/image";
import {setGlobalState, useGlobalState} from "../state";
import PopupAddBlockchain from "./Popup_addblockchain";
import AddBlockchain from "../public/images/addBlockchain.svg";
import {useState, useEffect} from "react";
import {StyledButton} from "./Popup_bookmarked";
import {StyledPopup} from "./Popup_addblockchain";
import {useActivities} from "../context/context";

function PopupForm({trigger}) {
  const {handleSubmit, options} = useActivities();
  const [openAddBlockchain] = useGlobalState("openPopupAddBlockchain");
  const [winReady, setWinReady] = useState(false);

  useEffect(() => {
    setWinReady(true);
  }, []);

  function closePopup() {
    setGlobalState("openForm", false);
  }

  function openPopupAddBlockchain() {
    setGlobalState("openPopupAddBlockchain", true);
  }

  return (
    trigger && (
      <>
        {winReady && (
          <PopupAddBlockchain trigger={openAddBlockchain}></PopupAddBlockchain>
        )}

        <StyledPopup primary>
          <StyledPopupInner active={openAddBlockchain}>
            <StyledButton onClick={() => closePopup()}>
              <Image alt="close" src={Close}></Image>
            </StyledButton>

            <StyledButtoAddBlockchain onClick={openPopupAddBlockchain}>
              <StyledImage alt="add blockchain button" src={AddBlockchain} />
            </StyledButtoAddBlockchain>
            <FormContainer onSubmit={handleSubmit}>
              <label htmlFor="titel">Titel:</label>
              <input placeholder="e.g. NFT claim" type="text" name="titel" />
              <label htmlFor="link">Link:</label>
              <input placeholder="https://test.de" type="url" name="link" />
              <label htmlFor="question">Blockchain:</label>
              <select name="blockchain">
                {options?.map((options, i) => {
                  return <option key={i}>{options.blockchain}</option>;
                })}
              </select>
              <label htmlFor="date">Date:</label>
              <input type="date" name="date" />
              <label htmlFor="description">Description:</label>
              <input type="text" name="description" />
              <button type="submit">Add activity!</button>
            </FormContainer>
          </StyledPopupInner>
        </StyledPopup>
      </>
    )
  );
}

export default PopupForm;

const FormContainer = styled.form`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: stretch;
  padding: 20px;
  border-radius: 0.8em;
  opacity: 0.8;
  transition: 0.2s;

  input,
  select {
    border: none;
    padding: 8px 20px;
    border-radius: 999px;
    background-color: #ccd;
    font-size: 1rem;
    align-self: center;
    width: 100%;
  }
  select {
    width: 94%;
    align-self: flex-start;
  }
`;

const StyledPopupInner = styled.div`
  position: relative;
  padding: 32px;
  width: 100%;
  border-left: 14px solid #ccd;
  background-color: #d3e4e8;
  border-radius: 20px;
  margin-top: 60px;
  border: 1px solid #575757;
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
