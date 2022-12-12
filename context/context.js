import {createContext, useContext, useState} from "react";

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

  return <CMContext.Provider value={{getCoins}}>{children}</CMContext.Provider>;
};

const ActivityContext = createContext();

export function ActivityProvider({children}) {
  const [activities, setActivities] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const {titel, link, blockchain, date, description} = form.elements;
    const newActivity = {
      id: activities.length + 1,
      titel: titel,
      link: link.value,
      blockchain: blockchain.value,
      date: date.value,
      description: description.value,
    };
    setActivities(activities => {
      return [newActivity, ...activities];
    });
    form.reset();
    titel.focus();

    console.log(activities);
  }

  return (
    <ActivityContext.Provider value={{handleSubmit}}>
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivities() {
  return useContext(ActivityContext);
}
