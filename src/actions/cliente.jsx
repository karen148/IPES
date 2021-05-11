import axios from "axios";
import { types } from "./../types";

export const DeleteCliente = (idLocatario) => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .put(
        process.env.REACT_APP_URL_API + "clientes/delete/" + idLocatario,
        {
          activo: false,
        },
        config
      )
      .then((response) => {
        let data = response.data;
        dispatch(
          ClienteMensaje({
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

export const UpdateImagen = (img, id) => {
  return async (dispatch) => {
    const formData = new FormData();
    formData.append("imagen", img);
    formData.append("cliente", "img");
    let config1 = {
      method: "put",
      url: process.env.REACT_APP_URL_API + "uploads/CLIENTES/" + id,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: formData,
    };
    axios(config1)
      .then((response) => {
        let data = response.data;
        dispatch(
          ClienteMensaje({
            ok: data.ok,
            msg: data.msg,
          })
        );
      })
      .catch((e) => {
        console.log("ERROR", e);
      });
  };
};
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

const ClienteMensaje = (mensajes) => ({
  type: types.clienteMensaje,
  payload: mensajes,
});
