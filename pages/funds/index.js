import {useCallback, useContext, useEffect, useState} from "react";
import CoinCard from "../../components/CoinCard";
import {CMContext} from "../../context/context";
import styled from "styled-components";

export default function Funds() {
  let {getCoins} = useContext(CMContext);
  let [coinData, setCoinData] = useState(null);

  useEffect(() => {
    setData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setData = useCallback(async () => {
    try {
      let apiResponse = await getCoins();
      setCoinData(apiResponse);
    } catch (error) {
      console.log(error.message);
    }
  }, [getCoins]);

  return (
    <>
      <StyledSection>
        {coinData ? (
          coinData.map(coin => (
            <div key={coin.id}>
              <CoinCard id={coin.id} />
            </div>
          ))
        ) : (
          <></>
        )}
      </StyledSection>
    </>
  );
}

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;
