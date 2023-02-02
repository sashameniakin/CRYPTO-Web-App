import FeatureBackground from "../../components/styled/FeatureBackground";
import StyledBackground from "../../components/styled/StyledBackground";
import StyledForm from "../../components/styled/StyledForm";
import StyledInput from "../../components/styled/StyledInput";
import styled from "styled-components";
import StyledLink from "../../components/styled/StyledLink";
import {useUser} from "../../context/context";
import StyledRegisterButton from "../../components/styled/StyledRegisterButton";

export default function Register() {
  const {handleRegister} = useUser();

  function magic(event) {
    const {currentTarget: el, clientX: x, clientY: y} = event;
    const {top: t, left: l, width: w, height: h} = el.getBoundingClientRect();
    el.style.setProperty("--posX", x - l - w / 2);
    el.style.setProperty("--posY", y - t - h / 2);
  }

  return (
    <FeatureBackground onPointerMove={magic} login>
      <StyledBackground>
        <StyledForm onSubmit={handleRegister}>
          <label htmlFor="first name" />
          <StyledInput
            type="text"
            id="first name"
            name="first_name"
            placeholder="First name"
            white
            required
          />
          <label htmlFor="last name" />
          <StyledInput
            type="text"
            id="last name"
            name="last_name"
            placeholder="Last name"
            white
            required
          />
          <label htmlFor="email" />
          <StyledInput
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            white
            required
          />
          <label htmlFor="password" />
          <StyledInput
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            white
            required
          />
          <StyledRegisterButton type="submit">Register</StyledRegisterButton>
          <StyledRegister>
            <p>Already registered?</p>
            <StyledLink $register href="/login">
              Login
            </StyledLink>
            <p>!</p>
          </StyledRegister>
        </StyledForm>
      </StyledBackground>
    </FeatureBackground>
  );
}

const StyledRegister = styled.div`
  display: flex;
  flex-direction: row;
  color: white;
  font-size: small;
  margin-bottom: 5px;
  p {
    padding: 0px;
    margin: 0px;
  }
`;
