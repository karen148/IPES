import React from "react";
import { useSelector } from "react-redux";

const CardStatics = () => {
  const { CantidadProductos } = useSelector((state) => state.balance);
  return (
    <section className="ps-card ps-card--statics">
      <div className="ps-card__header">
        <h4>
          <i className="lnr lnr-calendar-full"> </i> Reporte por mes
        </h4>
      </div>
      <div className="ps-card__content">
        <div className="ps-block--stat yellow">
          <div className="ps-block__left">
            <span>
              <i className="lnr lnr-cart"></i>
            </span>
          </div>
          <div className="ps-block__content">
            <p>Productos vendidos</p>
            <h4>
              {CantidadProductos}
              {/* <small className="asc">
                <i className="lnr lnr-arrow-up"></i>
                <span>12,5%</span>
              </small> */}
            </h4>
          </div>
        </div>
        {/* <div className="ps-block--stat pink">
          <div className="ps-block__left">
            <span>
              <i className="lnr lnr-cart"></i>
            </span>
          </div>
          <div className="ps-block__content">
            <p>Ingresos</p>
            <h4>
              $6,260
              <small className="asc">
                <i className="lnr lnr-arrow-up"></i>
                <span>7.1%</span>
              </small>
            </h4>
          </div>
        </div>
        <div className="ps-block--stat green">
          <div className="ps-block__left">
            <span>
              <i className="lnr lnr-cart"></i>
            </span>
          </div>
          <div className="ps-block__content">
            <p>Ganancia</p>
            <h4>
              $2,567
              <small className="desc">
                <i className="lnr lnr-arrow-down"></i>
                <span>0.5%</span>
              </small>
            </h4>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default CardStatics;
