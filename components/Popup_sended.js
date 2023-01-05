import styled from "styled-components";
import {setGlobalState} from "../state";
import StyledPopup from "../components/styled/StyledPopup";
import StyledFormContainer from "./styled/StyledFormContainer";

function PopupSended(props) {
  function closePopup() {
    setGlobalState("openPopupSended", false);
  }

  return (
    props.trigger && (
      <StyledPopup>
        <StyledPopupInner>
          <StyledFormContainer>
            <p>Successfully sended to database!</p>
            <button onClick={closePopup}>OK</button>
          </StyledFormContainer>
        </StyledPopupInner>
      </StyledPopup>
    )
  );
}

export default PopupSended;

const StyledPopupInner = styled.div`
  position: relative;
  padding: 32px;
  background-color: lightslategray;
  color: white;
  opacity: 0.9;
  border-left: 10px solid #ccd;
  border-radius: 20px;
  margin-bottom: 150px;
  margin-top: 190px;
  z-index: 100;
`;
