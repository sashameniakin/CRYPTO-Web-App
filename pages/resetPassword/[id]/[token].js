import {useRouter} from "next/router";
import FeatureBackground from "../../../components/styled/FeatureBackground";
import StyledBackground from "../../../components/styled/StyledBackground";
import StyledForm from "../../../components/styled/StyledForm";
import StyledInput from "../../../components/styled/StyledInput";
import StyledRegisterButton from "../../../components/styled/StyledRegisterButton";
import {useEffect, useState} from "react";

const ResetPassword = () => {
  const {query} = useRouter();
  const id = query.id;
  const token = query.token;
  const [verified, setVerified] = useState(false);
  const [reseting, setReseting] = useState(false);
  const [state, setState] = useState({
    password: "",
    cPassword: "",
  });
  const [passMatch, setPassMatch] = useState(true);

  function magic(event) {
    const {currentTarget: el, clientX: x, clientY: y} = event;
    const {top: t, left: l, width: w, height: h} = el.getBoundingClientRect();
    el.style.setProperty("--posX", x - l - w / 2);
    el.style.setProperty("--posY", y - t - h / 2);
  }

  useEffect(() => {
    const getVerified = async () => {
      const data = {
        id: id,
        token: token,
      };
      const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
      };

      await fetch("https://crypto10.vercel.app/api/verify", options)
        .then(res => res.json())
        .then(data => {
          if (data.status == "ok") {
            alert("Verified");
            setVerified(true);
          } else if (data.error == "Not Verified!") {
            alert("Not Verified!");
            setVerified(false);
          }
        });
    };
    getVerified();
  }, [id, token]);

  const handleNewPassword = async event => {
    event.preventDefault();
    setReseting(true);
    const form = event.target;
    const {password, confirm_password} = form.elements;

    const resetData = {
      password: password.value,
      confirm_password: confirm_password.value,
      id: id,
      token: token,
    };
    const options = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(resetData),
    };
    await fetch("https://crypto10.vercel.app/api/resetPassword", options)
      .then(res => res.json())
      .then(data => {
        if (data.status == "ok") {
          alert("Password updated");
          setReseting(false);
          if (confirm("Do you want to login?")) {
            window.location.href = "https://crypto10.vercel.app/login";
          }
        } else if (data.error == "Something went wrong") {
          alert("Something went wrong");
        }
      });
  };

  useEffect(() => {
    validatePassword();
  }, [state]);

  const handleChange = e => {
    const {id, value} = e.target;
    console.log(e.target);
    setState(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  const validatePassword = () => {
    state.password === state.cPassword
      ? setPassMatch(true)
      : setPassMatch(false);
  };

  return (
    <FeatureBackground onPointerMove={magic} login>
      {token && id && verified ? (
        <StyledBackground>
          <StyledForm onSubmit={handleNewPassword}>
            <label htmlFor="password" />
            <StyledInput
              type="password"
              id="password"
              name="password"
              placeholder="New password"
              value={state.password}
              onChange={handleChange}
              white
              required
            />
            <label htmlFor="confirm_password" />
            <StyledInput
              type="password"
              id="cPassword"
              name="confirm_password"
              placeholder="Confirm new password"
              value={state.cPassword}
              onChange={handleChange}
              white={passMatch}
              required
            />
            <div>{passMatch ? "" : "Error: Passwords do not match"}</div>
            <StyledRegisterButton>
              {!reseting ? "Reset" : "Processing..."}
            </StyledRegisterButton>
          </StyledForm>
        </StyledBackground>
      ) : (
        <p>The page you`re trying to get to isn`t avialable</p>
      )}
    </FeatureBackground>
  );
};

export default ResetPassword;
