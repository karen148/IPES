import React from 'react';
import map from './map-and-bundle.png'

const CardTopCountries = () => (
    <section className="ps-card ps-card--top-country">
        <div className="ps-card__header">
            <h4>Top Países</h4>
        </div>
        <div className="ps-card__content">
            <div className="row">
                <div className="col-6">
                    <figure className="organge">
                        <figcaption>Estados Unidos</figcaption>
                        <strong>80%</strong>
                    </figure>
                </div>
                <div className="col-6">
                    <figure className="red">
                        <figcaption>Reino Unido</figcaption>
                        <strong>65%</strong>
                    </figure>
                </div>
                <div className="col-6">
                    <figure className="green">
                        <figcaption>Alemania</figcaption>
                        <strong>65%</strong>
                    </figure>
                </div>
                <div className="col-6">
                    <figure className="cyan">
                        <figcaption>Rusia</figcaption>
                        <strong>35%</strong>
                    </figure>
                </div>
            </div>
            <img src={map} alt="" />
            <p>Solo comenzamos a recopilar datos de la región a partir de enero de 2015</p>
        </div>
    </section>
);

export default CardTopCountries;
