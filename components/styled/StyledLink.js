import styled from "styled-components";
import Link from "next/link";

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &:hover {
    transform: scale(1.2);
    transition: 0.5s ease-in-out;
  }
  padding: ${props => props.$register ? "0px 5px" : ""};
  color: ${props => props.$register ? "lightblue" : ""};
  

`;

export default StyledLink;
