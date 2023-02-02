import styled from "styled-components";

const StyledRegisterButton = styled.button`
  width: 300px;
  height: 58px;
  margin-top: 3px;
  color: white;
  background: rgba(165, 202, 210, 0.75);
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  border-color: white;
  :hover,
  :active,
  :focus {
    background: rgba(165, 202, 210, 0.5);
  }
`;

export default StyledRegisterButton;
