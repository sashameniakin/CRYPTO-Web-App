import styled from "styled-components";
import Lottie from "react-lottie";
import animationData from "../public/lotties/86719-cryptocurrency.json";
import Link from "next/link";

export default function Welcome() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <StyledDiv>
        <h1>Titel</h1>
        <div>
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
        <Link href="/login">
          <StyledButton>GO</StyledButton>
        </Link>
      </StyledDiv>
    </>
  );
}

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
