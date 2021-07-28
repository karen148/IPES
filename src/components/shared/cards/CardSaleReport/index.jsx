import React from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
// const Chart = () => import('react-apexcharts');

const CardSaleReport = () => {
  const { plazanombres, plazaGanancias } = useSelector((state) => state.plaza);
  const data = {
    labels: plazanombres,
    datasets: [
      {
        label: "Ganancia $",
        data: plazaGanancias,
        backgroundColor: "rgb(233,176,41, 0.73)",
        borderColor: "rgba(90, 0, 28)",
        fill: false,
        cubicInterpolationMode: "monotone",
        tension: 0.4,
        // backgroundColor: [
        //   "rgba(61, 190, 151, 0.1)",
        //   "rgba(70, 65, 107, 0.1)",
        //   "rgba(150, 250, 39, 0.1)",
        //   "rgba(255, 45, 66, 0.1)",
        //   "rgba(90, 0, 28, 0.1)",
        // ],
        // borderColor: [
        //   "rgba(61, 190, 151, 1)",
        //   "rgba(70, 65, 107, 1)",
        //   "rgba(150, 250, 39, 1)",
        //   "rgba(255, 45, 66, 1)",
        //   "rgba(90, 0, 28, 1)",
        // ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <div className="ps-card ps-card--sale-report">
      <div className="ps-card__header">
        <h4>Informes de ventas</h4>
      </div>

      <div className="ps-card__content">
        <div id="chart"></div>
        <Bar data={data} options={options} />
      </div>

      <div className="ps-card__footer">
        <div className="row">
          <div className="col-md-8">
            <p>Artículos que generan ventas ($)</p>
          </div>
          <div className="col-md-4">
            <a href="/">
              Reporte de exportacion
              <i className="lnr lnr-cloud-download ml-2"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSaleReport;
