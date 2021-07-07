import axios from "axios";
import { types } from "./../types";
import Swal from "sweetalert2";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    axios
      .post(process.env.REACT_APP_URL_AUTH + "admin-auth/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          let responses = response.data;
          localStorage.setItem("id", responses.admin.id);
          localStorage.setItem("token", responses.token);
          localStorage.setItem("token-date", new Date().getTime());
          dispatch(
            login({
              rol: responses.admin.rol,
              id: responses.admin.id,
              name: responses.admin.nombre,
              img: responses.admin.img,
              codigo: responses.admin.cedula,
            })
          );
        }
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
        Swal.fire("Error", "Datos incorrectos", "error");
      });
  };
};

export const starChecking = () => {
  return async (dispatch) => {
    let config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        token: localStorage.getItem("token"),
      },
    };
    axios
      .get(process.env.REACT_APP_URL_API + "admins/renewToken", config)
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("token-date", new Date().getTime());
        let config1 = {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        };
        axios
          .get(
            process.env.REACT_APP_URL_API +
              "admins/getAdmin/" +
              localStorage.getItem("id"),
            config1
          )
          .then((response1) => {
            console.log(response1);
            let datos = response1.data.admin;
            dispatch(
              login({
                rol: datos.rol,
                id: datos.id,
                name: datos.nombre,
                img: datos.img,
                codigo: datos.cedula,
              })
            );
          })
          .catch((e) => {
            dispatch(checkingFinish());
            console.log("ERROR!!!!!", e);
          });
      })
      .catch((e) => {
        dispatch(checkingFinish());
        console.log("ERRORR", e);
      });
  };
};

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout);
  };
};

const logout = () => ({ type: types.authLogout });

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

const checkingFinish = () => ({ type: types.authCheckingFinish });
