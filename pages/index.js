import styled from "styled-components";
import Lottie from "react-lottie";
/* import animationData from "../public/lotties/86719-cryptocurrency.json"; */
import Link from "next/link";
import {useEffect, useState} from "react";

const LottieComponent = props => {
  const initState = {url: "", height: 100, width: 100};
  const [state, setLottieState] = useState(initState);

  const lottieUrlPath =
    "https://assets9.lottiefiles.com/private_files/lf30_gonpfxdh.json";

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

  return (
    <>
      <StyledDiv>
        <h1>Titel</h1>
        <div>
          {
            <Lottie
              options={defaultOptions}
              height={state.height}
              width={state.width}
            />
          }
        </div>
        <Link href="/login">
          <StyledButton>GO</StyledButton>
        </Link>
      </StyledDiv>
    </>
  );
};

export default LottieComponent;
const StyledButton = styled.button`
  width: 162px;
  height: 45px;
  margin-top: 20px;
  border-color: white;
  color: white;

  background: rgba(165, 202, 210, 0.75);
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
`;
