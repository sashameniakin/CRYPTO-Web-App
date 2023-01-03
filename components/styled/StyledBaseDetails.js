import {css} from "styled-components";

const baseDetailsStyle = css`
  color: white;
  background-color: #6f5f90;
  opacity: 0.8;
  padding: 5px 14px;
  border-radius: 999px;
  background-color: lightslategray;
  margin-left: ${props => (props.description ? "20px" : "")};
  margin-right: ${props => (props.description ? "20px" : "")};
`;

export default baseDetailsStyle;
