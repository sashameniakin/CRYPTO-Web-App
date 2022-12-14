import styled from "styled-components";
import {StyledButton} from "./Popup_bookmarked";

export default function Task() {
  return (
    <>
      <StyledContainer>
        <StyledButton></StyledButton>
        <Titel></Titel>
        <StyledFlexContainer>
          <StyledButton></StyledButton>
          <StyledButton></StyledButton>
        </StyledFlexContainer>
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  justify-items: center;
  align-items: center;
`;
const Titel = styled.p``;
const StyledFlexContainer = styled.div``;
