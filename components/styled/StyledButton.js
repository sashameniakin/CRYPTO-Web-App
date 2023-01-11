import styled from "styled-components";

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  padding-top: ${props => (props.task ? "5px" : "")};
`;

export default StyledButton;
