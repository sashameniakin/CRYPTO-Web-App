import styled from "styled-components";

const StyledTransaction = styled.div`
  display: grid;
  grid-template-columns: 25px 45px 1fr 30px 1fr 1fr 71px;
  color: white;
  margin-bottom: ${props => (props.header ? "30px" : "")};
  font-size: small;
  word-break: break-all;
  white-space: normal;
  margin-left: ${props => (props.align ? "5px" : "")};
`;

export default StyledTransaction;
