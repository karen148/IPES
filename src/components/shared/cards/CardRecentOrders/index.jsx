import React from "react";
import PropTypes from "prop-types";
import TablesPedidos from "components/shared/tables/TablaPedidos";

const CardRecentOrders = ({ pedidos, getDatos, clientes }) => {
  console.log(pedidos);
  return (
    <div className="ps-card">
      <div className="ps-card__header">
        <h4>Órdenes recientes</h4>
      </div>
      <div className="ps-card__content">
        <TablesPedidos
          datos={pedidos}
          getDatos={getDatos}
          clientes={clientes}
        />
      </div>
      <div className="ps-card__footer">
        <a className="ps-card__morelink" href="admin/pedidos">
          Ver todos los pedidos
          <i className="lnr lnr-chevron-right"></i>
        </a>
      </div>
    </div>
  );
};

CardRecentOrders.propTypes = {
  pedidos: PropTypes.array,
  getDatos: PropTypes.func,
  clientes: PropTypes.array,
};

export default CardRecentOrders;
