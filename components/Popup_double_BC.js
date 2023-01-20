import styled from "styled-components";
import StyledPopup from "../components/styled/StyledPopup";
import StyledFormContainer from "./styled/StyledFormContainer";
import StyledButtonMain from "./styled/StyledButtonMain";
import {useStates} from "../context/context";

function PopupDouble(props) {
  const {setPopupDouble} = useStates();

  function closePopupDouble() {
    setPopupDouble(false);
  }

  return (
    props.trigger && (
      <StyledPopup>
        <StyledPopupInner>
          <StyledFormContainer>
            <p>This blockchain already exists!</p>
            <StyledButtonMain $form onClick={closePopupDouble}>
              OK
            </StyledButtonMain>
          </StyledFormContainer>
        </StyledPopupInner>
      </StyledPopup>
    )
  );
}

export default PopupDouble;

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