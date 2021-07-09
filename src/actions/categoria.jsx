import axios from "axios";
import { types } from "./../types";
import Swal from "sweetalert2";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { updateImg } from "./imagen";
import firebase from "firebase";
import uniqid from "uniqid";

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

export const plazasCategorias = (idCategorias, producto, unidad, setMsg) => {
  return async () => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(
        process.env.REACT_APP_URL_API +
          `plazas/findPlazasByCategoriaId/${idCategorias}`,
        config
      )
      .then((response1) => {
        let data1 = response1.data.plazas;
        let idPlaza = [];
        data1.map((item) => {
          idPlaza.push(item.plazaId);
        });
        axios
          .post(
            process.env.REACT_APP_URL_API + "productos/findByNameAndUnit",
            {
              name: producto,
              unit: unidad.toLowerCase(),
            },
            config
          )
          .then(() => {
            setMsg("El producto ya existe");
          })
          .catch(() => {
            axios
              .post(
                process.env.REACT_APP_URL_API + "productos/crear",
                {
                  nombre: producto,
                  plazas_id: idPlaza,
                  unidad: unidad.toLowerCase(),
                  categorias_id: [idCategorias],
                  sku: uniqid(),
                },
                config
              )
              .then((response2) => {
                if (response2.status === 200) {
                  setMsg("Se creo el producto exitosamente");
                }
              })
              .catch(() => {
                setMsg("Error: No se creo el producto");
              });
          });
      })
      .catch(() => {
        setMsg("Error: No hay plazas");
      });
  };
};

export const verificarCategorias = (nombre, unidad, producto, setMsg) => {
  return async (dispatch) => {
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
        dispatch(plazasCategorias(data.id, producto, unidad, setMsg));
      })
      .catch(() => {
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
            let data1 = response3.data.categoria;
            dispatch(plazasCategorias(data1.id, producto, unidad, setMsg));
          })
          .catch((e) => {
            console.log("ERROR!!!!!", e);
            Swal.fire("Error", "Datos incorrectos", "error");
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
