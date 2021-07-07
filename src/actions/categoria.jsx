import axios from "axios";
import { types } from "./../types";
import Swal from "sweetalert2";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { updateImg } from "./imagen";
import firebase from "firebase";

export const setCategorias = (nombre, slug, descripcion, img) => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .post(
        process.env.REACT_APP_URL_API + "categorias/crear",
        {
          nombre: nombre,
          slug: slug,
          descripcion: descripcion,
        },
        config
      )
      .then((response) => {
        console.log(response.data);
        let data = response.data;
        dispatch(
          categoriasMensaje({
            ok: data.ok,
            msg: data.msg,
          })
        );
        if (response.status === 200) {
          let id = response.data.categoria.id;
          updateImg(
            img,
            `CATEGORIAS/${id}`,
            `categorias/update/${id}`,
            "icono"
          );
        }
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
        Swal.fire("Error", "Datos incorrectos", "error");
      });
  };
};

export const verificarCategorias = (
  nombre,
  unidad,
  producto,
  plaza,
  setMsg
) => {
  return async () => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(
        process.env.REACT_APP_URL_API + `categorias/findByName/${nombre}`,
        config
      )
      .then((response) => {
        let data = response.data.categoria;
        console.log(response);
        axios
          .post(
            process.env.REACT_APP_URL_API + "productos/findByNameAndUnit",
            {
              name: producto,
              unit: unidad,
            },
            config
          )
          .then((response1) => {
            console.log(response1);
            setMsg(1);
          })
          .catch(() => {
            axios
              .post(
                process.env.REACT_APP_URL_API + "productos/crear",
                {
                  nombre: producto,
                  plazas_id: plaza,
                  unidad: unidad,
                  categorias_id: [data.id],
                },
                config
              )
              .then((response2) => {
                console.log(response2.data);
                setMsg(2);
              })
              .catch(() => {
                setMsg(3);
              });
          })
          .catch(() => {
            setMsg(2);
            axios
              .post(
                process.env.REACT_APP_URL_API + "categorias/crear",
                {
                  nombre: nombre,
                },
                config
              )
              .then((response3) => {
                console.log(response3.data);
                let data = response3.data.categoria;
                axios
                  .post(
                    process.env.REACT_APP_URL_API +
                      "productos/findByNameAndUnit",
                    {
                      name: producto,
                      unit: unidad,
                    },
                    config
                  )
                  .then((response4) => {
                    console.log(response4);
                    setMsg(1);
                  })
                  .catch(() => {
                    axios
                      .post(
                        process.env.REACT_APP_URL_API + "productos/crear",
                        {
                          nombre: producto,
                          plazas_id: plaza,
                          unidad: unidad,
                          categorias_id: [data.id],
                        },
                        config
                      )
                      .then((response5) => {
                        console.log(response5.data);
                        setMsg(2);
                      })
                      .catch((e) => {
                        setMsg(3);
                        console.log("ERROR!!!!!", e);
                      });
                  });
              })
              .catch((e) => {
                console.log("ERROR!!!!!", e);
                Swal.fire("Error", "Datos incorrectos", "error");
              });
          });
      });
  };
};

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
          id: item.id,
          nombre: item.nombre.toUpperCase(),
          descripcion: item.descripcion,
          slug: item.slug,
          fecha: item.updated_at === null ? item.created_at : item.updated_at,
          icono: item.icono,
          activo: item.activo,
          acciones: [
            {
              name: "Editar",
              icon: <EditIcon />,
              id: item.id,
            },
            {
              name: "Eliminar",
              icon: <DeleteIcon />,
              id: item.id,
            },
          ],
        }));
        dispatch(categoriasDatos(categorias));
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

const categoriasDatos = (categorias) => ({
  type: types.categoriaDatos,
  categoria: categorias,
});

export const DeleteCategoria = (idp2) => {
  return async (dispatch) => {
    let config1 = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .put(
        process.env.REACT_APP_URL_API + "categorias/delete/" + idp2,
        {
          activo: false,
        },
        config1
      )
      .then((response) => {
        let data = response.data;
        dispatch(
          categoriasMensaje({
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

export const UpdateCategoria = (nombre, slug, descripcion, idp2) => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .put(
        process.env.REACT_APP_URL_API + `categorias/update/${idp2}`,
        {
          nombre: nombre,
          slug: slug,
          descripcion: descripcion,
        },
        config
      )
      .then((response) => {
        console.log(response);
        let data = response.data;
        dispatch(
          categoriasMensaje({
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

export const setImagen = (img, img2, idp2) => {
  return async () => {
    updateImg(img, `CATEGORIAS/${idp2}`, `categorias/update/${idp2}`, "icono");
    var desertRef = firebase
      .app()
      .storage("gs://ipes-adeda.appspot.com")
      .ref(`CATEGORIAS/${idp2}`)
      .child(`${img2}`);
    await desertRef
      .delete()
      .then((ref) => console.log("success =>", ref))
      .catch((error) => console.log(error));
  };
};

const categoriasMensaje = (mensajes) => ({
  type: types.categoriaMensaje,
  payload: mensajes,
});
