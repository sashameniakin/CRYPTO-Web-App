import {useContext} from "react";
import {createContext} from "react";
import {useEffect, useState} from "react";

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

const ActivitiesContext = createContext(null);

export function ActivitiesProvider({children}) {
  const [activities, setActivities] = useState(() => {
    if (typeof window !== "undefined") {
      const localData = JSON.parse(localStorage.getItem("tasks"));
      return localData ?? activities;
    }
  });
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(activities));
  }, [activities]);

  function handleDetails(idToOpen) {
    setActivities(activities =>
      activities.map(activity => {
        if (activity.id === idToOpen) {
          return {...activity, isOpen: !activity.isOpen};
        } else {
          return activity;
        }
      })
    );
  }

  function handleDelete(idToDelete) {
    setActivities(activities =>
      activities.filter(activity => activity.id !== idToDelete)
    );
  }

  function handleClick(idToDone) {
    setActivities(activities =>
      activities.map(activity => {
        if (activity.id === idToDone) {
          return {...activity, selected: !activity.selected};
        } else {
          return activity;
        }
      })
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const {titel, link, blockchain, date, description} = form.elements;
    const values = Math.max(...activities.map(activity => activity.id));

    const newActivity = {
      id: values + 1,
      titel: titel.value,
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
  }
  /*   function handleSubmitBlockchain(event) {
    event.preventDefault();
    const form = event.target;
    const {blockchain} = form.elements;
    const newBlockchain = {
      id: options.length + 1,
      blockchain: blockchain.value,
    };

    setOptions(options => {
      return [newBlockchain, ...options];
    });

    form.reset();
    blockchain.focus();
  } */

  /*   function setUpdate(updatedValue, idToEdit) {
    setActivities(activities =>
      activities.map(activity => {
        if (activity.id === idToEdit) {
          return {...activity, description: updatedValue};
        } else {
          return activity;
        }
      })
    );
  } */

  /*   let [options, setOptions] = useState(() => {
    if (typeof window !== "undefined") {
      const localData = JSON.parse(localStorage.getItem("blockchains"));
      return (
        localData ?? [
          {id: 0, blockchain: "Ethereum"},
          {id: 1, blockchain: "Polygon"},
          {id: 2, blockchain: "BSC"},
          {id: 3, blockchain: "Optimism"},
        ]
      );
    }
  });

  useEffect(() => {
    localStorage.setItem("blockchains", JSON.stringify(options));
  }, [options]); */

  return (
    <ActivitiesContext.Provider
      value={{
        handleSubmit,
        activities,
        setActivities,
        handleDetails,
        handleDelete,
        handleClick,
        /*   handleSubmitBlockchain, */
        /*    options,
        setUpdate, */
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
}

export function useActivities() {
  return useContext(ActivitiesContext);
}
