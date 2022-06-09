import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useSWR, { useSWRConfig } from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        drawTicks: false,
        drawOnChartArea: false,
      },
      ticks: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

function createGradient(ctx, area) {
  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(1, "rgba(255, 99, 132, 1)");
  gradient.addColorStop(0, "rgba(255, 99, 132, 0)");

  return gradient;
}

export const data = {
  labels,
  datasets: [
    {
      label: "Penjualan",
      data: labels.map((_, i) => (i % 2 == 0 ? 1000 * i : 500 * i)),
      borderColor: "rgb(255, 99, 132)",
      fill: true,
      backgroundColor: "rgba(255, 99, 132, 1)",
    },
    {
      label: "Untung",
      data: labels.map((_, i) => (i % 2 == 0 ? 500 * i : 1000 * i)),
      borderColor: "RGB(0, 118, 186)",
      // fill: true,
    },
  ],
};

export default function Chart() {
  const chartRef = React.useRef(null);
  const [chartData, setChartData] = React.useState({
    datasets: [],
  });
  const { mutate } = useSWRConfig();

  const { data: omset, error: omsetError } = useSWR(
    "/api/chart/omset",
    fetcher
  );

  const { data: beli, error: beliError } = useSWR("/api/chart/beli", fetcher);

  React.useEffect(() => {
    const chart = chartRef.current;

    if (!chart || !omset || !beli) {
      return;
    }

    const newData = [
      {
        label: "Penjualan",
        data: labels.map((label, i) => {
          const bulan = omset.filter((obj) => {
            return obj.bulan == i + 1;
          });
          return bulan[0]?.omset ? Number(bulan[0]?.omset) : 0;
        }),
        borderColor: "rgb(255, 99, 132)",
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
      {
        label: "Untung",
        data: labels.map((label, i) => {
          const bulan = beli.filter((obj) => {
            return obj.bulan == i + 1;
          });
          return bulan[0]?.omset ? Number(bulan[0]?.omset) : 0;
        }),
        borderColor: "RGB(0, 118, 186)",
        // fill: true,
      },
    ];

    const chartData = {
      ...data,
      datasets: newData.map((dataset) => ({
        ...dataset,
        backgroundColor:
          dataset.label == "Penjualan" &&
          createGradient(chart.ctx, chart.chartArea),
      })),
    };

    setChartData(chartData);
  }, [omset, beli]);

  return <Line options={options} ref={chartRef} data={chartData} />;
}
