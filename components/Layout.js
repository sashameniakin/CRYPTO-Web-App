import Navbar from "./Navbar";
import Header from "./Header";
import styled from "styled-components";

import {useRouter} from "next/router";

export default function Layout({children}) {
  const {path} = useRouter();

  return (
    <>
      {path === "/home" ? <Header /> : <></>}
      <StyledMain>{children}</StyledMain>

      <Navbar />
    </>
  );
}

const StyledMain = styled.main`
  width: 100%;
`;
