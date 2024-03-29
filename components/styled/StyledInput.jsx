import styled from "styled-components";

const StyledInput = styled.input`
  background: rgba(165, 202, 210, 0.2);
  /* box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25); */
  border: ${props => (props.white ? "1px solid white" : "2px solid red")};
  border-radius: 4px;
  width: 300px;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  margin-top: 3px;
  ::placeholder {
    color: rgba(255, 255, 255, 0.45);
  }
`;

export default StyledInput;
