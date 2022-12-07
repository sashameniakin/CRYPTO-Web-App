import styled from "styled-components";
import Image from "next/image";
import Close from "../public/images/close.svg";

function PopupMM(props) {
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
  };

  return props.trigger ? (
    <StyledPopup>
      <StyledPopupInner>
        <StyledButton onClick={() => props.setTrigger(false)}>
          <Image alt="close" src={Close}></Image>
        </StyledButton>
      </StyledPopupInner>
    </StyledPopup>
  ) : (
    ""
  );
}

export default PopupMM;

const StyledPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  background-color: rgba (0, 0, 0, 0.2);

  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledPopupInner = styled.div`
  position: relative;

  padding: 32px;
  width: 100%;
  height: 90%;
  max-width: 940px;

  background-color: #c5bbb7;
  border-radius: 20px;
  overflow-y: scroll;
  margin-bottom: 150px;
  margin-top: 100px;
`;
const StyledButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: transparent;
  border: none;
`;
