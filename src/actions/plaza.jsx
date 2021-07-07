import axios from "axios";
import { types } from "./../types";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import { updateImg } from "./imagen";
import firebase from "firebase";

export const setPlazasExcel = (
  nombrepla,
  numerolocal,
  cedula,
  nombre,
  telefonos,
  admin,
  local,
  setMsg
) => {
  let config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return async () => {
    let local1 = [];
    if (numerolocal.length === 1) {
      local1.push(numerolocal);
    }
    axios
      .post(
        process.env.REACT_APP_URL_API + "plazas/crear",
        {
          admin_id: [admin],
          localidad_id: "",
          nombre: nombrepla,
          categorias_id: [],
          productos_id: [],
          direccion: "",
          telefonos: [],
          email: "",
          horarios: [],
        },
        config
      )
      .then((response) => {
        let id = response.data.plaza.id;
        // VERIFICAR LA EXISTENCIA DEL LOCATARIO
        axios
          .get(
            process.env.REACT_APP_URL_API +
              `locatarios/findByNumeroDeLocalYPlazaId/${id}/${numerolocal}`,
            config
          )
          .then((response) => {
            console.log(response);
            // SI EL LOCATARIO EXISTE, VERIFICA QUE ESTE EN EL ADMIN_LOCATARIO
            axios
              .get(
                process.env.REACT_APP_URL_API + "admins/findByCedula/" + cedula,
                config
              )
              .then((response) => {
                if (response.status === 200) {
                  console.log("existe en admin");
                }
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
          })
          .catch((e) => {
            console.log(e);
            setMsg("No existe");
            axios
              .post(
                process.env.REACT_APP_URL_API + "locatarios/crear",
                {
                  admin_id: [admin],
                  plaza_id: id,
                  nombre_local: local,
                  numero_local: numerolocal.length === 1 ? local1 : numerolocal,
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
                      process.env.REACT_APP_URL_API +
                        "admins/findByCedula/" +
                        cedula,
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
                          Authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
                        },
                      };
                      axios
                        .post(
                          process.env.REACT_APP_URL_API +
                            "admins/registerAdmin",
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
          });
      })
      .catch((e) => {
        setMsg("No creo la plaza");
        console.log("ERROR!!!!!", e);
      });
  };
};

export const UpdateLogo = (img2, img3, ids) => {
  return async () => {
    updateImg(img2, `PLAZA/logo/${ids}`, `plazas/update/${ids}`, "logo");
    var desertRef = firebase
      .app()
      .storage("gs://ipes-adeda.appspot.com")
      .ref(`/PLAZA/logo/${ids}`)
      .child(`${img3}`);
    await desertRef
      .delete()
      .then((ref) => console.log("success =>", ref))
      .catch((error) => console.log(error));
  };
};

export const UpdateBanner = (img, img1, ids) => {
  return async () => {
    updateImg(img, `PLAZA/img/${ids}`, `plazas/update/${ids}`, "img");
    var desertRef = firebase
      .app()
      .storage("gs://ipes-adeda.appspot.com")
      .ref(`/PLAZA/img/${ids}`)
      .child(`${img1}`);
    await desertRef
      .delete()
      .then((ref) => console.log("success =>", ref))
      .catch((error) => console.log(error));
  };
};

export const UpdatePlazasMercado = (
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
  telefonos,
  cat,
  funcionario,
  localidad,
  plaza,
  email,
  direccion,
  idPlaza
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
    let tele = [];
    telefonos.map((item) => {
      Array.prototype.push.apply(tele, [item.telefono]);
    });
    let cate = [];
    cat.map((item) => {
      Array.prototype.push.apply(cate, [item.id]);
    });
    let funcio = [];
    funcionario.map((item) => {
      Array.prototype.push.apply(funcio, [item.id]);
    });
    console.log(funcionario);
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    axios
      .put(
        process.env.REACT_APP_URL_API + "plazas/update/" + idPlaza,
        {
          admin_id: funcio,
          localidad_id: localidad.id,
          nombre: plaza,
          categorias_id: cate,
          productos_id: [],
          direccion: direccion,
          telefonos: tele,
          email: email,
          horarios: horario,
        },
        config
      )
      .then((response) => {
        let data = response.data;
        dispatch(
          PlazaMensaje({
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

export const setPlazasMercado = (
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
  telefonos,
  cat,
  funcionario,
  localidad,
  plaza,
  email,
  direccion,
  img,
  img2
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
    let tele = [];
    telefonos.map((item) => {
      Array.prototype.push.apply(tele, [item.telefono]);
    });
    let cate = [];
    cat.map((item) => {
      Array.prototype.push.apply(cate, [item.id]);
    });
    let funcio = [];
    funcionario.map((item) => {
      Array.prototype.push.apply(funcio, [item.id]);
    });
    console.log(funcionario);
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    axios
      .post(
        process.env.REACT_APP_URL_API + "plazas/crear",
        {
          admin_id: funcio,
          localidad_id: localidad.id,
          nombre: plaza,
          categorias_id: cate,
          productos_id: [],
          direccion: direccion,
          telefonos: tele,
          email: email,
          horarios: horario,
        },
        config
      )
      .then((response) => {
        let data = response.data;
        dispatch(
          PlazaMensaje({
            ok: data.ok,
            msg: data.msg,
          })
        );
        if (response.status === 200) {
          console.log(response);
          let ids = data.plaza.id;
          if (img) {
            updateImg(img, `PLAZA/img/${ids}`);
          }
          if (img2) {
            updateImg(img2, `PLAZA/logo/${ids}`);
          }
        }
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

const PlazaMensaje = (mensajes) => ({
  type: types.plazaMensaje,
  payload: mensajes,
});

export const getTrue = () => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(process.env.REACT_APP_URL_API + "plazas/getAll", config)
      .then((response) => {
        let data = response.data.plazas;
        let plazatrues = [];
        let dataid = [];
        data.map((item) => {
          if (item.activo === true) {
            plazatrues.push(item);
            dataid.push(item.id);
          }
        });
        dispatch(PlazaTrue(plazatrues));
        dispatch(PlazaID(dataid));
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

const PlazaTrue = (plazatrues) => ({
  type: types.plazaDatosTrue,
  plazatrue: plazatrues,
});

const PlazaID = (dataid) => ({
  type: types.plazaID,
  plazaid: dataid,
});

export const getPlaz = () => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(process.env.REACT_APP_URL_API + "plazas/getAll", config)
      .then((response) => {
        let data = response.data.plazas;
        let plazas = data.map((item) => ({
          id: item.id,
          usuario: item.admin_id,
          localidad: item.localidad_nombre,
          nombre: item.nombre,
          direccion: item.direccion,
          telefonos: item.telefonos,
          email: item.email,
          locatarios: 0,
          categorias: item.categorias_nombres,
          horarios: item.horarios,
          activo: item.activo,
          img: item.img,
          logo: item.logo,
          fecha: item.updated_at === null ? item.created_at : item.updated_at,
          acciones: [
            {
              name: "Agregar lista de plazas",
              icon: <PlaylistAddIcon />,
              id: item.id,
            },
          ],
        }));
        dispatch(PlazaDatos(plazas));
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

const PlazaDatos = (plazas) => ({
  type: types.plazaDatos,
  plaza: plazas,
});

export const getFuncionarios = () => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(process.env.REACT_APP_URL_API + "admins/getAll", config)
      .then((response) => {
        let data = response.data.admins;
        const funcionarios = data.map((item) => ({
          label: item.nombre + " " + item.apellido,
          id: item.id,
        }));
        dispatch(PlazaFuncionarios(funcionarios));
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

const PlazaFuncionarios = (funcionarios) => ({
  type: types.plazaFuncionario,
  funcionario: funcionarios,
});

export const getCategorias = () => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(process.env.REACT_APP_URL_API + "categorias/getAll", config)
      .then((response) => {
        let data = response.data.categorias;
        const categorias = data.map((item) => ({
          label: item.nombre.toUpperCase(),
          id: item.id,
          icono: item.icono,
        }));
        dispatch(PlazaCategorias(categorias));
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

const PlazaCategorias = (categorias) => ({
  type: types.plazaCategorias,
  categoria: categorias,
});

export const getLocalidades = () => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(process.env.REACT_APP_URL_API + "localidades/getAll", config)
      .then((response) => {
        let data = response.data.localidades;
        const localidades = data.map((item) => ({
          label: item.nombre,
          id: item.id,
        }));
        dispatch(PlazaLocalidades(localidades));
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

const PlazaLocalidades = (localidades) => ({
  type: types.plazaLocalidades,
  localidad: localidades,
});

export const getCantidades = () => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(
        process.env.REACT_APP_URL_API + "locatarios/totalLocatarioPorPlaza",
        config
      )
      .then((response) => {
        let data = response.data.cantidadLocales;
        const cantidades = data.map((item) => ({
          total: item.total,
          id: item.plaza_id,
        }));
        dispatch(PlazaCantidades(cantidades));
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

const PlazaCantidades = (cantidades) => ({
  type: types.plazaCantidad,
  cantidad: cantidades,
});
