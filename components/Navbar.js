import styled from "styled-components";
import Image from "next/image";
import {useRouter} from "next/router";
import StyledLink from "./StyledLink";
import Metamask from "../public/images/Metamask.svg";
import Funds from "../public/images/funds.svg";
import Home from "../public/images/home.svg";
import Profile from "../public/images/profile.svg";
import Tasks from "../public/images/tasks.svg";

export default function Navbar() {
  const {pathname} = useRouter();

  return (
    <>
      <StyledSection></StyledSection>

      <footer>
        <StyledList>
          <StyledDiv1 active={pathname}>
            <StyledLink href="/">
              <Image alt="home" src={Home} width="50px" height="50px"></Image>
            </StyledLink>
          </StyledDiv1>
          <StyledDiv2 active={pathname}>
            <StyledLink href="/funds">
              <Image alt="home" src={Funds} width="50px" height="50px"></Image>
            </StyledLink>
          </StyledDiv2>

          <StyledLink href="">
            <Image
              alt="home"
              src={Metamask}
              width="100px"
              height="100px"
            ></Image>
          </StyledLink>
          <StyledDiv3 active={pathname}>
            <StyledLink href="/tasks">
              <Image alt="home" src={Tasks} width="50px" height="50px"></Image>
            </StyledLink>
          </StyledDiv3>
          <StyledDiv4 active={pathname}>
            <StyledLink href="/profile">
              <Image
                alt="home"
                src={Profile}
                width="50px"
                height="50px"
              ></Image>
            </StyledLink>
          </StyledDiv4>
        </StyledList>
      </footer>
    </>
  );
}

const StyledList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  height: 60px;
  width: 100%;
  position: fixed;
  bottom: 0;
  list-style: none;
  margin: 0;
  padding: 0;
  opacity: 0.7;
  background-color: rgba(165, 202, 210, 0.6); ;
`;
const StyledSection = styled.section`
  margin-bottom: 20%;
`;

const StyledDiv1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 46px;
  height: 21px;
  background-color: ${props =>
    props.active === "/" ? "rgba(255, 123, 137, 0.5)" : ""};
`;

const StyledDiv2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 46px;
  height: 21px;
  background-color: ${props =>
    props.active === "/funds" ? "rgba(255, 123, 137, 0.5)" : ""};
`;
const StyledDiv3 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 46px;
  height: 21px;
  background-color: ${props =>
    props.active === "/tasks" ? "rgba(255, 123, 137, 0.5)" : ""};
`;
const StyledDiv4 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 46px;
  height: 21px;
  background-color: ${props =>
    props.active === "/profile" ? "rgba(255, 123, 137, 0.5)" : ""};
`;
