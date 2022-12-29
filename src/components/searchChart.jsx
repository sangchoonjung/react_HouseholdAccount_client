import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: 'y' ,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right' ,
    },
    title: {
      display: true,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};

function SearchChart({ datas }) {
  const labels = ["현금/카드 사용비율"];
  let cardSum = 0;
  let cashSum = 0;
    datas.forEach(one => {
        if (one.cashAmt) {
            cashSum += Number(one.cashAmt);
        }
        if (one.cardAmt) {
            cardSum += Number(one.cardAmt);
        }
          
    });


    console.log(datas)
      const data = {
        labels,
        datasets: [
          {
            label: "현금",
            data: [cashSum],
            backgroundColor: "rgb(255,99,132)",
          },
          {
            label: "카드",
            data: [cardSum],
            backgroundColor: "rgb(2,255,150)",
          },
        ],
      };
  

    return <Bar options={options} data={data} height={ 50} />;
}

export default SearchChart;

