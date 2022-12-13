import styled from "styled-components";
import {useGlobalState, setGlobalState} from "../state/index";
import Bookmark from "../public/images/bookmark.svg";
import BookmarkBlack from "../public/images/Star_black.svg";
import Image from "next/image";
import {signOut, getSession} from "next-auth/react";
import SignOut from "../public/images/signout.svg";
import {useRouter} from "next/router";

export default function Header() {
  const [metamaskAddress] = useGlobalState("metamaskAddress");
  const [chain] = useGlobalState("chainId");
  const [popupState] = useGlobalState("openPopup");
  const [Connecting] = useGlobalState("isConnecting");
  const path = useRouter().asPath;
  const [isConnected] = useGlobalState("isConnected");

  function openPopup() {
    if (path === "/home") {
      setGlobalState("openPopup", true);
    }
  }

  return (
    <>
      <StyledHeader>
        <StyledAddress>
          {Connecting ? "...Loading" : isConnected ? chain : ""}
        </StyledAddress>
        <StyledAddress>
          {Connecting ? "...Loading" : isConnected ? metamaskAddress : ""}
        </StyledAddress>
        <StyledButtonSignOut onClick={() => signOut()}>
          <StyledImage alt="signout button" src={SignOut} />
        </StyledButtonSignOut>
        <StyledButtonOpen onClick={() => openPopup()}>
          <StyledImage
            alt="bookmark"
            src={popupState === true ? Bookmark : BookmarkBlack}
          />
        </StyledButtonOpen>
      </StyledHeader>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
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
`;

const StyledButtonOpen = styled.button`
  background-color: transparent;
  border: none;
`;
const StyledButtonSignOut = styled.button`
  background-color: transparent;
  border: none;
  margin-top: 3px;
`;
const StyledImage = styled(Image)`
  text-align: center;
`;
const StyledAddress = styled.div`
  margin-right: 20px;
  color: white;
  font-size: small;
`;
