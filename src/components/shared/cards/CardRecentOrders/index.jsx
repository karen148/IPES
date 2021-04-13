import React from "react";
import TableOrderSummary from "./../../tables/TableOrderSummary";

const CardRecentOrders = () => (
  <div className="ps-card">
    <div className="ps-card__header">
      <h4>Órdenes recientes</h4>
    </div>

    <div className="ps-card__content">
      <TableOrderSummary />
    </div>

    <div className="ps-card__footer">
      <a className="ps-card__morelink" href="orders.htmls">
        Ver todos los pedidos
        <i className="lnr lnr-chevron-right"></i>
      </a>
    </div>
  </div>
);

export default CardRecentOrders;
