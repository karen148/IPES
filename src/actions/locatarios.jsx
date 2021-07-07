import axios from "axios";
import { types } from "./../types";
import { updateImg } from "./imagen";
import firebase from "firebase";

export const getLocatariosCedulaPlaza = (plaza, numerolocal, setMsg) => {
  return async () => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      plazaId: plaza,
      numeroLocal: numerolocal,
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
          local:
            item.nombre_local === null
              ? "El local no tiene nombre"
              : item.nombre_local,
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
      // let reader = new FileReader();
      // let hojas = [];
      // reader.readAsArrayBuffer(archivo);
      // reader.onloadend = () => {
      //   var data = new Uint8Array(archivo);
      //   var work = xlsx.read(data, { type: "array" });
      //   work.SheetNames.forEach(function (sheetName) {
      //     var row = xlsx.utils.sheet_to_row_object_array(
      //       work.Sheets[sheetName]
      //     );
      //     hojas.push({
      //       data: row,
      //       plaza: sheetName,
      //     });
      //   });
      //   console.log(hojas);
      // };
      // const storageRef = firebase
      //   .storage()
      //   .ref(`LOCATARIOS/PLAZA/${archivo.name}`);
      // const task = storageRef.put(archivo);
      // task.on(
      //   "state_changed",
      //   () => {
      //     console.log("Exito");
      //   },
      //   (error) => {
      //     console.log(error.message);
      //   }
      // );
    }
    // const formData = new FormData();
    // formData.append("archivo", archivo);
    // console.log(archivo);
    // let config = {
    //   method: "post",
    //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    //   url: process.env.REACT_APP_URL_API + "locatarios/subirCSV",
    //   data: formData,
    // };
    // axios(config)
    //   .then((response) => {
    //     console.log(response);
    //     let data = response.data;
    //     dispatch(
    //       LocatarioMensaje({
    //         ok: data.ok,
    //         msg: data.msg,
    //       })
    //     );
    //   })
    //   .catch((e) => {
    //     console.log("ERROR!!!!!", e);
    //   });
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
  horario_m2,
  horario_lm1,
  horario_lm2,
  horario_mm1,
  horario_mm2,
  horario_jm1,
  horario_jm2,
  horario_vm1,
  horario_vm2,
  horario_sm1,
  horario_sm2,
  horario_dm1,
  horario_dm2,
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
    let horario = [];
    horario.push(
      horario_m1 + "-" + horario_m2,
      horario_lm1 + "-" + horario_lm2,
      horario_mm1 + "-" + horario_mm2,
      horario_jm1 + "-" + horario_jm2,
      horario_vm1 + "-" + horario_vm2,
      horario_sm1 + "-" + horario_sm2,
      horario_dm1 + "-" + horario_dm2
    );

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
          horarios: horario,
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
  return async () => {
    let admin = [];
    let local1 = [];
    admin.push(id);

    if (numero_local.length === 1) {
      local1.push(numero_local);
    }

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
          numero_local: numero_local.length === 1 ? local1 : numero_local,
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
          axios
            .get(
              process.env.REACT_APP_URL_API + "admins/findByCedula/" + cedula,
              config
            )
            .then((response) => {
              console.log(response);
            })
            .catch((e) => {
              /**
               * Sí, canta error significa que no es admin locatario
               * en la base de datos, por lo tanto registramos lo datos
               * para que pueda ingresar al modulo locatario.
               *
               */
              console.log("ERROR!!!!!", e);
              let config = {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              };
              axios
                .post(
                  process.env.REACT_APP_URL_API + "admins/registerAdmin",
                  {
                    email: cedula,
                    password: "123456",
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
        }
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

export const setLocatarios = (
  horario_m1,
  horario_m2,
  horario_lm1,
  horario_lm2,
  horario_mm1,
  horario_mm2,
  horario_jm1,
  horario_jm2,
  horario_vm1,
  horario_vm2,
  horario_sm1,
  horario_sm2,
  horario_dm1,
  horario_dm2,
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
    let horario = [];
    horario.push(
      horario_m1 + "-" + horario_m2,
      horario_lm1 + "-" + horario_lm2,
      horario_mm1 + "-" + horario_mm2,
      horario_jm1 + "-" + horario_jm2,
      horario_vm1 + "-" + horario_vm2,
      horario_sm1 + "-" + horario_sm2,
      horario_dm1 + "-" + horario_dm2
    );

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
          horarios: horario,
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
