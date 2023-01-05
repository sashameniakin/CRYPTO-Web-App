import {Doughnut} from "react-chartjs-2";
import {Chart} from "chart.js";
import {useEffect, useState} from "react";

Chart.overrides.doughnut.plugins.legend.position = "left";
Chart.overrides.doughnut.plugins.legend.display = true;
Chart.overrides.doughnut.plugins.legend.labels.boxWidth = 10;
Chart.overrides.doughnut.plugins.legend.labels.color = "white";

const Diagram = ({diagram, coins}) => {
  const amountArray = diagram?.map(element => {
    return element.amount;
  });
  const nameArray = diagram?.map(element => {
    return element.name;
  });
  const costArray = diagram?.map(element => {
    return element.inDollars;
  });
  const actualPriceArray =
    coins &&
    diagram
      ?.map(element => {
        const object = coins?.filter(coin => coin.name === element.name);
        return object[0]?.quote?.USD?.price.toFixed(2);
      })
      .map((element, i) => {
        return amountArray[i] * element;
      });

  const colorArray = diagram?.map(() => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  });

  const [data, setData] = useState({
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ["red", "blue", "yellow"],
      },
    ],
    labels: ["Red", "Blue", "Yellow"],
  });

  useEffect(() => {
    const labels = [];
    const data = [];
    const worth = [];
    const worthLive = [];
    amountArray?.map(value => {
      data.push(value);
    });
    costArray?.map(value => {
      worth.push(value);
    });
    nameArray?.map(value => {
      labels.push(value);
    });
    actualPriceArray?.map(value => {
      worthLive.push(value);
    });
    setData({
      datasets: [
        {
          label: "quantity",
          data: data,
          backgroundColor: colorArray,
          hoverOffset: 4,
          borderRadius: 100,
        },
        {
          label: "worth:",
          data: worth,
          backgroundColor: colorArray,
          hoverOffset: 4,
          borderRadius: 100,
        },
        {
          label: "worth live",
          data: worthLive,
          backgroundColor: colorArray,
          hoverOffset: 4,
          borderRadius: 100,
        },
      ],
      labels: labels,
    });
  }, [diagram, coins]);

  return <Doughnut data={data} height={300} width={300} />;
};

export default Diagram;
