import styled from "styled-components";
import Star from "../public/images/star.svg";
import Image from "next/image";
import StarFilled from "../public/images/star_filled.svg";

export default function CoinCard({
  id,
  rank,
  name,
  price,
  market_cap,
  volume,
  isBookmarked,
  toggleBookmark,
}) {
  return (
    <StyledCard>
      <StyledDiv>
        <Image
          onClick={() => toggleBookmark(id)}
          alt="bookmark"
          src={isBookmarked ? StarFilled : Star}
        ></Image>
      </StyledDiv>
      <StyledDiv> {rank}</StyledDiv>
      <StyledDiv> {name}</StyledDiv>
      <StyledDiv> {price.toFixed(2)}</StyledDiv>
      <StyledDiv> {market_cap.toFixed(2)}</StyledDiv>
      <StyledDiv> {volume.toFixed(2)}</StyledDiv>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  display: grid;
  grid-template-columns: 75px 75px 1fr 1fr 1fr 1fr;
  align-items: center;
  height: 50px;
  background: rgba(238, 237, 237, 0.75);
  border-radius: 2px;
`;
const StyledDiv = styled.div`
  margin-left: 10px;
  margin-right: 5px;
`;
