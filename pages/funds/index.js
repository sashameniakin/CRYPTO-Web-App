import {useCallback, useContext, useEffect, useState} from "react";

import {CMContext} from "../../context/context";

export default function Funds() {
  let {getCoins} = useContext(CMContext);
  let [coinData, setCoinData] = useState(null);

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

  return <p>Page Funds is under construction</p>;
}
