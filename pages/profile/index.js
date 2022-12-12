import {getSession} from "next-auth/react";
import {setGlobalState} from "../../state";
import styled from "styled-components";

export default function Profile({user}) {
  setGlobalState("metamaskAddress", user.address);
  setGlobalState("user", user);

  return (
    <>
      <StyledBody>
        <p>under construction</p>
      </StyledBody>
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

  return {
    props: {user: session.user},
  };
}
const StyledBody = styled.div`
  margin-top: 8%;
`;
