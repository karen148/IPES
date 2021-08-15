import axios from "axios";
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

export const getLocatariosMasVendidos = (id) => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(
        process.env.REACT_APP_URL_API +
          "pedidos/locatariosMasVendidosPorPlaza/" +
          id,
        config
      )
      .then((response) => {
        console.log(response);
        let data = response.data.pedidos;
        dispatch(TopLocatariosPlaza(data));
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
        dispatch(TopLocatariosPlaza([{ id: 1, nombre: "no hay locatarios" }]));
      });
  };
};

const TopLocatariosPlaza = (data) => ({
  type: types.balanceLocatariosPlaza,
  toplocatarioplaza: data,
});

export const getLocatariosPlazas = () => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(
        process.env.REACT_APP_URL_API + "pedidos/locatariosMasVendidos",
        config
      )
      .then((response) => {
        let data = response.data.pedidos;
        dispatch(TopLocatarios(data));
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

const TopLocatarios = (data) => ({
  type: types.balanceLocatariosVendidos,
  toplocatario: data,
});

export const getTopProductos = () => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(
        process.env.REACT_APP_URL_API + "pedidos/productosMasVendidos",
        config
      )
      .then((response) => {
        let data = response.data.pedidos;
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
