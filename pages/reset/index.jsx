import FeatureBackground from "../../components/styled/FeatureBackground";
import StyledBackground from "../../components/styled/StyledBackground";
import StyledForm from "../../components/styled/StyledForm";
import StyledInput from "../../components/styled/StyledInput";
import StyledRegisterButton from "../../components/styled/StyledRegisterButton";
import {useUser} from "../../context/context";
import {useStates} from "../../context/context";

export default function ResetPassword() {
  const {handleReset} = useUser();
  const {loading} = useStates();

  function magic(event) {
    const {currentTarget: el, clientX: x, clientY: y} = event;
    const {top: t, left: l, width: w, height: h} = el.getBoundingClientRect();
    el.style.setProperty("--posX", x - l - w / 2);
    el.style.setProperty("--posY", y - t - h / 2);
  }

  return (
    <FeatureBackground onPointerMove={magic} login>
      <StyledBackground>
        <StyledForm onSubmit={handleReset}>
          <h3>Forgot Password</h3>
          <label htmlFor="email" />
          <StyledInput
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            white
            required
          />
          <StyledRegisterButton type="submit">
            {!loading ? "GET SECURE LINK" : "SENDING..."}
          </StyledRegisterButton>
        </StyledForm>
      </StyledBackground>
    </FeatureBackground>
  );
}
