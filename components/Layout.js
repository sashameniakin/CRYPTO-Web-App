import Navbar from "./Navbar";
import Header from "./Header";
import styled from "styled-components";

export default function Layout({children}) {
  return (
    <>
      <Header />
      <StyledMain>{children}</StyledMain>
      <Navbar />
    </>
  );
}

const StyledMain = styled.main`
  width: 100%;
`;
