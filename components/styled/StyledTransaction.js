import styled from "styled-components";

const StyledTransaction = styled.div`
  display: grid;
  grid-template-columns: 30px 45px 1fr 30px 1fr 1fr 1fr;
  color: white;
  margin-bottom: ${props => (props.header ? "30px" : "")};
  font-size: small;
  word-break: break-all;
  white-space: normal;
`;

export default StyledTransaction;
