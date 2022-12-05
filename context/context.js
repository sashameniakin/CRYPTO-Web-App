import {createContext} from "react";

export const CMContext = createContext();

export const CMProvider = ({children}) => {
  const getCoins = async () => {
    try {
      const res = await fetch("/api/coinmarketcap-api");
      const data = await res.json();

      return data.data.data;
    } catch (error) {
      console.log(error.message);
    }
  };
  const getNews = async () => {
    try {
      const res = await fetch("/api/bind-api");
      const data = await res.json();

      return data.data.value;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <CMContext.Provider value={{getCoins, getNews}}>
      {children}
    </CMContext.Provider>
  );
};
