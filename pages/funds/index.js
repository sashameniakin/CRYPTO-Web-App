import Diagram from "../../components/Diagram";
import {
  Chart,
  ArcElement,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  BarElement,
  PieController,
  Legend,
  Tooltip,
} from "chart.js";
import styled from "styled-components";
import {useContext, useEffect, useState} from "react";
import {CMContext, useFunds} from "../../context/context";
import StyledBaseDetails from "../../components/styled/StyledBaseDetails";
import StyledFormContainer from "../../components/styled/StyledFormContainer";
import {setGlobalState} from "../../state";
import TransactionCard from "../../components/TransactionCard";
import BarGrafik from "../../components/Bar";
import StyledBody from "../../components/styled/StyledBody";
import StyledSelect from "../../components/styled/StyledSelect";
import StyledTransaction from "../../components/styled/StyledTransaction";
import FeatureBackground from "../../components/styled/FeatureBackground";

Chart.register(ArcElement);
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  BarElement,
  PieController,
  Legend,
  Tooltip
);

export default function Funds() {
  let {coinData} = useContext(CMContext);
  const [coinsToFind, setCoinToFind] = useState(null);
  const {handleBuy, handleSell, transactions, diagram} = useFunds();
  const selected = coinData?.filter(coin => coin.name === coinsToFind);
  
  useEffect(() => {
    coinsToFind &&
      setGlobalState("coinPrice", selected[0]?.quote?.USD?.price.toFixed(1));
    coinsToFind && setGlobalState("coinName", selected[0]?.name);
    coinsToFind && setGlobalState("coinSymbol", selected[0]?.symbol);
  }, [handleSell, handleBuy, coinsToFind]);

  function magic(event) {
    const {currentTarget: el, clientX: x, clientY: y} = event;
    const {top: t, left: l, width: w, height: h} = el.getBoundingClientRect();
    el.style.setProperty("--posX", x - l - w / 2);
    el.style.setProperty("--posY", y - t - h / 2);
  }

  return (
    <>
      <StyledBody>
        <FeatureBackground onPointerMove={magic}>
          <h2>DASHBOARD: MANAGE YOUR FUNDS</h2>
          <h3>Select your coin:</h3>
          <StyledSelect onChange={e => setCoinToFind(e.target.value)}>
            <option value="coin">cryptocurrency</option>
            {coinData
              ? coinData.map((coin, i) => {
                  return (
                    <option key={i} value={coin.name}>
                      {coin.name}
                    </option>
                  );
                })
              : ""}
          </StyledSelect>
          <StyledRow>
            <StyledField>
              <StyledFormContainer onSubmit={handleBuy}>
                <label htmlFor="amount">BUY:</label>
                <input
                  placeholder="amt."
                  type="number"
                  step="0.00001"
                  min="0"
                  name="amount"
                />
                <button type="submit">BUY</button>
              </StyledFormContainer>
            </StyledField>
            <StyledField coin>
              <StyledColumn>
                <div>COIN:</div>
                <div>
                  {coinsToFind && coinsToFind !== "coin"
                    ? selected[0]?.name
                    : "coin"}
                </div>
                <div>PRICE ($):</div>
                <div>
                  {coinsToFind && coinsToFind !== "coin"
                    ? selected[0]?.quote?.USD?.price.toFixed(1)
                    : "price"}
                </div>
              </StyledColumn>
            </StyledField>
            <StyledField>
              <StyledFormContainer onSubmit={handleSell}>
                <label htmlFor="amount">SELL:</label>
                <input
                  placeholder="amt."
                  type="number"
                  step="0.00001"
                  min="0"
                  name="amount"
                />
                <button type="submit">SELL</button>
              </StyledFormContainer>
            </StyledField>
          </StyledRow>
        </FeatureBackground>

        <FeatureBackground onPointerMove={magic}>
          <h2>PORTFOLIO</h2>
          <Diagram diagram={diagram} coins={coinData} />
        </FeatureBackground>

        <FeatureBackground onPointerMove={magic}>
          <h2>PROFIT/LOSS LIVE IN $</h2>
          <BarGrafik diagram={diagram} coins={coinData} />
        </FeatureBackground>
        <FeatureBackground onPointerMove={magic} transactions>
          <h2>TRANSACTIONS</h2>
          <StyledTransaction header>
            <StyledP>ID</StyledP>
            <StyledP>ACTION</StyledP>
            <StyledP>COIN</StyledP>
            <StyledP>AMT.</StyledP>
            <StyledP>PRICE($)</StyledP>
            <StyledP align>DATE</StyledP>
            <StyledP align>TIME</StyledP>
          </StyledTransaction>
          {transactions &&
            transactions.map((transaction, i) => {
              return (
                <TransactionCard
                  key={i}
                  id={transaction.id}
                  action={transaction.action}
                  name={transaction.name}
                  amount={transaction.amount}
                  price={transaction.price}
                  date={transaction.date}
                  time={transaction.time}
                />
              );
            })}
        </FeatureBackground>
      </StyledBody>
    </>
  );
}

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
  gap: 10px;
`;

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
`;

const StyledField = styled.div`
  ${StyledBaseDetails}
  border-radius: 5px;
  margin-top: 10px;
`;

const StyledP = styled.p`
  word-break: break-all;
  white-space: normal;
  font-size: smaller;
  display: flex;
  justify-content: ${props => (props.align ? "center" : "")};
`;
