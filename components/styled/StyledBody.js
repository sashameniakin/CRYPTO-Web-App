import styled from "styled-components";

const StyledBody = styled.main`
  margin-top: 12%;
  margin-bottom: 14%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;

  @media (min-width: 700px) {
    margin-top: 8%;
    margin-bottom: 8%;
  }
  @media (min-width: 1080px) {
    margin-top: 6%;
    margin-bottom: 6%;
  }
`;

export default StyledBody;
