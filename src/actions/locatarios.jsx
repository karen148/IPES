import axios from "axios";
import { types } from "./../types";
import { updateImg } from "./imagen";
import firebase from "firebase";
import { getAdminsCedula } from "./admin";

export const getLocatariosCedulaPlaza = (plaza, numerolocal, setMsg) => {
  return async () => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(
        process.env.REACT_APP_URL_API +
          `locatarios/findByNumeroDeLocalYPlazaId/${plaza}/${numerolocal}`,
        config
      )
      .then((response) => {
        console.log(response);
        setMsg("Existe");
      })
      .catch((e) => {
        setMsg("No existe");
        console.log("ERROR!!!!!", e);
      });
  };
};

export const UpdateLocatariosEmail = (email, idLocatario, setMsg) => {
  let config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return async (dispatch) => {
    axios
      .put(
        process.env.REACT_APP_URL_API + "locatarios/update/" + idLocatario,
        {
          email: email,
        },
        config
      )
      .then((response) => {
        let data = response.data;
        setMsg("El correo se actualizo");
        dispatch(
          LocatarioMensaje({
            ok: data.ok,
            msg: data.msg,
          })
        );
      })
      .catch((e) => {
        setMsg("No se actualizo la información");
        console.log("ERROR!!!!!", e);
      });
  };
};

export const UpdateAdminEmail = (email, idLocatario, setMsg) => {
  let config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return async (dispatch) => {
    axios
      .put(
        process.env.REACT_APP_URL_API + "admins/updateAdmin" + idLocatario,
        {
          email: email,
        },
        config
      )
      .then((response2) => {
        let data = response2.data;
        setMsg("El correo se actualizo");
        dispatch(
          LocatarioMensaje({
            ok: data.ok,
            msg: data.msg,
          })
        );
      })
      .catch((e) => {
        setMsg("No se actualizo la información");
        console.log("ERROR!!!!!", e);
      });
  };
};

export const getLocatarioCedula = (setLocatario, cedula) => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(
        process.env.REACT_APP_URL_API + "locatarios/findByCedula/" + cedula,
        config
      )
      .then((response) => {
        let data = response.data.locatarios[0];
        console.log(data);
        setLocatario(data);
        dispatch(LocatarioDato(response.data.ok));
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

export const getLocatarioId = (setLocatario, id) => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(process.env.REACT_APP_URL_API + "locatarios/find/" + id, config)
      .then((response) => {
        let data = response.data.locatario;
        setLocatario(data);
        dispatch(LocatarioDato(response.data.ok));
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

export const getLocatarioPlaza = (setLocatario, plaza) => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(
        process.env.REACT_APP_URL_API +
          "locatarios/locatariosPorPlaza/" +
          plaza,
        config
      )
      .then((response) => {
        let data = response.data.locatarios;
        let locatarios = data.map((item) => ({
          id: item.id,
          usuario: item.admin_id,
          nombre: item.nombre,
          apellido: item.apellido,
          fecha: item.updated_at === null ? item.created_at : item.updated_at,
          email: item.email,
          telefonos: item.telefonos,
          numero: item.numero_local,
          cedula: item.cedula,
          local: item.nombre_local,
          activo: item.activo ? "Activo" : "Inactivo",
        }));
        setLocatario(locatarios);
        dispatch(LocatarioDato(data.ok));
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

const LocatarioDato = (mensajes) => ({
  type: types.locatariosMensaje,
  payload: mensajes,
});

export const ArchivoLocatario = (archivo) => {
  return async (dispatch) => {
    if (archivo) {
      console.log(archivo);
      dispatch(
        LocatarioMensaje({
          ok: "prueba",
          msg: "prueba",
        })
      );
    }
  };
};

export const DeleteLocatario = (idLocatario) => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .put(
        process.env.REACT_APP_URL_API + "locatarios/delete/" + idLocatario,
        {
          activo: false,
        },
        config
      )
      .then((response) => {
        let data = response.data;
        dispatch(
          LocatarioMensaje({
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

export const UpdateLogo = (img, img2, idLocatario) => {
  return async () => {
    updateImg(
      img,
      `LOCATARIOS/logo/${idLocatario}`,
      `locatarios/update/${idLocatario}`,
      "logo"
    );
    var desertRef = firebase
      .app()
      .storage("gs://ipes-adeda.appspot.com")
      .ref(`/LOCATARIOS/logo/${idLocatario}/`)
      .child(`${img2}`);
    await desertRef
      .delete()
      .then((ref) => console.log("success =>", ref))
      .catch((error) => console.log(error));
  };
};

export const UpdateImagen = (img, img1, idLocatario) => {
  return async () => {
    updateImg(
      img,
      `LOCATARIOS/img/${idLocatario}`,
      `locatarios/update/${idLocatario}`,
      "img"
    );
    var desertRef = firebase
      .app()
      .storage("gs://ipes-adeda.appspot.com")
      .ref(`/LOCATARIOS/img/${idLocatario}/`)
      .child(`${img1}`);
    await desertRef
      .delete()
      .then((ref) => console.log("success =>", ref))
      .catch((error) => console.log(error));
  };
};

export const UpdateLocatarios = (
  horario_m1,
  cedula,
  local,
  numerolocal,
  nombre,
  email,
  telefonos,
  plaza,
  cat,
  productos,
  id,
  idLocatario
) => {
  return async (dispatch) => {
    let cate = [];
    cat.map((item) => {
      Array.prototype.push.apply(cate, [item.id]);
    });

    let tele = [];
    telefonos.map((item) => {
      Array.prototype.push.apply(tele, [item.telefono]);
    });

    console.log(telefonos);
    console.log(tele);
    let numero = [];
    numerolocal.map((item) => {
      Array.prototype.push.apply(numero, [item.local1]);
    });

    let producto = [];
    productos.map((item) => {
      Array.prototype.push.apply(producto, [item.id]);
    });

    let admin = [];
    admin.push(id);

    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    axios
      .put(
        process.env.REACT_APP_URL_API + "locatarios/update/" + idLocatario,
        {
          admin_id: admin,
          plaza_id: plaza,
          nombre_local: local,
          numero_local: numero,
          categorias_id: cate,
          productos_locatarios_id: producto,
          nombre: nombre,
          apellido: "",
          cedula: cedula,
          horarios: horario_m1,
          email: email,
          telefonos: tele,
        },
        config
      )
      .then((response) => {
        let data = response.data;
        dispatch(
          LocatarioMensaje({
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

export const setLocatariosExcel = (
  cedula,
  nombre,
  numero_local,
  local,
  telefonos,
  id,
  plaza
) => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    for (const i of numero_local) {
      axios
        .get(
          process.env.REACT_APP_URL_API +
            `locatarios/findByNumeroDeLocalYPlazaId/${i}/${plaza}`,
          config
        )
        .then((response) => {
          console.log(response);
          // SI EL LOCATARIO EXISTE, VERIFICA QUE ESTE EN EL ADMIN_LOCATARIO
          dispatch(
            getAdminsCedula(cedula, nombre, telefonos, "ADMIN_LOCATARIO")
          );
        })
        .catch(() => {
          axios
            .post(
              process.env.REACT_APP_URL_API + "locatarios/crear",
              {
                admin_id: [id],
                plaza_id: plaza,
                nombre_local: local,
                numero_local: numero_local,
                categorias_id: [],
                productos_locatarios_id: [],
                nombre: nombre,
                apellido: "",
                cedula: cedula,
                horarios: [],
                email: "",
                telefonos: telefonos,
              },
              config
            )
            .then((response) => {
              if (response.status === 200) {
                // SI EL LOCATARIO EXISTE, VERIFICA QUE ESTE EN EL ADMIN_LOCATARIO
                dispatch(
                  getAdminsCedula(cedula, nombre, telefonos, "ADMIN_LOCATARIO")
                );
              }
            })
            .catch((e) => {
              console.log("ERROR!!!!!", e);
            });
        });
    }
  };
};

export const setLocatarios = (
  horario_m1,
  img,
  img2,
  cedula,
  local,
  numerolocal,
  nombre,
  email,
  telefonos,
  plaza,
  cat,
  productos,
  id,
  setMsg
) => {
  return async (dispatch) => {
    let cate = [];
    cat.map((item) => {
      Array.prototype.push.apply(cate, [item.id]);
    });

    let tele = [];
    telefonos.map((item) => {
      Array.prototype.push.apply(tele, [item.telefono]);
    });

    let numero = [];
    numerolocal.map((item) => {
      Array.prototype.push.apply(numero, [item.local1]);
    });

    let producto = [];
    productos.map((item) => {
      Array.prototype.push.apply(producto, [item.id]);
    });

    let admin = [];
    admin.push(id);

    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    axios
      .post(
        process.env.REACT_APP_URL_API + "locatarios/crear",
        {
          admin_id: admin,
          plaza_id: plaza,
          nombre_local: local,
          numero_local: numero,
          categorias_id: cate,
          productos_locatarios_id: producto,
          nombre: nombre,
          apellido: "",
          cedula: cedula,
          horarios: horario_m1,
          email: email,
          telefonos: tele,
          img: img,
          logo: img2,
        },
        config
      )
      .then((response) => {
        setMsg(1);
        let data = response.data;
        if (email === "") {
          dispatch(
            getAdminsCedula(cedula, nombre, telefonos, "ADMIN_LOCATARIO")
          );
        } else {
          dispatch(
            getAdminsCedula(cedula, nombre, telefonos, "ADMIN_LOCATARIO", email)
          );
        }
        dispatch(
          LocatarioMensaje({
            ok: data.ok,
            msg: data.msg,
          })
        );
        if (response.status === 200) {
          console.log(response);
          let ids = data.locatario.id;
          if (img) {
            updateImg(img, `LOCATARIOS/img/${ids}`);
          }
          if (img2) {
            updateImg(img2, `LOCATARIOS/logo/${ids}`);
          }
        }
      })
      .catch((e) => {
        setMsg(2);
        console.log("ERROR!!!!!", e);
      });
  };
};

const LocatarioMensaje = (mensajes) => ({
  type: types.locatariosMensaje,
  payload: mensajes,
});
