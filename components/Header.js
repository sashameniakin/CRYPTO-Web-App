import styled from "styled-components";
import {useGlobalState, setGlobalState} from "../state/index";
import Bookmark from "../public/images/bookmark.svg";
import Lottie from "react-lottie";
import {useRouter} from "next/router";
import {useState, useEffect} from "react";
import StyledLottie from "./styled/StyledLottie";
import StyledButton from "../components/styled/StyledButton";
import StyledImage from "../components/styled/StyledImage";
import fromArchive from "../public/images/fromarchive.svg";
import {useStates} from "../context/context";

export default function Header(props) {
  const [metamaskAddress] = useGlobalState("metamaskAddress");
  const [chain] = useGlobalState("chainId");
  const [Connecting] = useGlobalState("isConnecting");
  const path = useRouter().asPath;
  const [isConnected] = useGlobalState("isConnected");
  const [winReady, setWinReady] = useState(false);
  const {openArchive} = useStates();
  const initState = {url: "", height: 100, width: 100};
  const [state, setLottieState] = useState(initState);

  const lottieUrlPath =
    "https://assets7.lottiefiles.com/private_files/lf30_jspeqlsz.json";

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

  useEffect(() => {
    setWinReady(true);
  }, []);

  function openPopup() {
    if (path === "/home") {
      setGlobalState("openPopup", true);
    }
  }

  return (
    winReady && (
      <StyledHeader>
        <StyledDiv>
          <StyledLottie>
            <Lottie
              options={defaultOptions}
              height={state.height}
              width={state.width}
            />
          </StyledLottie>
          <StyledAddress>
            {Connecting ? "...Loading" : isConnected ? chain : ""}
          </StyledAddress>
          <StyledAddress>
            {Connecting ? "...Loading" : isConnected ? metamaskAddress : ""}
          </StyledAddress>
          <div>
            <StyledButton onClick={() => openArchive()}>
              <StyledImage alt="fromArchive" src={fromArchive} />
            </StyledButton>
            <StyledButton onClick={() => openPopup()}>
              <StyledImage alt="bookmark" src={Bookmark} />
            </StyledButton>
          </div>
        </StyledDiv>
      </StyledHeader>
    )
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
`;

const StyledDiv = styled.div`
  position: fixed;
  width: 99%;
  height: 40px;
  border-radius: 5px;
  top: 0%;
  bottom: 94.44%;
  background-color: #142240;
  opacity: 0.7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
`;

const StyledAddress = styled.div`
  margin-right: 20px;
  color: white;
  font-size: small;
  word-break: break-all;
  white-space: normal;
`;
