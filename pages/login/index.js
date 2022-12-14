import styled from "styled-components";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <StyledSection>
        <Link href="/profile">
          <StyledButton>LOGIN </StyledButton>
        </Link>
      </StyledSection>
    </>
  );
}

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #758eb7;
`;

const StyledButton = styled.button`
  width: 364px;
  height: 58px;
  margin-top: 3px;
  color: white;
  background: rgba(165, 202, 210, 0.75);
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  border-color: white;
`;

/* const StyledMetaButton = styled.button`
  background-color: transparent;
  border: 2px solid black;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px;
  transition: ease-in-out;
`;
const StyledImage = styled(Image)`
  text-align: center;
  margin-right: 10px;
`; */
