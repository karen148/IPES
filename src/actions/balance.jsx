import axios from "axios";

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
