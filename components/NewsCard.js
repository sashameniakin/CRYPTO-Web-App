import Image from "next/image";

import styled from "styled-components";
import moment from "moment";

export default function NewsCard({
  urlLink,
  name,
  url,
  description,
  datePublished,
  providerName,
  providerUrl,
}) {
  const src = `""`;
  const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

  return (
    <Card>
      <StyledA href={urlLink} target="_blank" rel="noreferrer">
        <StyledContainer>
          <Titel>{name}</Titel>
          <Image
            alt=""
            loader={() => url || demoImage}
            src={src}
            width={100}
            height={100}
          />
        </StyledContainer>
        <StyledP primary>
          {description.length > 100
            ? `${description.substring(0, 100)}...`
            : description}
        </StyledP>
        <StyledContainer primary>
          <StyledDiv>
            <Image
              alt=""
              loader={() => providerUrl || demoImage}
              src={providerUrl || demoImage}
              width={50}
              height={50}
            />
            <StyledP>{providerName}</StyledP>
          </StyledDiv>
          <p>{moment(datePublished).startOf("ss").fromNow()}</p>
        </StyledContainer>
      </StyledA>
    </Card>
  );
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${props => (props.primary ? "10px" : "")};
`;

const Card = styled.div`
  background-color: aliceblue;
  border-radius: 10px;
  width: 400px;
  font-family: Arial, Helvetica, sans-serif;
  margin-left: 10px;
  border-left: 10px solid pink;
  &:hover {
    transform: scale(1.05);
    transition: 0.5s ease;
  }
`;

const StyledA = styled.a`
  text-decoration: none;
  color: #2c2b2b;
`;

const Titel = styled.div`
  width: 70%;
  margin-left: 10px;
  font-weight: bold;
`;

const StyledP = styled.p`
  color: ${props => (props.primary ? "black" : "")};
  margin-left: 10px;
  margin-right: 10px;
`;
