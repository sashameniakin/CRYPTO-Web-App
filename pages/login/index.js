import styled from "styled-components";
import Link from "next/link";
import {signIn} from "next-auth/react";
import github from "../../public/images/github.svg";
import github_logo from "../../public/images/github_logo.svg";
import Image from "next/image";
import FeatureBackground from "../../components/styled/FeatureBackground";

export default function Login() {
  function magic(event) {
    const {currentTarget: el, clientX: x, clientY: y} = event;
    const {top: t, left: l, width: w, height: h} = el.getBoundingClientRect();
    el.style.setProperty("--posX", x - l - w / 2);
    el.style.setProperty("--posY", y - t - h / 2);
  }

  return (
    <>
      <FeatureBackground onPointerMove={magic}>
        <StyledSection>
          <StyledButton
            onClick={() =>
              signIn(undefined, {
                callbackUrl: "http://localhost:3000/profile",
              })
            }
          >
            Ligin with Github
          </StyledButton>
          <Link href="/profile">
            <StyledButton>LOGIN </StyledButton>
            <StyledButtonGitHub>
              <Image alt="github_logo" src={github_logo}></Image>
              <p>Login with </p>
              <Image alt="github" src={github}></Image>
            </StyledButtonGitHub>
          </Link>
        </StyledSection>
      </FeatureBackground>
    </>
  );
}

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
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
  border-color: white;
  background: transparent;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
