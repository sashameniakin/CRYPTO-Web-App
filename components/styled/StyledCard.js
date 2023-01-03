import styled from "styled-components";

const StyledCard = styled.div`
  display: grid;
  grid-template-columns: 75px 75px 1fr 1fr 1fr 1fr;
  color: white;
  margin-bottom: ${props => (props.header ? "30px" : "")};
  word-break: break-all;
  white-space: normal;
  font-size: small;
`;

export default StyledCard;
