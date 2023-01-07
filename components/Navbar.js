import styled from "styled-components";
import Image from "next/image";
import {useRouter} from "next/router";
import StyledLink from "./styled/StyledLink";
import Metamask from "../public/images/MM_notactive.svg";
import Funds from "../public/images/funds.svg";
import Home from "../public/images/home.svg";
import Profile from "../public/images/profile.svg";
import Tasks from "../public/images/tasks.svg";
import {setGlobalState} from "../state";
import {useState} from "react";
import Web3 from "web3";
import {useEffect} from "react";
import StyledButton from "../components/styled/StyledButton";
import Logo from "../public/images/MMlogos.svg";

export default function Navbar() {
  const {pathname} = useRouter();

  const [isConnected, setIsConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [chainId, setChainId] = useState(null);
  setGlobalState("metamaskAddress", currentAccount);
  setGlobalState("isConnected", isConnected);

  const [winReady, setWinReady] = useState(false);

  useEffect(() => {
    setWinReady(true);
  }, []);

  const NETWORKS = {
    1: "Ethereum Main Network",
    3: "Ropsten Tesst Network",
    4: "Rinkeby Test Network",
    5: "Goerli Test Network",
    42: "Kovan Test Network",
    137: "Polygon Mainnet",
    56: "BSC Mainnet",
    10: "Optimism",
    250: "Fantom Opera",
  };

  useEffect(() => {
    setProvider(detectProvider());
  }, []);

  const onLogin = async provider => {
    if (provider) {
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      const chainId = await web3.eth.getChainId();
      if (accounts.length === 0) {
        console.log("Please connect to Metamask!");
      } else if (accounts[0] !== currentAccount) {
        setCurrentAccount(accounts[0]);
        setIsConnected(true);
        setProvider(provider);
        setWeb3(web3);
        setChainId(chainId);
      }
    } else {
      setGlobalState("openMMPopup", true);
    }
  };

  useEffect(() => {
    if (provider) {
      if (provider !== window.ethereum) {
        console.error(
          "Not window.ethereum provider. Do you have multiple wallet installed?"
        );
      }
    }
  }, [provider]);

  useEffect(() => {
    const handleAccountsChanged = async accounts => {
      const web3Accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        onLogout();
      } else if (accounts[0] !== currentAccount) {
        setCurrentAccount(accounts[0]);
      }
      setGlobalState("web3account", web3Accounts);
    };
    const handleChainChanged = async chainId => {
      const web3ChainId = await web3.eth.getChainId();
      setChainId(web3ChainId);
      setGlobalState("chain", chainId);
    };

    if (isConnected) {
      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
    }

    return () => {
      if (isConnected) {
        provider.removeListener("accountsChanged", handleAccountsChanged);
        provider.removeListener("chainChanged", handleChainChanged);
      }
    };
  });

  const onLogout = () => {
    setIsConnected(false);
  };

  const detectProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.warn("No Ethereum browser detected! Check out Metamask");
    }
    return provider;
  };

  const onLoginHandler = async () => {
    const provider = detectProvider();
    if (provider) {
      setGlobalState("isConnecting", true);
      await provider.request({
        method: "eth_requestAccounts",
      });
    }
    setGlobalState("isConnecting", false);
    onLogin(provider);
  };

  const getCurrentNetwork = chainId => {
    return NETWORKS[chainId];
  };

  setGlobalState("chainId", getCurrentNetwork(chainId));

  return (
    winReady && (
      <StyledFooter>
        <StyledList>
          <StyledDiv active={pathname === "/home" ? true : false}>
            <StyledLink href="/home">
              <Image alt="home" src={Home} width="50px" height="50px" />
            </StyledLink>
          </StyledDiv>
          <StyledDiv active={pathname === "/funds" ? true : false}>
            <StyledLink href="/funds">
              <Image alt="funds" src={Funds} width="50px" height="50px" />
            </StyledLink>
          </StyledDiv>

          <StyledButton onClick={onLoginHandler}>
            <Image
              alt="metamask"
              src={isConnected ? Logo : Metamask}
              width="100px"
              height="100px"
            />
          </StyledButton>

          <StyledDiv active={pathname === "/tasks" ? true : false}>
            <StyledLink href="/tasks">
              <Image alt="tasks" src={Tasks} width="50px" height="50px" />
            </StyledLink>
          </StyledDiv>
          <StyledDiv active={pathname === "/profile" ? true : false}>
            <StyledLink href="/profile">
              <Image
                alt="personal profile"
                src={Profile}
                width="50px"
                height="50px"
              />
            </StyledLink>
          </StyledDiv>
        </StyledList>
      </StyledFooter>
    )
  );
}
const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
`;

const StyledList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  height: 45px;
  width: 99%;
  opacity: 0.95;
  position: fixed;
  bottom: 0;
  list-style: none;
  margin: 0;
  padding: 0;

  background: -webkit-linear-gradient(
    322deg,
    rgb(70, 81, 87) 0%,
    rgb(81, 67, 107) 99%
  );
  border-radius: 5px;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  width: 35px;
  height: 35px;
  background-color: ${props =>
    props.active === true ? "rgba(255, 123, 137, 0.5)" : ""};
`;
