import axios from "axios";
import { types } from "./../types";
import DeleteIcon from "@material-ui/icons/Delete";

export const DeletePedido = (id) => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .put(
        process.env.REACT_APP_URL_API + "pedidos/update/" + id,
        {
          estado: "3",
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
              name: "Eliminar",
              icon: <DeleteIcon />,
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
              name: "Eliminar",
              icon: <DeleteIcon />,
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

const PedidoDato = (mensajes) => ({
  type: types.pedidoDatos,
  payload: mensajes,
});

// export const ExportarCliente = (idLocatario) => {
//     return async (dispatch) => {
//       let config = {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       };
//       axios
//         .get(
//           process.env.REACT_APP_URL_API + "/clientes/downladXLSX" + idLocatario,
//           {
//             activo: false,
//           },
//           config
//         )
//         .then((response) => {
//           let data = response.data;
//           dispatch(
//             ClienteMensaje({
//               ok: data.ok,
//               msg: data.msg,
//             })
//           );
//         })
//         .catch((e) => {
//           console.log("ERROR!!!!!", e);
//         });
//     };
//   };

const PedidoMensaje = (mensajes) => ({
  type: types.pedidoMensaje,
  payload: mensajes,
});
