import styled from "styled-components";
import {StyledButton} from "./Popup_bookmarked";
import {StyledImage} from "./Header";
import Archive from "../public/images/archive.svg";
import Delete from "../public/images/delete.svg";
import Details from "../public/images/details.svg";
import {useGlobalState} from "../state";

export default function Task() {
  const [] = useGlobalState();
  function handleDelete(id) {}
  function handleDetails(id) {}

  return (
    <>
      <StyledContainer>
        <StyledButton>
          <StyledImage alt="archive" src={Archive} width="50px" height="50px" />
        </StyledButton>
        <Titel></Titel>
        <StyledFlexContainer>
          <StyledButton onClick={() => handleDelete(id)}>
            <StyledImage
              alt="archive"
              src={Delete}
              width="25px"
              height="25px"
            />
          </StyledButton>
          <StyledButton onClick={() => handleDetails(id)}>
            <StyledImage
              alt="details"
              src={Details}
              width="25px"
              height="25px"
            />
          </StyledButton>
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
const StyledFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
`;
