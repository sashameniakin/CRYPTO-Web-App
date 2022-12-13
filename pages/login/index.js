import styled from "styled-components";
import Link from "next/link";
/* import Image from "next/image"; */
/* import {useAccount, useConnect, useSignMessage, useDisconnect} from "wagmi";
import {MetaMaskConnector} from "wagmi/connectors/metaMask";
import {useAuthRequestChallengeEvm} from "@moralisweb3/next";
import {signIn} from "next-auth/react";
import {useRouter} from "next/router"; */
/* import MetaMask from "../../public/images/logos_metamask.svg"; */

export default function Login() {
  /*   const {connectAsync} = useConnect();
  const {disconnectAsync} = useDisconnect();
  const {isConnected} = useAccount();
  const {signMessageAsync} = useSignMessage();
  const {requestChallengeAsync} = useAuthRequestChallengeEvm();
  const {push} = useRouter(); */

  /*  const handleAuth = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const {account, chain} = await connectAsync({
      connector: new MetaMaskConnector(),
    });

    const {message} = await requestChallengeAsync({
      address: account,
      chainId: chain.id,
    });

    const signature = await signMessageAsync({message});

    const {url} = await signIn("credentials", {
      message,
      signature,
      redirect: false,
      callbackUrl: "/profile",
    });

    push(url);
  }; */

  return (
    <>
      <StyledSection>
        <Link href="/profile">
          <StyledButton>LOGIN </StyledButton>
        </Link>
        <p>Login via </p>
        {/*    <StyledMetaButton onClick={handleAuth }>
          <StyledImage alt="signin button" src={MetaMask}></StyledImage>
        </StyledMetaButton> */}
      </StyledSection>
    </>
  );
}

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 100vh;
  background-color: #758eb7;
`;

const StyledButton = styled.button`
  width: 364px;
  height: 58px;
  margin-top: 3px;
  color: white;
  background: rgba(165, 202, 210, 0.75);
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  border-color: white;
`;

/* const StyledMetaButton = styled.button`
  background-color: transparent;
  border: 2px solid black;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px;
  transition: ease-in-out;
`;
const StyledImage = styled(Image)`
  text-align: center;
  margin-right: 10px;
`; */
