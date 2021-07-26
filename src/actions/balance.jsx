import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import { types } from "types";

export const getGananciasTotales = (setGanancias) => {
  return async () => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(
        process.env.REACT_APP_URL_API + "balances/getGananciasTotales",
        config
      )
      .then((response) => {
        let data = response.data.ganancias;
        setGanancias(data);
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

export const getGananciasLocatario = (setGanancias, id) => {
  return async () => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(
        process.env.REACT_APP_URL_API +
          "balances/getGananciasPorLocatarioID/" +
          id,
        config
      )
      .then((response) => {
        let data = response.data.ganancias;
        setGanancias(data);
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

export const getProductosVendidos = () => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(
        process.env.REACT_APP_URL_API +
          "ventaProductoLocatarios/getCantidadProductosVendidos",
        config
      )
      .then((response) => {
        let data = response.data.cantidad;
        dispatch(ProductosVendidos(data));
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

const ProductosVendidos = (data) => ({
  type: types.balanceCantidadProductosVendidos,
  cantidadproducto: data,
});

export const getTopProductosVendidos = () => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(
        process.env.REACT_APP_URL_API +
          "ventaProductoLocatarios/getMasVendidos",
        config
      )
      .then((response) => {
        let data = response.data.productos;
        dispatch(TopProductos(data));
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

const TopProductos = (data) => ({
  type: types.balanceTopProductos,
  topproducto: data,
});

export const getUltimosPedidos = (setPedidos) => {
  return async () => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(process.env.REACT_APP_URL_API + "pedidos/getUltimosCinco", config)
      .then((response) => {
        let data = response.data.pedidos;
        console.log(data);
        const pedidos = data.map((item, index) => ({
          id: item.id,
          conteo: index + 1,
          pasarela: item.pasarela_pagos_id,
          plaza: item.plaza_id,
          locatario: item.locatorios_id,
          cliente: item.cliente_id,
          cliente_dato: item.cliente,
          productos: item.productos_locatarios_id,
          estado: item.estado,
          total: item.total,
          pagado: item.pagado ? "0" : "1",
          fecha:
            item.updated_at === null
              ? item.created_at.slice(0, 10)
              : item.updated_at.slice(0, 10),
          acciones: [
            {
              name: "Editar el estado del pedido",
              icon: <EditIcon />,
              id: item.id,
            },
          ],
        }));
        setPedidos(pedidos);
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};
