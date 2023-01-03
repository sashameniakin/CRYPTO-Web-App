import {useSession, signOut} from "next-auth/react";
import Image from "next/image";
import StyledBody from "../../components/styled/StyledBody";
import styled from "styled-components";
import StyledButtonMain from "../../components/styled/StyledButtonMain";
import FeatureBackground from "../../components/styled/FeatureBackground";

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
          <StyledP>Signed in as {session?.user?.email}</StyledP>
          {
            <StyledProfileImage
              alt="userFoto"
              loader={() => session?.user?.image || demoImage}
              src={src}
              width={200}
              height={200}
            />
          }
          <StyledButtonMain
            onClick={() => signOut({callbackUrl: "http://localhost:3000"})}
          >
            SIGN OUT
          </StyledButtonMain>
        </FeatureBackground>
      </StyledBody>
    </>
  );
}

const StyledProfileImage = styled(Image)`
  border-radius: 100px;
`;
const StyledP = styled.p`
  color: white;
`;
