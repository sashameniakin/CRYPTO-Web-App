import {useContext} from "react";
import {createContext} from "react";
import {useEffect, useState} from "react";
import {setGlobalState, useGlobalState} from "../state";

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
const FundsContext = createContext(null);
const ArchiveContext = createContext(null);
const StatesContext = createContext(null);

export function ActivitiesProvider({children}) {
  const [activities, setActivities] = useState(() => {
    if (typeof window !== "undefined") {
      const localData = JSON.parse(localStorage.getItem("tasks"));
      return (
        localData ?? [
          {
            id: 0,
            titel: "Example",
            link: "nft.de",
            blockchain: "BSC",
            date: "",
            description: "example",
          },
          {
            id: 1,
            titel: "Example",
            link: "nft.de",
            blockchain: "BSC",
            date: "",
            description: "example",
          },
        ]
      );
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
    setGlobalState("openForm", false);
    setGlobalState("openPopupWellDone", true);
    form.reset();
    titel.focus();
  }
  function handleSubmitBlockchain(event) {
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

    setGlobalState("openPopupAddBlockchain", false);
    setGlobalState("openPopupWellDone", true);
    form.reset();
    blockchain.focus();
  }

  function setUpdate(updatedValue, idToEdit) {
    setActivities(activities =>
      activities.map(activity => {
        if (activity.id === idToEdit) {
          return {...activity, description: updatedValue};
        } else {
          return activity;
        }
      })
    );
  }

  let [options, setOptions] = useState(() => {
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
  }, [options]);

  return (
    <ActivitiesContext.Provider
      value={{
        handleSubmit,
        activities,
        setActivities,
        handleDetails,
        handleDelete,
        handleClick,
        handleSubmitBlockchain,
        options,
        setUpdate,
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
}

export function FundsProvider({children}) {
  const [coinPrice] = useGlobalState("coinPrice");
  const [coinName] = useGlobalState("coinName");
  const [coinSymbol] = useGlobalState("coinSymbol");
  const [transactions, setTransactions] = useState(() => {
    if (typeof window !== "undefined") {
      const localData = JSON.parse(localStorage.getItem("transactions"));
      return localData ?? null;
    }
  });
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const [diagram, setDiagram] = useState(() => {
    if (typeof window !== "undefined") {
      const localData = JSON.parse(localStorage.getItem("diagram"));
      return localData ?? null;
    }
  });
  useEffect(() => {
    localStorage.setItem("diagram", JSON.stringify(diagram));
  }, [diagram]);

  const handleBuy = async event => {
    event.preventDefault();
    const coin = diagram?.filter(coin => coin.name === coinName);
    const form = event.target;
    const {amount} = form.elements;
    const valueFromForm = amount.value;

    if (diagram === null) {
      const valuesDiagram = 0;

      const diagramValue = {
        id: valuesDiagram + 1,
        action: "BUY",
        name: coinName,
        amount: valueFromForm * 1,
        inDollars: amount.value * coinPrice,
      };

      const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(diagramValue),
      };

      const response = await fetch("api/diagramValues", options);
      const result = await response.json();

      setDiagram([diagramValue]);
    } else if (coin.length !== 0) {
      setDiagram(diagram =>
        diagram.map(value => {
          if (value.name === coinName) {
            return {
              ...value,
              amount: value.amount * 1 + valueFromForm * 1,
              inDollars: value.inDollars * 1 + valueFromForm * 1 * coinPrice,
            };
          } else {
            return value;
          }
        })
      );
    } else if (coin.length === 0) {
      const valuesDiagram = Math.max(...diagram.map(value => value.id));

      const diagramValue = {
        id: valuesDiagram + 1,
        action: "BUY",
        name: coinName,
        amount: valueFromForm * 1,
        inDollars: valueFromForm * 1 * coinPrice,
      };

      setDiagram(values => {
        return [diagramValue, ...values];
      });
    }

    const currDate = new Date().toLocaleDateString();
    const currTime = new Date().toLocaleTimeString();

    const values =
      transactions === null
        ? 0
        : Math.max(...transactions.map(value => value.id));

    const newValue = {
      id: values + 1,
      action: "BUY",
      name: coinSymbol,
      amount: amount.value,
      price: coinPrice,
      date: currDate,
      time: currTime,
    };

    setTransactions(values => {
      return transactions === null ? [newValue] : [newValue, ...values];
    });

    form.reset();
    amount.focus();
  };

  function handleSell(event) {
    event.preventDefault();
    const coin = diagram?.filter(coin => coin.name === coinName);
    const form = event.target;
    const {amount} = form.elements;
    const valueFromForm = amount.value;

    if (diagram === null) {
      alert("You don't have any funds!");
    } else if (coin.length !== 0) {
      if (valueFromForm > coin[0].amount) {
        alert("You can't sell more then you have!");
      } else if (valueFromForm == coin[0].amount) {
        setDiagram(diagram => diagram.filter(value => value.name !== coinName));
      } else if (valueFromForm < coin[0].amount) {
        setDiagram(diagram =>
          diagram.map(value => {
            if (value.name === coinName) {
              return {
                ...value,
                amount: value.amount * 1 - valueFromForm * 1,
                inDollars: value.inDollars * 1 - valueFromForm * 1 * coinPrice,
              };
            } else {
              return value;
            }
          })
        );
      }
    } else if (coin.length === 0) {
      alert("You don't have this coin in your portfolio!");
    }

    const currDate = new Date().toLocaleDateString();
    const currTime = new Date().toLocaleTimeString();

    const values =
      transactions === null
        ? 0
        : Math.max(...transactions.map(value => value.id));

    const newValue = {
      id: values + 1,
      action: "SELL",
      name: coinSymbol,
      amount: amount.value,
      price: coinPrice,
      date: currDate,
      time: currTime,
    };

    setTransactions(values => {
      return transactions === null ? [newValue] : [newValue, ...values];
    });

    form.reset();
    amount.focus();
  }
  return (
    <FundsContext.Provider
      value={{
        handleBuy,
        handleSell,
        transactions,
        diagram,
      }}
    >
      {children}
    </FundsContext.Provider>
  );
}

export function ArchiveProvider({children}) {
  const [archive, setArchive] = useState(null);
  const [shouldReload, setShouldReload] = useState(true);
  const {activities} = useActivities();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getArchive = async () => {
      try {
        const url = "/api/tasksValues";
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setArchive(data);

          setShouldReload(false);
        } else {
          throw new Error(
            `Fetch fehlgeschlagen mit Status: ${response.status}`
          );
        }
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    };
    getArchive();
  }, [shouldReload]);

  const sendToMongoArchive = async id => {
    const activityToArchive = activities?.filter(
      activity => activity.id === id
    );

    const archiveValue = {
      title: activityToArchive[0].titel,
      link: activityToArchive[0].link,
      blockchain: activityToArchive[0].blockchain,
      deadline: activityToArchive[0].date,
      description: activityToArchive[0].description,
    };

    const options = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(archiveValue),
    };
    const response = await fetch("api/tasksValues", options);
    if (response.ok) {
      setGlobalState("openPopupSended", true);
    }
    const result = await response.json();
    setShouldReload(true);
  };

  const handleDelete = async id => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      setShouldReload(true);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <ArchiveContext.Provider
      value={{
        archive,
        sendToMongoArchive,
        handleDelete,
      }}
    >
      {children}
    </ArchiveContext.Provider>
  );
}

export function StatesProvider({children}) {
  const [popupMongo, setPopupMongo] = useState(false);

  function closePopupMongo() {
    setPopupMongo(false);
  }
  function openArchive() {
    setPopupMongo(true);
  }

  return (
    <StatesContext.Provider value={{closePopupMongo, openArchive, popupMongo}}>
      {children}
    </StatesContext.Provider>
  );
}

export function useStates() {
  return useContext(StatesContext);
}

export function useArchive() {
  return useContext(ArchiveContext);
}

export function useFunds() {
  return useContext(FundsContext);
}

export function useActivities() {
  return useContext(ActivitiesContext);
}
