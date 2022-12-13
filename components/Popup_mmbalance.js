import styled from "styled-components";
import Image from "next/image";
import Close from "../public/images/close.svg";
import {setGlobalState, useGlobalState} from "../state";
import {useState, useEffect} from "react";
/* import {jsonRpcProvider} from "wagmi/providers/jsonRpc";
import {chain, configureChains} from "wagmi"; */

function PopupMM(props) {
  const [error, setError] = useState();
  const [user] = useGlobalState("user");
  /*  const {chains, provider} = configureChains(
    [chain.mainnet, chain.polygon],
    [
      jsonRpcProvider({
        rpc: chain => ({}),
      }),
    ]
  ); */

  const networks = {
    polygon: {
      chainId: `0x${Number(137).toString(16)}`,
      chainName: "Polygon Mainnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://polygon-rpc.com/"],
      blockExplorerUrls: ["https://polygonscan.com/"],
    },
    bsc: {
      chainId: `0x${Number(56).toString(16)}`,
      chainName: "Binance Smart Chain Mainnet",
      nativeCurrency: {
        name: "Binance Chain Native Token",
        symbol: "BNB",
        decimals: 18,
      },
      rpcUrls: [
        "https://bsc-dataseed1.binance.org",
        "https://bsc-dataseed2.binance.org",
        "https://bsc-dataseed3.binance.org",
        "https://bsc-dataseed4.binance.org",
        "https://bsc-dataseed1.defibit.io",
        "https://bsc-dataseed2.defibit.io",
        "https://bsc-dataseed3.defibit.io",
        "https://bsc-dataseed4.defibit.io",
        "https://bsc-dataseed1.ninicoin.io",
        "https://bsc-dataseed2.ninicoin.io",
        "https://bsc-dataseed3.ninicoin.io",
        "https://bsc-dataseed4.ninicoin.io",
        "wss://bsc-ws-node.nariox.org",
      ],
      blockExplorerUrls: ["https://bscscan.com"],
    },
    rinkeby: {
      chainId: `0x${Number(4).toString(16)}`,
      chainName: "Rinkeby",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.ankr.com/eth_rinkeby/"],
      blockExplorerUrls: ["https://rinkeby.etherscan.io/"],
    },
    optimism: {
      chainId: `0x${Number(10).toString(16)}`,
      chainName: "Optimism",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.optimism.io/"],
      blockExplorerUrls: ["https://optimistic.etherscan.io/"],
    },
    fantom: {
      chainId: `0x${Number(250).toString(16)}`,
      chainName: "Fantom Opera",
      nativeCurrency: {
        name: "FTM",
        symbol: "FTM",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.fantom.network"],
      blockExplorerUrls: ["https://ftmscan.com/"],
    },
    ethereum: {
      chainId: `0x${Number(1).toString(16)}`,
      chainName: "Ethereum",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.builder0x69.io"],
      blockExplorerUrls: ["https://ftmscan.com/"],
    },
  };
  const changeNetwork = async ({networkName, setError}) => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      if (networkName === "ethereum") {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: "0x1",
            },
          ],
        });
      } else {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              ...networks[networkName],
            },
          ],
        });
      }
    } catch (err) {
      setError(err.message);
      console.log(error);
    }
  };

  const handleNetworkSwitch = async networkName => {
    setError();
    await changeNetwork({networkName, setError});
    user.chainId = networkName;
  };

  const networkChanged = chainId => {
    console.log(chainId);
  };

  useEffect(() => {
    window.ethereum.on("chainChanged", networkChanged);

    return () => {
      window.ethereum.removeListener("chainChanged", networkChanged);
    };
  }, []);

  function closePopup() {
    setGlobalState("openMMPopup", false);
  }

  return props.trigger ? (
    <StyledPopup>
      <StyledPopupInner>
        <StyledButton onClick={() => closePopup()}>
          <Image alt="close" src={Close}></Image>
        </StyledButton>
        <Button onClick={() => handleNetworkSwitch("polygon")}>
          Switch to Polygon
        </Button>
        <Button onClick={() => handleNetworkSwitch("bsc")}>
          Switch to BSC
        </Button>
        <Button onClick={() => handleNetworkSwitch("rinkeby")}>
          Switch to Rinkeby
        </Button>
        <Button onClick={() => handleNetworkSwitch("optimism")}>
          Switch to Optimism
        </Button>
        <Button onClick={() => handleNetworkSwitch("fantom")}>
          Switch to Fantom Opera
        </Button>
        <Button onClick={() => handleNetworkSwitch("ethereum")}>
          Switch to ETH
        </Button>
        <StyledDiv>
          <h4>User session:</h4>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </StyledDiv>
      </StyledPopupInner>
    </StyledPopup>
  ) : (
    ""
  );
}

export default PopupMM;

const StyledPopup = styled.div`
  position: fixed;
  width: 100%;
  background-color: rgba (0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  /* filter: blur(5px); */
`;
const StyledPopupInner = styled.div`
  position: relative;

  padding: 32px;
  width: 100%;

  background-color: #d3e4e8;
  border-radius: 20px;
  overflow-y: scroll;

  margin-top: 100px;
`;
const StyledButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: transparent;
  border: none;
`;

const StyledDiv = styled.div`
  padding: 8px;
  background-color: rgba(165, 202, 210, 0.3);
  box-shadow: 10px 5px 5px rgba(165, 202, 210, 0.3);
`;

const Button = styled.button`
  border-radius: 5px;
  background-color: white;
  border: 2px solid rgba(255, 123, 137);
`;
