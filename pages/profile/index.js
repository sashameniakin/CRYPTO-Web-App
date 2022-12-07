import {getSession} from "next-auth/react";
import {setGlobalState} from "../../state";

export default function Profile({user}) {
  setGlobalState("metamaskAddress", user.address);

  return (
    <>
      <h4>User session:</h4>
      <pre>{JSON.stringify(user, null, 2)}</pre>
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
