import { Bar } from "react-chartjs-2";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function HistoryBar({ datas }) {
  const options = {
    plugins: {
      title: {
        display: true,
        text: "카테고리별 사용금액",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  const labels = ["미분류", "생활", "교통", "고정비", "기타"];
  const cardSum = [0, 0, 0, 0, 0];
  const cashSum = [0, 0, 0, 0, 0];
  datas.forEach((one) => {
    let idx = labels.indexOf(one.category);

    if (idx !== -1) {
      cashSum[idx] += one.cashAmt ?? 0;
      cardSum[idx] += one.cardAmt ?? 0;
    }
  });

  const data = {
    labels,
    datasets: [
      {
        label: "현금",
        data: cashSum,
        backgroundColor: "rgb(255,99,132)",
      },
      {
        label: "카드",
        data: cardSum,
        backgroundColor: "rgb(2,255,150)",
      },
    ],
  };

  return <Bar data={data} options={options} />;
}

export default HistoryBar;
