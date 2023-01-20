import styled from "styled-components";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  gap: ${props => (props.tasks === true ? "" : "3px")};
  filter: ${props => (props.active === true ? "blur(2px)" : "")};
`;

export default StyledSection;
