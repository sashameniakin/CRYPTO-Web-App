import styled from "styled-components";
import {useGlobalState, setGlobalState} from "../state/index";
import Bookmark from "../public/images/bookmark.svg";
import BookmarkBlack from "../public/images/Star_black.svg";
import Image from "next/image";
import SignOut from "../public/images/signout.svg";
import {useRouter} from "next/router";
import {useState, useEffect} from "react";

export default function Header() {
  const [metamaskAddress] = useGlobalState("metamaskAddress");
  const [chain] = useGlobalState("chainId");
  const [popupState] = useGlobalState("openPopup");
  const [Connecting] = useGlobalState("isConnecting");
  const path = useRouter().asPath;
  const [isConnected] = useGlobalState("isConnected");

  const [winReady, setWinReady] = useState(false);

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
        <StyledAddress>
          {Connecting ? "...Loading" : isConnected ? chain : ""}
        </StyledAddress>
        <StyledAddress>
          {Connecting ? "...Loading" : isConnected ? metamaskAddress : ""}
        </StyledAddress>
        <StyledButton>
          <StyledImage alt="signout button" src={SignOut} />
        </StyledButton>
        <StyledButton onClick={() => openPopup()}>
          <StyledImage
            alt="bookmark"
            src={popupState === true ? Bookmark : BookmarkBlack}
          />
        </StyledButton>
      </StyledHeader>
    )
  );
}

const StyledHeader = styled.header`
  position: fixed;
  width: 100%;
  height: 50px;
  top: 0%;
  bottom: 94.44%;
  background-color: rgba(165, 202, 210);
  display: flex;
  justify-content: end;
  align-items: center;
  z-index: 100;
`;

export const StyledButton = styled.button`
  background-color: transparent;
  border: none;
`;
export const StyledImage = styled(Image)`
  text-align: center;
`;
const StyledAddress = styled.div`
  margin-right: 20px;
  color: white;
  font-size: small;
`;
