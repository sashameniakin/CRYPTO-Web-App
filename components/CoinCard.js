import Image from "next/image";
import StarFilled from "../public/images/star_filled.svg";
import Star from "../public/images/star.svg";
import StyledCard from "./styled/StyledCard";
import styled from "styled-components";
import {useBookmarked} from "../context/context";

export default function CoinCard({id, rank, name, price, market_cap, volume}) {
  const {handleBoookmarked, bookmarked} = useBookmarked();

  const filtered = bookmarked?.filter(coin => coin.name === name);

  return (
    <StyledCard>
      <StyledStar>
        <Image
          onClick={() => handleBoookmarked(id)}
          alt="bookmark"
          src={filtered.length > 0 ? StarFilled : Star}
        ></Image>
      </StyledStar>
      <StyledP> {rank}</StyledP>
      <StyledP> {name}</StyledP>
      <StyledP> {price.toFixed(2)}</StyledP>
      <StyledP> {(market_cap.toFixed(2) / 1000000000).toFixed(2)}</StyledP>
      <StyledP> {(volume.toFixed(2) / 1000000).toFixed(2)}</StyledP>
    </StyledCard>
  );
}

const StyledStar = styled.p`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 10px;
  margin: 0;
  padding: 0;
`;

const StyledP = styled.p`
  padding: 0;
  margin: 0;
`;
