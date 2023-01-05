import {useSession, signOut} from "next-auth/react";
import Image from "next/image";
import StyledBody from "../../components/styled/StyledBody";
import styled from "styled-components";
import StyledButtonMain from "../../components/styled/StyledButtonMain";
import FeatureBackground from "../../components/styled/FeatureBackground";
import StyledBackground from "../../components/styled/StyledBackground";

export default function Profile() {
  const {data: session} = useSession();
  const src = `""`;
  const demoImage = "";

  function magic(event) {
    const {currentTarget: el, clientX: x, clientY: y} = event;
    const {top: t, left: l, width: w, height: h} = el.getBoundingClientRect();
    el.style.setProperty("--posX", x - l - w / 2);
    el.style.setProperty("--posY", y - t - h / 2);
  }

  return (
    <>
      <StyledBody>
        <FeatureBackground onPointerMove={magic} profile>
          <StyledBackground>
            <StyledProfileImage
              alt=""
              loader={() => session?.user?.image || demoImage}
              src={src}
              width={200}
              height={200}
            />
            <p>Signed in as</p>
            <StyledEmail> {session?.user?.email}</StyledEmail>

            <StyledButtonMain
              onClick={() => signOut({callbackUrl: "http://localhost:3000"})}
            >
              SIGN OUT
            </StyledButtonMain>
          </StyledBackground>
        </FeatureBackground>
      </StyledBody>
    </>
  );
}

const StyledProfileImage = styled(Image)`
  border-radius: 100px;
`;
const StyledEmail = styled.p`
  background: rgba(165, 202, 210, 0.2);
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  width: 300px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
