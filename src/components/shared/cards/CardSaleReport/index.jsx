import React from "react";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";

const CardSaleReport = ({ datas, titulo }) => {
  const data = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: datas,
  };

  const options = {
    title: {
      display: true,
      text: "Chart.js Line Chart",
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
        <h4>{titulo}</h4>
      </div>

      <div className="ps-card__content">
        <div id="chart"></div>
        <Line data={data} options={options} />
      </div>

      <div className="ps-card__footer">
        <div className="row">
          <div className="col-md-12">
            <a href="/">
              Descargar información
              <i className="lnr lnr-cloud-download ml-2"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
CardSaleReport.propTypes = {
  datas: PropTypes.array,
  titulo: PropTypes.string,
};
export default CardSaleReport;
