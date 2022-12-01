import styled from "styled-components";
import Image from "next/image";
import {useRouter} from "next/router";
import StyledLink from "./StyledLink";
import Metamask from "../public/images/metamask.svg";
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
          <StyledDiv active={pathname === "/" ? true : false}>
            <StyledLink href="/">
              <Image alt="home" src={Home} width="50px" height="50px"></Image>
            </StyledLink>
          </StyledDiv>
          <StyledDiv active={pathname === "/funds" ? true : false}>
            <StyledLink href="/funds">
              <Image alt="funds" src={Funds} width="50px" height="50px"></Image>
            </StyledLink>
          </StyledDiv>

          <StyledLink href="">
            <Image
              alt="metamask"
              src={Metamask}
              width="100px"
              height="100px"
            ></Image>
          </StyledLink>
          <StyledDiv active={pathname === "/tasks" ? true : false}>
            <StyledLink href="/tasks">
              <Image alt="tasks" src={Tasks} width="50px" height="50px"></Image>
            </StyledLink>
          </StyledDiv>
          <StyledDiv active={pathname === "/profile" ? true : false}>
            <StyledLink href="/profile">
              <Image
                alt="personal profile"
                src={Profile}
                width="50px"
                height="50px"
              ></Image>
            </StyledLink>
          </StyledDiv>
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
  background-color: rgba(165, 202, 210);
`;
const StyledSection = styled.section`
  margin-bottom: 20%;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 46px;
  height: 21px;
  background-color: ${props =>
    props.active === true ? "rgba(255, 123, 137)" : ""};
`;
