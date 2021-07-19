import axios from "axios";
import { types } from "./../types";
import EditIcon from "@material-ui/icons/Edit";

export const DeletePedido = (id, estado) => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .put(
        process.env.REACT_APP_URL_API + "pedidos/update/" + id,
        {
          estado: estado,
        },
        config
      )
      .then((response) => {
        let data = response.data;
        dispatch(
          PedidoMensaje({
            ok: data.ok,
            msg: data.msg,
          })
        );
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

export const getPedidos = (setPedidos) => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(process.env.REACT_APP_URL_API + "pedidos/getAll", config)
      .then((response) => {
        let data = response.data.pedidos;
        console.log(response.data.pedidos);
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
        dispatch(PedidoDato({ ok: response.data.ok }));
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

export const getPedidosLocatarios = (setPedidos, id) => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(
        process.env.REACT_APP_URL_API + "pedidos/pedidosPorLocatario/" + id,
        config
      )
      .then((response1) => {
        let data = response1.data.pedidos;
        console.log(response1.data.pedidos);
        const pedidos = data.map((item1, index1) => ({
          id: item1.id,
          conteo: index1 + 1,
          pasarela: item1.pasarela_pagos_id,
          plaza: item1.plaza_id,
          locatario: item1.locatorios_id,
          cliente: item1.cliente_id,
          cliente_dato: item1.cliente,
          productos: item1.productos_locatarios_id,
          estado: item1.estado,
          total: item1.total,
          pagado: item1.pagado ? "0" : "1",
          fecha:
            item1.updated_at === null
              ? item1.created_at.slice(0, 10)
              : item1.updated_at.slice(0, 10),
          acciones: [
            {
              name: "Editar el estado del pedido",
              icon: <EditIcon />,
              id: item1.id,
            },
          ],
        }));
        setPedidos(pedidos);
        dispatch(PedidoDato({ ok: response1.data.ok }));
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

const PedidoDato = (mensajes) => ({
  type: types.pedidoDatos,
  payload: mensajes,
});

const PedidoMensaje = (mensajes) => ({
  type: types.pedidoMensaje,
  payload: mensajes,
});
