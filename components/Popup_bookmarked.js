import styled from "styled-components";
import CoinCard from "./CoinCard";
import Close from "../public/images/close.svg";
import Image from "next/image";
import {setGlobalState} from "../state";

function Popup(props) {
  function closePopup() {
    setGlobalState("openPopup", false);
  }

  return (
    props.trigger && (
      <StyledPopup>
        <StyledPopupInner>
          <StyledButton onClick={() => closePopup()}>
            <Image alt="close" src={Close} />
          </StyledButton>
          <StyledHead>
            <StyledP>#</StyledP>
            <StyledP>Name</StyledP>
            <StyledP>Price</StyledP>
            <StyledP>Market Cap</StyledP>
            <StyledP>Volume (24h)</StyledP>
          </StyledHead>
          {props.newCoins.map((coins, i) => {
            return coins.isBookmarked ? (
              <CoinCard
                key={i}
                id={coins.id}
                rank={coins.cmc_rank}
                name={coins.name}
                price={coins.quote.USD.price}
                market_cap={coins.quote.USD.market_cap}
                volume={coins.quote.USD.volume_24h}
                isBookmarked={coins.isBookmarked}
                toggleBookmark={props.toggleBookmark}
              />
            ) : (
              ""
            );
          })}
          {props.children}
        </StyledPopupInner>
      </StyledPopup>
    )
  );
}

export default Popup;

const StyledPopup = styled.div`
  position: fixed;
  top: 10px;
  left: 0;
  z-index: 2;
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
  background-color: #d3e4e8;
  border-radius: 20px;
  overflow-y: scroll;
  margin-bottom: 150px;
  margin-top: 100px;
`;

export const StyledButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: transparent;
  border: none;
  z-index: 2;
`;
const StyledHead = styled.div`
  background-color: rgba(165, 202, 210);
  width: 100%;
  height: 40px;
  margin-bottom: 8px;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 8px;
`;

const StyledP = styled.p`
  border-radius: 12px;
  color: white;
  width: 120px;
  height: 20px;
  background-color: rgba(255, 123, 137);
  padding: 0px;
  text-align: center;
  font-weight: bold;
  font-size: small;
`;
