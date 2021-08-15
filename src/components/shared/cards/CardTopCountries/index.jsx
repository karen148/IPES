import React from "react";
import PropTypes from "prop-types";

const CardTopCountries = ({ titulo, dato }) => {
  console.log(dato);
  return (
    <section className="ps-card ps-card--top-country">
      <div className="ps-card__header">
        <h4>{titulo}</h4>
      </div>
      <div className="ps-card__content">
        <div className="row">
          {dato?.map((item, index) => {
            console.log(item);
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
  dato: PropTypes.array,
};

export default CardTopCountries;
