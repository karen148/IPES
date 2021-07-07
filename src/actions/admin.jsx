import axios from "axios";

/**
 *@function
 *@name getAdminsCedula
 *@description Obtiene la información del usuario que se loguea
 * en la aplicativo web.
 *@params {string} cedula - nùmero de la cèdula
 *
 */
export const getAdminsCedula = (cedula, nombre, telefonos) => {
  return async () => {
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
         * Sí, canta error significa que no el usuario no esta registrado
         * en la base de datos, por lo tanto registramos el usuario nuevo.
         *
         */
        const pass = "123456"
        axios
          .post(
            process.env.REACT_APP_URL_API + "admins/registerAdmin",
            {
              email: cedula,
              password: pass,
              rol: "ADMIN_LOCATARIO",
              nombre: nombre,
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
      });
  };
};
