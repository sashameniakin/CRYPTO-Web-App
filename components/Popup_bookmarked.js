import styled from "styled-components";
import CoinCard from "./CoinCard";
import Close from "../public/images/close.svg";
import Image from "next/image";
import {setGlobalState} from "../state";
import StyledCard from "../components/styled/StyledCard";
import StyledCloseButton from "./styled/StyledCloseButton";
import StyledPopup from "../components/styled/StyledPopup";
import StyledH2 from "../components/styled/StyledH2";

function Popup(props) {
  function closePopup() {
    setGlobalState("openPopup", false);
  }

  return (
    props.trigger && (
      <StyledPopup>
        <StyledPopupInner>
          <StyledCloseButton onClick={() => closePopup()}>
            <Image alt="close" src={Close} />
          </StyledCloseButton>
          <StyledH2>YOUR WATCHLIST</StyledH2>
          <StyledCard header>
            <div />
            <div>#</div>
            <div>NAME</div>
            <div>PRICE($)</div>
            <div>MARKET CAP($bln.)</div>
            <div>VOLUME (24h)($mln.)</div>
          </StyledCard>

          {props.newCoins.map((coins, i) => {
            return coins.isBookmarked ? (
              <StyledDiv key={i}>
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
              </StyledDiv>
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
const StyledDiv = styled.div`
  height: 25px;
`;

const StyledPopupInner = styled.div`
  position: relative;
  padding: 10px;
  width: 98%;
  max-height: 100vh;
  height: 70vh;
  border-left: 10px solid #ccd;
  background-color: lightslategray;
  border-radius: 20px;
  overflow-y: scroll;
  margin-top: 75px;
  z-index: 100;
  opacity: 0.9;
`;
