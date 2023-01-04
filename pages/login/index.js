import styled from "styled-components";
import Link from "next/link";
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
            <StyledInput value={email} type="email" id="email" name="email" />
            <label for="password" />
            <StyledInput
              value={pass}
              type="password"
              placeholder="********"
              id="password"
              name="password"
            />
            <StyledButton type="submit">LOGIN </StyledButton>
          </StyledForm>
          <button>Dont have an account? Register here!</button>

          <StyledButtonGitHub
            onClick={() =>
              signIn(undefined, {
                callbackUrl: "http://localhost:3000/profile",
              })
            }
          >
            <Image alt="github_logo" src={github_logo}></Image>
            <p>Login with </p>
            <Image alt="github" src={github}></Image>
          </StyledButtonGitHub>
        </StyledBackground>
        <Link href="/profile">
          <StyledButton>Ligin with Github</StyledButton>
        </Link>
      </FeatureBackground>
    </>
  );
}

const StyledForm = styled.form`
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const StyledInput = styled.input`
  background: #e5defa;
  border: 3px solid #6f5f90;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  width: 300px;
  height: 58px;
  text-align: center;
`;

const StyledButton = styled.button`
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
