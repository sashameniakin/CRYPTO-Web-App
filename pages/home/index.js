import {useEffect, useState} from "react";
import {useContext} from "react";
import {CMContext} from "../../context/context";
import CoinCard from "../../components/CoinCard";
import NewsCard from "../../components/NewsCard";
import styled from "styled-components";
import Popup from "../../components/Popup_bookmarked";
import Bookmark from "../../public/images/bookmark.svg";
import Image from "next/image";

export default function Home() {
  let [coinNews, setCoinNews] = useState();
  let [coinData, setCoinData] = useState(null);
  let {getCoins, getNews} = useContext(CMContext);
  const [newCoins, setNewCoins] = useState();
  const [buttonPopup, setButtonPopup] = useState(false);

  const toggleBookmark = ID => {
    setNewCoins(
      newCoins.map(coin => {
        if (ID === coin.id) {
          return {
            ...coin,
            isBookmarked: !coin.isBookmarked,
          };
        } else {
          return coin;
        }
      })
    );
  };

  useEffect(() => {
    const setData = async () => {
      try {
        let apiResponse = await getNews();

        setCoinNews(apiResponse);
      } catch (error) {
        console.log(error.message);
      }
    };

    setData();
  }, [getNews]);

  useEffect(() => {
    const setData = async () => {
      try {
        let apiResponse = await getCoins();
        setCoinData(apiResponse);
        setNewCoins(apiResponse);
      } catch (error) {
        console.log(error.message);
      }
    };

    setData();
  }, [getCoins]);

  function openPopup() {
    setButtonPopup(true);
  }

  return (
    <>
      <StyledHeader>
        <StyledButton onClick={() => openPopup()}>
          <StyledImage alt="bookmark" src={Bookmark}></StyledImage>
        </StyledButton>
      </StyledHeader>
      <StyledHeaderSection></StyledHeaderSection>
      <Popup
        newCoins={newCoins}
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
        toggleBookmark={toggleBookmark}
      ></Popup>

      <StyledContainer>
        {coinNews &&
          coinNews.map((news, i) => (
            <div key={i}>
              <NewsCard
                urlLink={news.url}
                name={news.name}
                url={news?.image?.thumbnail?.contentUrl}
                description={news.description}
                datePublished={news.datePublished}
                providerName={news.provider[0]?.name}
                providerUrl={news.provider[0]?.image?.thumbnail?.contentUrl}
              />
            </div>
          ))}
      </StyledContainer>
      <StyledHead>
        <StyledDiv>#</StyledDiv>
        <StyledDiv>Name</StyledDiv>
        <StyledDiv>Price</StyledDiv>
        <StyledDiv>Market Cap</StyledDiv>
        <StyledDiv>Volume (24h)</StyledDiv>
      </StyledHead>
      <StyledSection>
        {coinData ? (
          newCoins.map((coin, i) => (
            <div key={i}>
              <CoinCard
                id={coin.id}
                rank={coin.cmc_rank}
                name={coin.name}
                price={coin.quote.USD.price}
                market_cap={coin.quote.USD.market_cap}
                volume={coin.quote.USD.volume_24h}
                isBookmarked={coin.isBookmarked}
                toggleBookmark={toggleBookmark}
              />
            </div>
          ))
        ) : (
          <></>
        )}
      </StyledSection>
    </>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  overflow-x: scroll;
`;

const StyledHead = styled.div`
  background-color: rgba(165, 202, 210);
  width: 100%;
  height: 30px;
  margin-bottom: 8px;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-left: 30px;
`;

const StyledDiv = styled.div`
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
const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  margin-left: 20px;
  margin-right: 20px;
  gap: 3px;
`;

const StyledButton = styled.button`
  top: 0px;
  background-color: transparent;
  border: none;
`;
const StyledImage = styled(Image)`
  text-align: center;
  margin-right: 10px;
`;

const StyledHeader = styled.header`
  position: fixed;
  width: 100%;
  height: 50px;
  top: 0%;
  bottom: 94.44%;
  background-color: rgba(165, 202, 210);
  display: flex;
  justify-content: end;
  align-items: center;
`;

const StyledHeaderSection = styled.section`
  margin-top: 10%;
`;
