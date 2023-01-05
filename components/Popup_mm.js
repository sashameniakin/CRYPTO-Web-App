import styled from "styled-components";
import Image from "next/image";
import Close from "../public/images/close.svg";
import {setGlobalState} from "../state";
import StyledCloseButton from "../components/styled/StyledCloseButton";
import StyledPopup from "../components/styled/StyledPopup";

function PopupMM(props) {
  function closePopup() {
    setGlobalState("openMMPopup", false);
  }

  return (
    props.trigger && (
      <StyledPopup metamask>
        <StyledPopupInner>
          <StyledCloseButton onClick={() => closePopup()}>
            <Image alt="close" src={Close}></Image>
          </StyledCloseButton>
          <StyledDiv>
            <p>
              <a href="https://metamask.io/">Install Metamask</a>
            </p>
          </StyledDiv>
        </StyledPopupInner>
      </StyledPopup>
    )
  );
}

export default PopupMM;

const StyledPopupInner = styled.div`
  position: relative;
  padding: 50px;
  background-color: lightslategray;
  color: white;
  border-radius: 20px;
  border-left: 10px solid #ccd;
  opacity: 0.9;
`;

const StyledDiv = styled.div`
  padding: 8px;
  background-color: rgba(165, 202, 210, 0.3);
  box-shadow: 10px 5px 5px rgba(165, 202, 210, 0.3);
`;
