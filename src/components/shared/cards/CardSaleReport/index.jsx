import React from "react";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";

const CardSaleReport = ({ datas, titulo }) => {
  const array = [];
  const colors = [
    "#E6B0AA",
    "#D2B4DE ",
    "#AED6F1",
    "#A2D9CE",
    "#ABEBC6",
    "#F5CBA7",
    "#F5B7B1",
    "#D7BDE2",
    "#A9CCE3",
    "#A9DFBF",
    "#F9E79F",
    "#F5CBA7",
    "#D98880",
    "#C39BD3",
    "#7FB3D5",
    "#7DCEA0",
    "#F7DC6F",
    "#F0B27A",
    "#EC7063",
    "#A569BD",
    "#5DADE2",
    "#D2B4DE",
    "#58D68D",
    "#F5B041",
    "#F4D03F",
    "#DC7633",
    "#EB984E",
    "#EDBB99",
    "#D7BDE2",
    "#F5B7B1",
  ];
  datas?.map((item) => {
    const dsColor = colors[item.id];
    array.push({
      ...item,
      backgroundColor: dsColor,
      borderColor: dsColor,
      tension: 0.2,
    });
  });
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
    datasets: array,
  };

  const options = {
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
    interaction: {
      mode: "index",
      intersect: false,
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
