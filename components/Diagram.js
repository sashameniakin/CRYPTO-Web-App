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
  const actualPriceArray = diagram
    ?.map(element => {
      const object = coins?.filter(coin => coin.name === element.name);
      return object[0]?.quote?.USD?.price.toFixed(2);
    })
    .map((element, i) => {
      return amountArray[i] * element;
    });
  /*   actualPriceArray.map((element, i) => {
return amountArray[i]*element;
  })  */
  console.log(actualPriceArray);
  const colorArray = diagram?.map(() => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  });
  /*   console.log(amountArray);
  console.log(colorArray); */
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
  }, [diagram]);

  /*   const textCenter = {
    id: "textCenter",

    beforeDatasetsDraw(chart, args, pluginOptions) {
      const {ctx, data} = chart;

      ctx.save();
      ctx.font = "bolder 60px sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseLine = "middle";

      ctx.fillText(
        "t",
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
    },
  }; */

  return <Doughnut data={data} height={2000} width={2000} />;
};

export default Diagram;
