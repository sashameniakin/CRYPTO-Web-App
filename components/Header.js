import styled from "styled-components";
import {useGlobalState, setGlobalState} from "../state/index";
import Bookmark from "../public/images/bookmark.svg";
import Image from "next/image";
import {signOut, getSession} from "next-auth/react";
import SignOut from "../public/images/signout.svg";

export default function Header() {
  const [metamaskAddress] = useGlobalState("metamaskAddress");

  function openPopup() {
    setGlobalState("openPopup", true);
  }

  return (
    <>
      <StyledHeader>
        <StyledAddress>{metamaskAddress}</StyledAddress>
        <StyledButton onClick={() => signOut({redirect: "/login"})}>
          <StyledImage alt="signout button" src={SignOut} />
        </StyledButton>
        <StyledButton onClick={() => openPopup()}>
          <StyledImage alt="bookmark" src={Bookmark} />
        </StyledButton>
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

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
`;
const StyledImage = styled(Image)`
  text-align: center;
  margin-right: 10px;
`;
const StyledAddress = styled.div`
  margin-right: 20px;
  color: white;
`;
