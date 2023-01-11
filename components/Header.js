import styled from "styled-components";
import {useGlobalState, setGlobalState} from "../state/index";
import Bookmark from "../public/images/bookmark.svg";
import BookmarkActive from "../public/images/bookmark_active.svg";
import Lottie from "react-lottie";
import {useRouter} from "next/router";
import {useState, useEffect} from "react";
import StyledLottie from "./styled/StyledLottie";
import StyledButton from "../components/styled/StyledButton";
import StyledImage from "../components/styled/StyledImage";
import fromArchive from "../public/images/fromarchive.svg";
import fromArchiveActive from "../public/images/fromarchive_active.svg";
import {useStates} from "../context/context";

export default function Header(props) {
  const {popupMongo} = useStates();
  const [openBookmark] = useGlobalState("openPopup");
  const [metamaskAddress] = useGlobalState("metamaskAddress");
  const [chain] = useGlobalState("chainId");
  const [Connecting] = useGlobalState("isConnecting");
  const path = useRouter().asPath;
  const [isConnected] = useGlobalState("isConnected");
  const [winReady, setWinReady] = useState(false);
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
  function openArchive() {
    if (path === "/tasks") {
      setGlobalState("openPopupMongo", true);
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
          <StyledChain>
            {Connecting ? "...Loading" : isConnected ? chain : ""}
          </StyledChain>
          <StyledAddress>
            {Connecting ? "...Loading" : isConnected ? metamaskAddress : ""}
          </StyledAddress>
          <IconsContainer>
            <StyledButton onClick={() => openArchive()}>
              <StyledImage
                alt="fromArchive"
                src={popupMongo ? fromArchiveActive : fromArchive}
              />
            </StyledButton>
            <StyledButton onClick={() => openPopup()}>
              <StyledImage
                alt="bookmark"
                src={openBookmark ? BookmarkActive : Bookmark}
              />
            </StyledButton>
          </IconsContainer>
        </StyledDiv>
      </StyledHeader>
    )
  );
}

const IconsContainer = styled.div`
  display: flex;
`;

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
  background: -webkit-linear-gradient(
    322deg,
    rgb(70, 81, 87) 0%,
    rgb(81, 67, 107) 99%
  );
  opacity: 0.95;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
`;
const StyledChain = styled.div`
  margin-right: 5px;
  color: white;
  width: 280px;
  font-size: x-small;
  word-break: break-all;
  white-space: normal;
`;

const StyledAddress = styled.div`
  margin-right: 5px;
  color: white;
  width: 330px;
  font-size: x-small;
  word-break: break-all;
  white-space: normal;
`;
