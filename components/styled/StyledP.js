import styled from "styled-components";

const StyledP = styled.p`
  word-break: ${props => (props.id ? "break-all" : "")};
  white-space: normal;
  font-size: x-small;
  color: white;
  padding-left: 10px;
  padding-right: 10px;
  width: auto;
`;

export default StyledP;
