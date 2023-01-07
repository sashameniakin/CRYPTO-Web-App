import styled from "styled-components";
/* import {setGlobalState} from "../state"; */
import StyledPopup from "../components/styled/StyledPopup";
import StyledFormContainer from "./styled/StyledFormContainer";
import StyledButtonMain from "./styled/StyledButtonMain";
import {useStates} from "../context/context";

function PopupWellDone(props) {
  /*   function closePopup() {
    setGlobalState("openPopupWellDone", false);
  } */
  const {setPopupWellDone} = useStates();

  function closePopupWellDone() {
    setPopupWellDone(false);
  }

  return (
    props.trigger && (
      <StyledPopup>
        <StyledPopupInner>
          <StyledFormContainer>
            <p>Well done!</p>
            <StyledButtonMain form onClick={closePopupWellDone}>
              OK
            </StyledButtonMain>
          </StyledFormContainer>
        </StyledPopupInner>
      </StyledPopup>
    )
  );
}

export default PopupWellDone;

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
