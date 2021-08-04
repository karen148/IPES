import axios from "axios";

/**
 *@function
 *@name getAdminsCedula
 *@description Para verificar si el usuario ya esta registrado como admin
 *@params {string} cedula - nùmero de la cèdula
 *
 */
export const getAdminsCedula = (cedula, nombre, telefonos, rol, email) => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(
        process.env.REACT_APP_URL_API + "admins/findByCedula/" + cedula,
        config
      )
      .then((response) => {
        console.log(response);
      })
      .catch(() => {
        /**
         * Sí, canta error significa que el usuario no esta registrado
         * en la base de datos, por lo tanto registramos el usuario nuevo.
         *
         */
        dispatch(setAdmins(cedula, nombre, telefonos, rol, email));
      });
  };
};

export const setAdmins = (cedula, nombre, telefonos, rol, email) => {
  return async () => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    let pass = "";
    if (rol === "ADMIN_LOCATARIO") {
      pass = "CC" + cedula;
    } else if (rol === "SUPER_ADMIN") {
      pass = cedula;
    }
    axios
      .post(
        process.env.REACT_APP_URL_API + "admins/registerAdmin",
        {
          email: email !== "" ? email : cedula,
          password: pass,
          rol: rol,
          nombre: nombre.toUpperCase(),
          apellido: "",
          cedula: cedula,
          telefonos: telefonos,
        },
        config
      )
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};
