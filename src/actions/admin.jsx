import axios from "axios";
import firebase from "firebase";
import { updateImg } from "./imagen";

/**
 * @function getAdminsCedula
 * @description Para verificar si el usuario ya esta registrado como admin y el endpoint
 * es consumido componentes/shared/modal/Locatario/Crear, actions/locatario/setLocatariosExcel y
 * componentes/shared/form/FormAccountSettings
 * @param {string} cedula
 * @param {string} nombre
 * @param {string} telefonos
 * @param {string} rol - rol el cual va tener el usuario solo se maneja dos roles
 * ADMIN_LOCATARIO Y SUPER_ADMIN se debe deligenciar tal cual como lo ven
 * @param {string} email
 * @returns
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
         */
        dispatch(setAdmins(cedula, nombre, telefonos, rol, email));
      });
  };
};

/**
 * @function setAdmins
 * @description Para crear el SUPER_ADMIN o ADMIN_LOCATARIO, si el admin_locatario no tiene correo electronico
 * para ingresar a la plataforma se coloca por defecto la cedula y para los dos admins al momento de crearlos
 * se crea la contraseña con CC y el número de la cédula
 * @param {string} cedula
 * @param {string} nombre
 * @param {array} telefonos
 * @param {string} rol
 * @param {string} email
 * @returns data
 */
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

/**
 * @function getDatos
 * @description En esta función se obtiene los datos del admin para mostrarlos en la vista
 * Perfil (componentes/shared/form/FormAccountSettings)
 * @param {function} setState
 * @param {array} state
 * @param {function} setEmail
 * @param {string} id
 * @returns data
 */
export const getDatos = (setState, state, setEmail, id) => {
  return async () => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(process.env.REACT_APP_URL_API + `admins/getAdmin/${id}`, config)
      .then((response) => {
        let data = response.data.admin;
        setState({ state, nombre: data.nombre });
        setState({ state, telefono: data.telefono });
        setState({ state, email: data.email });
        setState({ state, cedula: data.cedula });
        setEmail(data.email);
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

/**
 * @function updateAdmin
 * @description Actualiza los datos del admin en la vista perfil
 * (componentes/shared/form/FormAccountSettings)
 * @param {string} nombre
 * @param {number} telefono
 * @param {string} cedula
 * @param {string} email
 * @param {string} id
 * @returns
 */
export const updateAdmin = (nombre, telefono, cedula, email, id) => {
  return async () => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .put(
        process.env.REACT_APP_URL_API + `admins/updateAdmin/${id}`,
        {
          nombre: nombre,
          telefono: telefono,
          cedula: cedula,
          email: email,
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

/**
 * @function updateImagen
 * @description Es para actualizar la foto de perfil del admin, en el dashboard la foto se actualiza con la
 * función updateImg y se elimina la que ya estaba con la referencia de la imagen(desertRef), con la función
 * delete de firebase. El consumo del endpoint se ubica en (componentes/shared/form/FormAccountSettings)
 * @param {string} img1 - Es la imagn que se va subir
 * @param {string} rol
 * @param {string} id
 * @param {string} img - Es la imagen que el usuario ya tenia antes en su foto de perfil
 */
export const updateImagen = (img1, rol, id, img) => {
  return async () => {
    updateImg(img1, `ADMINS/${rol}/${id}`, `admins/updateAdmin/${id}`, "img");
    var desertRef = firebase
      .app()
      .storage("gs://ipes-adeda.appspot.com")
      .ref(`/ADMINS/${rol}/${id}`)
      .child(`${img}`);
    desertRef
      .delete()
      .then((ref) => console.log("success =>", ref))
      .catch((error) => console.log(error));
  };
};

/**
 * @function changePass
 * @description Permite el cambio de contraseña desde desde la vista perfil (componentes/shared/form/FormAccountSettings)
 * @param {string} email1
 * @param {string} antigua
 * @param {string} contraseña
 * @param {string} ValiContraseña
 * @param {string} confirmar_contraseña
 * @returns
 */
export const changePass = (
  email1,
  antigua,
  contraseña,
  ValiContraseña,
  confirmar_contraseña
) => {
  return async () => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    if (ValiContraseña(confirmar_contraseña)) {
      axios
        .put(
          process.env.REACT_APP_URL_API + "admins/change-password",
          {
            email: email1,
            oldPassword: antigua,
            newPassword: contraseña,
          },
          config
        )
        .then((response) => {
          if (response.status === 200) {
            alert("Se atualizo la contraseña");
          } else {
            alert("No se atualizo la contraseña");
          }
        })
        .catch((error) => {
          if (error.response) {
            //do something
            console.log(error.response);
          } else if (error.request) {
            //do something else
            console.log(error.request);
          } else if (error.message) {
            //do something other than the other two
            console.log(error.message);
          }
        });
    }
  };
};
