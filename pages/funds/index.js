import {useCallback, useContext, useEffect, useState} from "react";
import CoinCard from "../../components/CoinCard";
import {CMContext} from "../../context/context";

export default function Funds() {
  let {getCoins} = useContext(CMContext);
  let [coinData, setCoinData] = useState(null);

  const octop = {
    name: "Octy",
    color: "yellow",
    age: 4,
  };

  useEffect(() => {
    setData();
  }, []);

  const setData = useCallback(async () => {
    try {
      let apiResponse = await getCoins();
      setCoinData(apiResponse);
    } catch (error) {
      console.log(error.message);
    }
  }, [getCoins]);
  console.log(coinData);

  return (
    <>
      <CoinCard coin={octop} />
    </>
  );
}
