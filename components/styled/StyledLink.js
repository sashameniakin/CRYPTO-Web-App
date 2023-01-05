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
`;

export default StyledLink;
