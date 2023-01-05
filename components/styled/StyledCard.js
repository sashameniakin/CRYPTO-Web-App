import styled from "styled-components";

const StyledCard = styled.div`
  display: grid;
  grid-template-columns: 40px 40px 1fr 1fr 1fr 1fr;
  color: white;
  margin-bottom: ${props => (props.header ? "10px" : "")};
  word-break: break-all;
  white-space: normal;
  font-size: x-small;
`;

export default StyledCard;
