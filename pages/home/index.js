import {useEffect, useState} from "react";
import {useContext} from "react";
import {CMContext} from "../../context/context";
import CoinCard from "../../components/CoinCard";
import NewsCard from "../../components/NewsCard";
import styled from "styled-components";
import Popup from "../../components/Popup_bookmarked";
import {useGlobalState} from "../../state";

export default function Home() {
  let [coinNews, setCoinNews] = useState();
  let [coinData, setCoinData] = useState(null);
  let {getCoins} = useContext(CMContext);
  const [newCoins, setNewCoins] = useState();
  const [buttonPopup] = useGlobalState("openPopup");
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

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
        let apiResponse = await getCoins();
        setCoinData(apiResponse);
        setNewCoins(apiResponse);
      } catch (error) {
        console.log(error.message);
      }
    };

    setData();
  }, [getCoins]);

  useEffect(() => {
    const callAPI = async () => {
      try {
        const res = await fetch(
          `https://bing-news-search1.p.rapidapi.com/news/search?q="${newsCategory}"`,
          {
            method: "GET",
            headers: {
              "X-BingApis-SDK": "true",
              "X-RapidAPI-Key":
                "b1f05b99c9msh84c7f8928e12780p194411jsn85165cd63758",
              "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
              category: "Cryptocurrency",
            },
          }
        );
        const data = await res.json();

        setCoinNews(data.value);
        console.log(data.value);
      } catch (err) {
        console.log(err);
      }
    };
    callAPI();
  }, [newsCategory]);

  return (
    <>
      <StyledBody>
        <StyledSelect>
          News Category:
          <Select onChange={e => setNewsCategory(e.target.value)}>
            <option value="cryptocurrency">cryptocurrency</option>
            {coinData
              ? newCoins.map((coin, i) => {
                  return (
                    <option key={i} value={coin.name}>
                      {coin.name}
                    </option>
                  );
                })
              : ""}
          </Select>
        </StyledSelect>
        <Popup
          newCoins={newCoins}
          trigger={buttonPopup}
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
        <StyledHead active={buttonPopup}>
          <StyledDiv>#</StyledDiv>
          <StyledDiv>Name</StyledDiv>
          <StyledDiv>Price</StyledDiv>
          <StyledDiv>Market Cap</StyledDiv>
          <StyledDiv>Volume (24h)</StyledDiv>
        </StyledHead>
        <StyledSection active={buttonPopup}>
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
      </StyledBody>
    </>
  );
}

const StyledBody = styled.div`
  margin-top: 8%;
`;

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
  filter: ${props => (props.active === true ? "blur(5px)" : "")};
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
export const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  margin-left: ${props => (props.tasks === true ? "10px" : "20px")};
  margin-right: ${props => (props.tasks === true ? "10px" : "20px")};
  gap: ${props => (props.tasks === true ? "" : "3px")};
  filter: ${props => (props.active === true ? "blur(2px)" : "")};
`;
const Select = styled.select`
  margin-left: 10px;
  margin-bottom: 30px;
`;

const StyledSelect = styled.div`
  margin-left: 10px;
`;
