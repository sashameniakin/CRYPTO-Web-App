import styled from "styled-components";

const StyledContainerDetails = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  filter: ${props => (props.active === true ? "blur(2px)" : "")};
`;

export default StyledContainerDetails;
