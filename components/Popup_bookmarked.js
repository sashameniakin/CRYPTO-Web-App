import styled from "styled-components";
import BookmarkedCard from "./BookmarkedCard";
import Close from "../public/images/close.svg";
import Image from "next/image";
import {setGlobalState} from "../state";
import StyledCard from "../components/styled/StyledCard";
import StyledCloseButton from "./styled/StyledCloseButton";
import StyledPopup from "../components/styled/StyledPopup";
import StyledH2 from "../components/styled/StyledH2";
import {useBookmarked} from "../context/context";

function Popup(props) {
  const {bookmarked} = useBookmarked();

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
            <p />
            <p>#</p>
            <p>NAME</p>
            <p>PRICE($)</p>
            <p>MARKET CAP($bln.)</p>
            <p>VOLUME (24h)($mln.)</p>
          </StyledCard>

          {bookmarked &&
            bookmarked
              .sort((a, b) => a.rank - b.rank)
              .map((coins, i) => {
                return (
                  <StyledDiv key={i}>
                    <BookmarkedCard
                      key={i}
                      id={coins._id}
                      rank={coins.rank}
                      name={coins.name}
                      price={coins.price}
                      market_cap={coins.markedCap}
                      volume={coins.volume}
                    />
                  </StyledDiv>
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
