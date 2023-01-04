import styled from "styled-components";

const StyledTransaction = styled.div`
  display: grid;
  grid-template-columns: 40px 40px 1.5fr 0.5fr 1fr 1fr 1fr;
  color: white;
  margin-bottom: ${props => (props.header ? "30px" : "")};
  font-size: small;
  word-break: break-all;
  white-space: normal;
`;

export default StyledTransaction;
