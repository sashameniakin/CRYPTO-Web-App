import styled from "styled-components";
import Lottie from "react-lottie";
import Link from "next/link";
import {useEffect, useState} from "react";
import StyledLottie from "../components/styled/StyledLottie";
import FeatureBackground from "../components/styled/FeatureBackground";
import StyledRegisterButton from "../components/styled/StyledRegisterButton";

const LottieComponent = props => {
  const initState = {url: "", height: 100, width: 100};
  const [state, setLottieState] = useState(initState);

  const isLoggedIn =
    typeof window !== "undefined" ? localStorage.getItem("loggedIn") : false;

  const lottieUrlPath =
    "https://assets7.lottiefiles.com/packages/lf20_6q3x8d8e.json";

  const defaultOptions = {
    loop: true,
    autoplay: true,
    path: lottieUrlPath,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    setLottieState({
      url: lottieUrlPath,
      name: props.name,
      height: props.height,
      width: props.width,
    });
  }, [props.height, props.name, props.width]);

  function magic(event) {
    const {currentTarget: el, clientX: x, clientY: y} = event;
    const {top: t, left: l, width: w, height: h} = el.getBoundingClientRect();
    el.style.setProperty("--posX", x - l - w / 2);
    el.style.setProperty("--posY", y - t - h / 2);
  }

  return (
    <>
      <FeatureBackground onPointerMove={magic} welcome>
        <StyledDiv>
          <h3>Welcome to</h3>
          <h1>CRYPTO</h1>
          <p>
            With CRYPTO you can manage your funds, investments and
            cryproprojects. Are you ready?
          </p>
          <StyledLottie>
            {
              <Lottie
                options={defaultOptions}
                height={state.height}
                width={state.width}
              />
            }
          </StyledLottie>
          <Link href={isLoggedIn ? "/profile" : "/login"}>
            <StyledRegisterButton>GO</StyledRegisterButton>
          </Link>
        </StyledDiv>
      </FeatureBackground>
    </>
  );
};

export default LottieComponent;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1,
  h3,
  p {
    color: white;
    word-break: break-all;
    white-space: normal;
    text-align: center;
    margin-top: 70px;
  }
  p {
    margin-top: 25px;
    font-size: small;
  }
`;
