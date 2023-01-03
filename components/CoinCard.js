import Star from "../public/images/star.svg";
import Image from "next/image";
import StarFilled from "../public/images/star_filled.svg";
import StyledCard from "./styled/StyledCard";

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
      <div>
        <Image
          onClick={() => toggleBookmark(id)}
          alt="bookmark"
          src={isBookmarked ? StarFilled : Star}
        ></Image>
      </div>
      <div> {rank}</div>
      <div> {name}</div>
      <div> {price.toFixed(2)}</div>
      <div> {(market_cap.toFixed(2) / 1000000).toFixed(2)}</div>
      <div> {(volume.toFixed(2) / 1000000).toFixed(2)}</div>
    </StyledCard>
  );
}
