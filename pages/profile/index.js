import {useSession, signOut} from "next-auth/react";
import Image from "next/image";
import StyledBody from "../../components/styled/StyledBody";
import styled from "styled-components";
import StyledButtonMain from "../../components/styled/StyledButtonMain";
import FeatureBackground from "../../components/styled/FeatureBackground";
import StyledBackground from "../../components/styled/StyledBackground";
import {useEffect, useState} from "react";

export default function Profile() {
  const {data: session} = useSession();
  const src = `""`;
  const demoImage = "";
  const [data, setData] = useState(null);

  function logout() {
    if (session === null) {
      window.localStorage.clear("token", "loggedIn");
      window.location.href = "./login";
    } else {
      signOut({callbackUrl: "http://localhost:3000"});
    }
  }

  function magic(event) {
    const {currentTarget: el, clientX: x, clientY: y} = event;
    const {top: t, left: l, width: w, height: h} = el.getBoundingClientRect();
    el.style.setProperty("--posX", x - l - w / 2);
    el.style.setProperty("--posY", y - t - h / 2);
  }

  useEffect(() => {
    const getUserData = async () => {
      const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          token: window.localStorage.getItem("token"),
        }),
      };

      fetch("api/userData", options)
        .then(res => res.json())
        .then(data => {
          console.log(data, "userData");
          setData(data);
          if (data.data == "token expired") {
            alert("Token expired, please login again");
            window.localStorage.clear("token", "loggedIn");
            window.location.href = "./login";
          }
        });
    };
    getUserData();
  }, []);

  return (
    <StyledBody>
      <FeatureBackground onPointerMove={magic} $profile>
        <StyledBackground>
          <StyledProfileImage
            alt=""
            loader={() => session?.user?.image || demoImage}
            src={src}
            width={200}
            height={200}
          />
          <StyledSign>Signed in as</StyledSign>
          <StyledEmail>
            {" "}
            {session?.user?.email || data?.data?.email}
          </StyledEmail>

          <StyledButtonMain onClick={logout}>SIGN OUT</StyledButtonMain>
        </StyledBackground>
      </FeatureBackground>
    </StyledBody>
  );
}

const StyledSign = styled.p`
  padding: 0;
  margin-bottom: 0;
  margin-top: 20px;
`;

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
