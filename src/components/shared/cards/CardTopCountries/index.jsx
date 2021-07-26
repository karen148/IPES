import React from "react";
import { useSelector } from "react-redux";

const CardTopCountries = () => {
  const { TopProductos } = useSelector((state) => state.balance);
  return (
    <section className="ps-card ps-card--top-country">
      <div className="ps-card__header">
        <h4>Top de los productos más vendidos</h4>
      </div>
      <div className="ps-card__content">
        <div className="row">
          {TopProductos.map((item, index) => {
            return (
              <div className="col-12" key={index + 1}>
                <figure className="organge">
                  <figcaption style={{ fontSize: "17px" }}>
                    {" "}
                    <strong>{index + 1} </strong>
                    {item.nombre}
                  </figcaption>
                </figure>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CardTopCountries;
