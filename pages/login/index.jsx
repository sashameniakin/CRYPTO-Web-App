import styled from "styled-components";
import {signIn} from "next-auth/react";
import github from "../../public/images/github.svg";
import github_logo from "../../public/images/github_logo.svg";
import Image from "next/image";
import FeatureBackground from "../../components/styled/FeatureBackground";
import StyledBackground from "../../components/styled/StyledBackground";
import StyledLink from "../../components/styled/StyledLink";
import StyledForm from "../../components/styled/StyledForm";
import StyledInput from "../../components/styled/StyledInput";
import {useUser} from "../../context/context";
import StyledRegisterButton from "../../components/styled/StyledRegisterButton";

export default function Login() {
  const {handleLogin} = useUser();

  function magic(event) {
    const {currentTarget: el, clientX: x, clientY: y} = event;
    const {top: t, left: l, width: w, height: h} = el.getBoundingClientRect();
    el.style.setProperty("--posX", x - l - w / 2);
    el.style.setProperty("--posY", y - t - h / 2);
  }

  return (
    <FeatureBackground onPointerMove={magic} login>
      <StyledBackground>
        <StyledForm onSubmit={handleLogin}>
          <label htmlFor="email" />
          <StyledInput
            placeholder="Enter email"
            type="email"
            id="email"
            name="email"
            white
          />
          <label htmlFor="password" />
          <StyledInput
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            white
          />
          <StyledContainerLoginOptions>
            <StyledCheckbox>
              <label htmlFor="checkbox" />
              <input type="checkbox" id="checkbox" name="checkbox" />
              <p>Remember me</p>
            </StyledCheckbox>
            <StyledRegister>
              <StyledLink $register href="/reset">
                Forgot Password!
              </StyledLink>
            </StyledRegister>
          </StyledContainerLoginOptions>
          <StyledRegisterButton type="submit">LOGIN </StyledRegisterButton>
          <StyledRegister>
            <p>Dont have an account? Register</p>
            <StyledLink $register href="/register">
              here!
            </StyledLink>
          </StyledRegister>
        </StyledForm>
        <StyledButtonGitHub
          onClick={() =>
            signIn(undefined, {
              callbackUrl:
                /* "http://localhost:3000/home" */ "https://crypto10.vercel.app/profile",
            })
          }
        >
          <Image alt="github_logo" src={github_logo}></Image>
          <p>Login with </p>
          <Image alt="github" src={github}></Image>
        </StyledButtonGitHub>
      </StyledBackground>
    </FeatureBackground>
  );
}

const StyledCheckbox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: small;
  input {
    margin-top: 5px;
  }

  p {
    padding: 0px;
    margin: 0px;
    color: white;
  }
`;

const StyledRegister = styled.div`
  display: flex;
  flex-direction: row;
  color: white;
  font-size: small;
  p {
    padding: 0px;
    margin: 0px;
  }
`;

const StyledButtonGitHub = styled.button`
  width: 300px;
  height: 58px;
  margin-top: 20px;
  background: rgba(165, 202, 210, 0.4);
  color: white;
  border-radius: 5px;
  border-color: white;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;
  :hover,
  :active,
  :focus {
    background: rgba(165, 202, 210, 0.2);
  }
`;

const StyledContainerLoginOptions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
