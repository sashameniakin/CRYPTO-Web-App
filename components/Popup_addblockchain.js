import styled from "styled-components";
import Close from "../public/images/close.svg";
import Image from "next/image";
import {setGlobalState} from "../state";
import {useState} from "react";

export default function PopupAddBlockchain({trigger, passData = () => {}}) {
  let [options, setOptions] = useState([
    {id: 0, blockchain: "Ethereum"},
    {id: 1, blockchain: "Polygon"},
    {id: 2, blockchain: "BSC"},
    {id: 3, blockchain: "Optimism"},
  ]);

  function closePopupAdd() {
    setGlobalState("openPopupAddBlockchain", false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const {blockchain} = form.elements;
    const newBlockchain = {
      id: options.length + 1,
      blockchain: blockchain.value,
    };
    setOptions(options => {
      return [newBlockchain, ...options];
    });
    form.reset();
    blockchain.focus();
  }
  passData(options);

  return trigger ? (
    <>
      <StyledPopup>
        <StyledPopupInner>
          <FormContainer onSubmit={handleSubmit}>
            <StyledButton onClick={() => closePopupAdd()}>
              <Image alt="close" src={Close}></Image>
            </StyledButton>
            <label htmlFor="blockchain">Blockchain:</label>
            <input placeholder="e.g. Optimism" type="text" name="blockchain" />
            <button type="submit">Add blockchain</button>
          </FormContainer>
        </StyledPopupInner>
      </StyledPopup>
    </>
  ) : (
    ""
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

const StyledButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: transparent;
  border: none;
  z-index: 2;
`;
const StyledPopup = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
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
`;
