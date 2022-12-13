/* import {getSession} from "next-auth/react"; */
import styled from "styled-components";
import {setGlobalState, useGlobalState} from "../../state";
import PopupForm from "../../components/Popup_form";

export default function Tasks() {
  const [openForm] = useGlobalState("openForm");

  function openFormPopup() {
    setGlobalState("openForm", true);
  }

  return (
    <>
      <StyledBody>
        <PopupForm trigger={openForm}></PopupForm>
        <StyledButton onClick={() => openFormPopup()}>
          Add activity
        </StyledButton>
      </StyledBody>
    </>
  );
}
/* export async function getServerSideProps(context) {
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
} */

const StyledBody = styled.div`
  margin-top: 7%;
`;

const StyledButton = styled.button`
  width: 228px;
  height: 44px;
  margin-left: 10px;
  border: none;
  background: rgba(165, 202, 210, 0.75);
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`;
