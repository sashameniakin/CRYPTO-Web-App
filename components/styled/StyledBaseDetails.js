import {css} from "styled-components";

const baseDetailsStyle = css`
  color: white;
  opacity: 0.8;
  padding: 5px 8px;
  border-radius: 999px;
  background-color: rgba(165, 202, 210, 0.2);
  margin-left: ${props => (props.description ? "20px" : "")};
  margin-right: ${props => (props.description ? "20px" : "")};
`;

export default baseDetailsStyle;
