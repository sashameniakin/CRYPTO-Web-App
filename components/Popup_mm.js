import styled from "styled-components";
import Image from "next/image";
import Close from "../public/images/close.svg";
import {setGlobalState} from "../state";

function PopupMM(props) {
  function closePopup() {
    setGlobalState("openMMPopup", false);
  }

  return props.trigger ? (
    <StyledPopup>
      <StyledPopupInner>
        <StyledButton onClick={() => closePopup()}>
          <Image alt="close" src={Close}></Image>
        </StyledButton>
        <StyledDiv>
          <p>
            <a href="https://metamask.io/">Install Metamask</a>
          </p>
        </StyledDiv>
      </StyledPopupInner>
    </StyledPopup>
  ) : (
    ""
  );
}

export default PopupMM;

const StyledPopup = styled.div`
  position: fixed;
  width: 100%;
  background-color: rgba (0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
  /* filter: blur(5px); */
`;
const StyledPopupInner = styled.div`
  position: relative;
  padding: 50px;
  background-color: #d3e4e8;
  border-radius: 20px;
`;
const StyledButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: transparent;
  border: none;
`;

const StyledDiv = styled.div`
  padding: 8px;
  background-color: rgba(165, 202, 210, 0.3);
  box-shadow: 10px 5px 5px rgba(165, 202, 210, 0.3);
`;
