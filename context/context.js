import {useContext} from "react";
import {createContext} from "react";
import {useEffect, useState} from "react";
import {setGlobalState, useGlobalState} from "../state";

export const CMContext = createContext(null);

export const CMProvider = ({children}) => {
  let [coinData, setCoinData] = useState(null);

  useEffect(() => {
    const getCoins = async () => {
      try {
        const res = await fetch("/api/coinmarketcap-api");
        const data = await res.json();

        setCoinData(data.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getCoins();
  }, []);

  return <CMContext.Provider value={{coinData}}>{children}</CMContext.Provider>;
};

const ActivitiesContext = createContext(null);
const FundsContext = createContext(null);
const ArchiveContext = createContext(null);
const StatesContext = createContext(null);
const BookmarkedContext = createContext(null);
const UserContext = createContext(null);

export function ActivitiesProvider({children}) {
  const {setPopupWellDone} = useStates();
  const {setPopupDouble} = useStates();
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
    setPopupWellDone(true);

    form.reset();
    titel.focus();
  }
  function handleSubmitBlockchain(event) {
    event.preventDefault();
    const form = event.target;
    const {blockchain} = form.elements;

    const doubleOption = options?.filter(
      option => option.blockchain === blockchain.value
    );

    if (doubleOption.length > 0) {
      setGlobalState("openPopupAddBlockchain", false);
      setPopupDouble(true);
    } else {
      const newBlockchain = {
        id: options.length + 1,
        blockchain: blockchain.value,
      };

      setOptions(options => {
        return [newBlockchain, ...options];
      });

      setGlobalState("openPopupAddBlockchain", false);
      setPopupWellDone(true);
    }

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

//Funds Provider

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

// Archive Mongo DB

export function ArchiveProvider({children}) {
  const [archive, setArchive] = useState(null);
  const [shouldReload, setShouldReload] = useState(true);
  const {activities} = useActivities();

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

// Bookmarked Provider

export function BookmarkedProvider({children}) {
  const [bookmarked, setBookmarked] = useState(null);
  const [shouldReload, setShouldReload] = useState(true);
  const {coinData} = useCoins();

  useEffect(() => {
    const getBookmarked = async () => {
      try {
        const url = "/api/bookmarked";
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setBookmarked(data);

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
    getBookmarked();
  }, [shouldReload]);

  const handleBoookmarked = async id => {
    const coinToHandle = coinData?.filter(coin => coin.id === id);
    const filtered = bookmarked?.filter(
      coin => coin.name === coinToHandle[0].symbol
    );
    if (filtered.length > 0) {
      try {
        const response = await fetch(`/api/bookmarks/${filtered[0]._id}`, {
          method: "DELETE",
        });

        setShouldReload(true);
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    } else {
      const bookmarkedValue = {
        rank: coinToHandle[0].cmc_rank,
        name: coinToHandle[0].symbol,
        price: coinToHandle[0].quote.USD.price,
        markedCap: coinToHandle[0].quote.USD.market_cap,
        volume: coinToHandle[0].quote.USD.volume_24h,
      };

      const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bookmarkedValue),
      };

      const response = await fetch("api/bookmarked", options);
      const result = await response.json();
      setShouldReload(true);
    }
  };

  const handleDelete = async id => {
    try {
      const response = await fetch(`/api/bookmarks/${id}`, {
        method: "DELETE",
      });

      setShouldReload(true);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <BookmarkedContext.Provider
      value={{
        bookmarked,
        handleBoookmarked,
        handleDelete,
      }}
    >
      {children}
    </BookmarkedContext.Provider>
  );
}

// User Provider

export function UserProvider({children}) {
  const handleRegister = async event => {
    event.preventDefault();
    const form = event.target;
    const {first_name, last_name, email, password} = form.elements;

    const user = {
      firstname: first_name.value,
      lastname: last_name.value,
      email: email.value,
      password: password.value,
    };

    const options = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(user),
    };

    await fetch("api/userValues", options)
      .then(res => res.json())
      .then(data => {
        if (data.status == "ok") {
          alert("register successful");
        } else if (data.error == "User Exists") {
          alert("User Exists");
        }
        console.log(data, "userRegister");
      });
  };
  const handleLogin = async event => {
    event.preventDefault();
    const form = event.target;
    const {email, password} = form.elements;

    const login = {
      email: email.value,
      password: password.value,
    };
    const options = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(login),
    };
    await fetch("api/loginValues", options)
      .then(res => res.json())
      .then(data => {
        console.log(data, "userRegister");
        if (data.status == "ok") {
          alert("login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);
          window.location.href = "./profile";
        } else if (data.error == "User not found") {
          alert("User not found");
        } else if (data.error == "Invalid Password") {
          alert("Invalid Password");
        }
      });
  };

  return (
    <UserContext.Provider
      value={{
        handleRegister,
        handleLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// States Provider

export function StatesProvider({children}) {
  const [popupWellDone, setPopupWellDone] = useState(false);
  const [popupDouble, setPopupDouble] = useState(false);

  return (
    <StatesContext.Provider
      value={{
        setPopupWellDone,
        popupWellDone,
        setPopupDouble,
        popupDouble,
      }}
    >
      {children}
    </StatesContext.Provider>
  );
}

export function useStates() {
  return useContext(StatesContext);
}

export function useUser() {
  return useContext(UserContext);
}

export function useBookmarked() {
  return useContext(BookmarkedContext);
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

export function useCoins() {
  return useContext(CMContext);
}
