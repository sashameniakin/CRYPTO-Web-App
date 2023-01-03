import styled from "styled-components";

const StyledTransaction = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  color: white;
  margin-bottom: ${props => (props.header ? "30px" : "")};
  font-size: small;
`;

export default StyledTransaction;
