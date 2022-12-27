import Diagram from "../../components/Diagram";
import Dashboard from "../../components/Dashboard";
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
import {baseDetailsStyle} from "../../components/Task";
import {FormContainer} from "../../components/Popup_form";
import {setGlobalState} from "../../state";
import TransactionCard from "../../components/TransactionCard";
import {StyledTransaction} from "../../components/TransactionCard";
import BarGrafik from "../../components/Bar";
import Help from "../../components/Help";
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
  let {getCoins} = useContext(CMContext);
  const [coins, setCoins] = useState();
  const [coinsToFind, setCoinToFind] = useState();

  const [selectedCoin, setSelectedCoin] = useState();
  const {handleBuy, handleSell, transactions, diagram} = useFunds();

  useEffect(() => {
    const setData = async () => {
      try {
        let apiResponse = await getCoins();
        setCoins(apiResponse);
      } catch (error) {
        console.log(error.message);
      }
    };

    setData();
  }, [getCoins]);

  const selected = coins?.filter(coin => coin.name === coinsToFind);
  useEffect(() => {
    coinsToFind &&
      setGlobalState("coinPrice", selected[0]?.quote?.USD?.price.toFixed(2));
    coinsToFind && setGlobalState("coinName", selected[0]?.name);
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
        <Feature onPointerMove={magic}>
          <h2>DASHBOARD: MANAGE YOUR FUNDS</h2>
          <h3>Select your coin:</h3>
          <StyledSelect onChange={e => setCoinToFind(e.target.value)}>
            <option value="coin">cryptocurrency</option>
            {coins
              ? coins.map((coin, i) => {
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
              <FormContainer onSubmit={handleBuy}>
                <label htmlFor="amount">BUY:</label>
                <input
                  placeholder="amount"
                  type="number"
                  step="0.00001"
                  min="0"
                  name="amount"
                />
                <button type="submit">BUY</button>
              </FormContainer>
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
                    ? selected[0]?.quote?.USD?.price.toFixed(2)
                    : "price"}
                </div>
              </StyledColumn>
            </StyledField>
            <StyledField>
              <FormContainer onSubmit={handleSell}>
                <label htmlFor="amount">SELL:</label>
                <input
                  placeholder="amount"
                  type="number"
                  step="0.00001"
                  min="0"
                  name="amount"
                />
                <button type="submit">SELL</button>
              </FormContainer>
            </StyledField>
          </StyledRow>
        </Feature>

        <Feature onPointerMove={magic}>
          <h2>PORTFOLIO</h2>
          <Diagram diagram={diagram} coins={coins} />
          <Help />
        </Feature>

        <Feature onPointerMove={magic}>
          <h2>PROFIT/LOSS</h2>
          <BarGrafik diagram={diagram} coins={coins} />
        </Feature>
        <Feature onPointerMove={magic}>
          <h2>TRANSACTIONS</h2>
          <StyledTransaction header>
            <div>ID</div>
            <div>ACTION</div>
            <div>COIN</div>
            <div>AMOUNT</div>
            <div>PRICE</div>
            <div>DATE</div>
            <div>TIME</div>
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
        </Feature>
      </StyledBody>
    </>
  );
}

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
`;

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 200px;
`;

const StyledSelect = styled.select`
  border: none;
  padding: 8px 20px;
  border-radius: 999px;
  background-color: #ccd;
  font-size: 1rem;
  align-self: center;
  width: 100%;
`;

const StyledBody = styled.main`
  margin-top: 9%;
  margin-bottom: 9%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const StyledField = styled.div`
  ${baseDetailsStyle}

  margin-top: 10px;
`;

const Feature = styled.div`
  width: 98%;
  opacity: 0.75;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 0;
  h2 {
    border-top: solid 5px #ccd;
    border-bottom: solid 5px #ccd;
    color: white;
    text-align: center;
  }
  h3 {
    color: white;
  }

  border-radius: 5px;
  margin: 0;
  padding: 20px;
  --x: calc(var(--posX, 0) * 1px);
  --y: calc(var(--posY, 0) * 1px);
  background-image: linear-gradient(115deg, rgb(211 255 215), rgb(0 0 0)),
    radial-gradient(
      90% 100% at calc(50% + var(--x)) calc(0% + var(--y)),
      rgb(200 200 200),
      rgb(022 000 045)
    ),
    radial-gradient(
      100% 100% at calc(80% - var(--x)) calc(0% - var(--y)),
      rgb(250 255 000),
      rgb(036 000 000)
    ),
    radial-gradient(
      150% 210% at calc(100% + var(--x)) calc(0% + var(--y)),
      rgb(020 175 125),
      rgb(000 010 255)
    ),
    radial-gradient(
      100% 100% at calc(100% - var(--x)) calc(30% - var(--y)),
      rgb(255 077 000),
      rgb(000 200 255)
    ),
    linear-gradient(60deg, rgb(255 000 000), rgb(120 086 255));
  background-blend-mode: overlay, overlay, difference, difference, difference,
    normal;
`;
