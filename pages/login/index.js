import styled from "styled-components";
import {signIn} from "next-auth/react";
import github from "../../public/images/github.svg";
import github_logo from "../../public/images/github_logo.svg";
import Image from "next/image";
import FeatureBackground from "../../components/styled/FeatureBackground";
import {useState} from "react";
import StyledBackground from "../../components/styled/StyledBackground";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const {email, password} = form.elements;
    setEmail(email.value);
    setPass(password.value);
  };

  function magic(event) {
    const {currentTarget: el, clientX: x, clientY: y} = event;
    const {top: t, left: l, width: w, height: h} = el.getBoundingClientRect();
    el.style.setProperty("--posX", x - l - w / 2);
    el.style.setProperty("--posY", y - t - h / 2);
  }

  return (
    <>
      <FeatureBackground onPointerMove={magic} login>
        <StyledBackground>
          <StyledForm onSubmit={handleSubmit}>
            <label for="email" />
            <StyledInput
              value={email}
              placeholder="test@gmail.com"
              type="email"
              id="email"
              name="email"
            />
            <label for="password" />
            <StyledInput
              value={pass}
              type="password"
              placeholder="********"
              id="password"
              name="password"
            />
            <StyledLoginButton type="submit">LOGIN </StyledLoginButton>
          </StyledForm>
          <StyledRegister>
            Dont have an account? Register{" "}
            <StyledRegisterButton>here</StyledRegisterButton>!
          </StyledRegister>

          <StyledButtonGitHub
            onClick={() =>
              signIn(undefined, {
                callbackUrl: "http://localhost:3000/home",
              })
            }
          >
            <Image alt="github_logo" src={github_logo}></Image>
            <p>Login with </p>
            <Image alt="github" src={github}></Image>
          </StyledButtonGitHub>
        </StyledBackground>
        {/*    <Link href="/profile">
          <StyledButtonMain test>Go to app (without login)</StyledButtonMain>
        </Link> */}
      </FeatureBackground>
    </>
  );
}

const StyledRegisterButton = styled.button`
  background-color: transparent;
  border: none;
  color: lightblue;
  padding: 0;
`;

const StyledRegister = styled.div`
  color: white;
  font-size: small;
  margin-top: 4px;
`;

const StyledForm = styled.form`
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const StyledInput = styled.input`
  background: rgba(165, 202, 210, 0.2);
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid white;
  border-radius: 4px;
  width: 300px;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  margin-top: 3px;
  ::placeholder {
    color: white;
  }
`;

const StyledLoginButton = styled.button`
  width: 300px;
  height: 58px;
  margin-top: 3px;
  color: white;
  background: rgba(165, 202, 210, 0.75);
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  border-color: white;
`;

const StyledButtonGitHub = styled.button`
  width: 300px;
  height: 58px;
  margin-top: 6px;
  background-color: rgba(165, 202, 210, 0.4);
  color: white;
  border-radius: 5px;
  border-color: white;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
