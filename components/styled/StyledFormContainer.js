import styled from "styled-components";

const StyledFormContainer = styled.form`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: stretch;
  padding: 20px;
  border-radius: 0.8em;
  opacity: 0.8;
  transition: 0.2s;

  input,
  select {
    border: none;
    padding: 8px 20px;
    border-radius: 999px;
    background-color: #ccd;
    font-size: 1rem;
    align-self: center;
    width: 100%;
  }
  select {
    width: 94%;
    align-self: flex-start;
  }
`;

export default StyledFormContainer;
