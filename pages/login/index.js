import styled from "styled-components";
import Link from "next/link";
import github from "../../public/images/github.svg";
import github_logo from "../../public/images/github_logo.svg";
import Image from "next/image";

export default function Login() {
  return (
    <>
      <StyledSection>
        <StyledInput placeholder="E-Mail"></StyledInput>
        <StyledInput placeholder="Password"></StyledInput>
        <Link href="/home">
          <StyledButton>LOGIN</StyledButton>
        </Link>
        <StyledButtonGitHub>
          <Image alt="github_logo" src={github_logo}></Image>
          <p>Login with </p>
          <Image alt="github" src={github}></Image>
        </StyledButtonGitHub>
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

const StyledInput = styled.input`
  background: #e5defa;
  border: 3px solid #6f5f90;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  width: 364px;
  height: 58px;
  text-align: center;
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

const StyledButtonGitHub = styled.button`
  width: 364px;
  height: 58px;
  margin-top: 6px;

  color: white;
  border-radius: 5px;
  border-color: black;
  background: transparent;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
