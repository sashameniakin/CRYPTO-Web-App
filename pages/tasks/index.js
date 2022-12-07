import {getSession} from "next-auth/react";

export default function Tasks() {
  return (
    <>
      <p>Page Tasks is under construction</p>;
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
