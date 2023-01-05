import Star from "../public/images/star.svg";
import Image from "next/image";
import StarFilled from "../public/images/star_filled.svg";
import StyledCard from "./styled/StyledCard";
import styled from "styled-components";

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
      <div> {rank}</div>
      <div> {name}</div>
      <div> {price.toFixed(2)}</div>
      <div> {(market_cap.toFixed(2) / 1000000000).toFixed(2)}</div>
      <div> {(volume.toFixed(2) / 1000000).toFixed(2)}</div>
    </StyledCard>
  );
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 10px;
`;
