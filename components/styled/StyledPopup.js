import styled from "styled-components";

const StyledPopup = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${props => (props.primary ? "1" : "2")};
  margin-top: ${props => (props.metamask ? "200px" : "")};
  background-color: ${props => (props.metamask ? "rgba (0, 0, 0, 0.2)" : "")};
`;

export default StyledPopup;
