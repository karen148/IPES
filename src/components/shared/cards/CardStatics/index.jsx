import React from 'react';

const CardStatics = () => (
    <section className="ps-card ps-card--statics">
        <div className="ps-card__header">
            <h4>Reporte </h4>
            <div className="ps-card__sortby">
                <i className="lnr lnr-calendar-full"> </i>
                <div className="form-group--select">
                    <select className="form-control">
                        <option value="1">Últimos 30 días</option>
                        <option value="2">Últimos 90 días</option>
                        <option value="3">Últimos 180 días</option>
                    </select>
                    <i className="icon-chevron-down"></i>
                </div>
            </div>
        </div>
        <div className="ps-card__content">
            <div className="ps-block--stat yellow">
                <div className="ps-block__left">
                    <span>
                        <i className="lnr lnr-cart"></i>
                    </span>
                </div>
                <div className="ps-block__content">
                    <p>Pedidos</p>
                    <h4>
                        254
                        <small className="asc">
                            <i className="lnr lnr-arrow-up"></i>
                            <span>12,5%</span>
                        </small>
                    </h4>
                </div>
            </div>
            <div className="ps-block--stat pink">
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
            </div>
        </div>
    </section>
);

export default CardStatics;
