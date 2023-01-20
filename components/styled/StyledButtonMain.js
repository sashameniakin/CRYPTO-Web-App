import styled from "styled-components";

const StyledButtonMain = styled.button`
  margin-top: ${props => (props.test ? "180px" : "")};

  width: ${props => (props.$form ? "" : "300px")};
  height: ${props => (props.$form ? "" : "58px")};
  margin-top: 3px;
  color: white;
  background: rgba(165, 202, 210, 0.75);
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  border-color: white;
`;
export default StyledButtonMain;
