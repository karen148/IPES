import axios from "axios";
import { types } from "types";

let data2 = [];
let data3 = [];

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
        let data = response.data.pedidos;
        if (data2.findIndex((dat) => dat.id_plaza === id) === -1) {
          data2.push(...data2, { id_plaza: id, locatarios: [...data] });
        }
        dispatch(TopLocatariosPlaza([...new Set(data2)]));
      })
      .catch(() => {
        if (data2.findIndex((dat) => dat.id_plaza === id) === -1) {
          data2.push(...data2, {
            id_plaza: id,
            locatarios: [{ nombre: "No hay locatarios" }],
          });
        }
        dispatch(TopLocatariosPlaza([...new Set(data2)]));
      });
    console.log(data2);
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

export const getProductosMasVendidos = (id) => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(
        process.env.REACT_APP_URL_API +
          "pedidos/productosMasVendidosPorPlaza/" +
          id,
        config
      )
      .then((response) => {
        let data = response.data.pedidos;
        if (data3.findIndex((dat) => dat.id_plaza === id) === -1) {
          data3.push(...data3, { id_plaza: id, productos: [...data] });
        }
        dispatch(TopProductosPlaza([...new Set(data3)]));
      })
      .catch(() => {
        if (data3.findIndex((dat) => dat.id_plaza === id) === -1) {
          data3.push(...data3, {
            id_plaza: id,
            productos: [{ nombre: "No hay productos" }],
          });
        }
        dispatch(TopProductosPlaza([...new Set(data3)]));
      });
    console.log(data3);
  };
};

const TopProductosPlaza = (data) => ({
  type: types.balanceTopProductosPlaza,
  topproductoplaza: data,
});

export const getGananciasPlaza = (fecha1, fecha2) => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .post(
        process.env.REACT_APP_URL_API + "pedidos/historicosDeVentas",
        {
          fechaFin: fecha2,
          fechaIn: fecha1,
        },
        config
      )
      .then((response) => {
        let data = response.data.historicos;
        dispatch(gananciasPlaza(data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

const gananciasPlaza = (data) => ({
  type: types.gananciasPlaza,
  ganancia: data,
});

export const getDomiciliosPlaza = (fecha1, fecha2) => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .post(
        process.env.REACT_APP_URL_API + "pedidos/historicosDeDomicilios",
        {
          fechaFin: fecha2,
          fechaIn: fecha1,
        },
        config
      )
      .then((response) => {
        let data = response.data.historicos;
        dispatch(domiciliosPlaza(data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

const domiciliosPlaza = (data) => ({
  type: types.domiciliosPlaza,
  domicilio: data,
});
