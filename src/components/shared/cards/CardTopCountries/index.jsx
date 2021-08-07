import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const CardTopCountries = ({ titulo }) => {
  const { TopProductos } = useSelector((state) => state.balance);
  return (
    <section className="ps-card ps-card--top-country">
      <div className="ps-card__header">
        <h4>{titulo}</h4>
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

CardTopCountries.propTypes = {
  titulo: PropTypes.string,
};

export default CardTopCountries;
