import axios from "axios";
import { types } from "./../types";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import { updateImg } from "./imagen";

export const setPlazasExcel = (nombre) => {
  let config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return async (dispatch) => {
    axios
      .post(
        process.env.REACT_APP_URL_API + "plazas/crear",
        {
          admin_id: [],
          localidad_id: "",
          nombre: nombre,
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

export const UpdateLogo = (img2, ids) => {
  updateImg(img2, `PLAZA/logo/${ids}`);
  return async (dispatch) => {
    const formData = new FormData();
    formData.append("imagen", img2);
    formData.append("plaza", "logo");
    let config1 = {
      method: "put",
      url: process.env.REACT_APP_URL_API + "uploads/PLAZA/" + ids,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: formData,
    };
    axios(config1)
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
        console.log("ERROR", e);
      });
  };
};

export const UpdateBanner = (img, ids) => {
  return async (dispatch) => {
    updateImg(img, `PLAZA/img/${ids}`);
    const formData = new FormData();
    formData.append("imagen", img);
    formData.append("plaza", "img");
    let config1 = {
      method: "put",
      url: process.env.REACT_APP_URL_API + "uploads/PLAZA/" + ids,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: formData,
    };
    axios(config1)
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
        console.log("ERROR", e);
      });
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
          let ids = data.plaza.id;
          if (img) {
            updateImg(img, `PLAZA/img/${ids}`);
            const formData = new FormData();
            formData.append("imagen", img);
            formData.append("plaza", "img");

            let config1 = {
              method: "put",
              url: process.env.REACT_APP_URL_API + "uploads/PLAZA/" + ids,
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              data: formData,
            };
            axios(config1)
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
                console.log("ERROR", e);
              });
          }
          if (img2) {
            const formData = new FormData();
            updateImg(img2, `PLAZA/logo/${ids}`);
            formData.append("imagen", img2);
            formData.append("plaza", "logo");

            let config2 = {
              method: "put",
              url: process.env.REACT_APP_URL_API + "uploads/PLAZA/" + ids,
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              data: formData,
            };
            axios(config2)
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
                console.log("ERROR", e);
              });
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
        data.map((item) => {
          if (item.activo === true) {
            plazatrues.push(item);
          }
        });
        dispatch(PlazaTrue(plazatrues));
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
