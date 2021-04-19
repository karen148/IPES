import axios from "axios";
import { types } from "./../types";
import Swal from "sweetalert2";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

export const setCategorias = (nombre, slug, descripcion, img) => {
  return async () => {
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
        if (response.status === 200) {
          let id = response.data.categoria.id;
          const formData = new FormData();
          formData.append("imagen", img);
          console.log(img);
          let config1 = {
            method: "put",
            url: process.env.REACT_APP_URL_API + "uploads/CATEGORIA/" + id,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            data: formData,
          };
          axios(config1)
            .then((response) => {
              if (response.status) {
                let data = true;
                return data;
              }
            })
            .catch((e) => {
              console.log("ERROR", e);
            });
        }
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
        Swal.fire("Error", "Datos incorrectos", "error");
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
          nombre: item.nombre,
          descripcion: item.descripcion,
          slug: item.slug,
          fecha: item.updated_at === null ? item.created_at : item.updated_at,
          icono: item.icono,
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
  let config1 = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  axios
    .put(
      process.env.REACT_APP_URL_API + "locatarios/delete/" + idp2,
      {
        activo: false,
      },
      config1
    )
    .then((response) => {
      if (response.status) {
        console.log("ENVIADO");
      }
    })
    .catch((e) => {
      console.log("ERROR", e);
    });
};

export const UpdateCategoria = (nombre, slug, descripcion, idp2) => {
  return async () => {
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
        console.log(response.data);
        if (response.status === 200) {
          Swal.fire("Enviado", "Se actualizo la información", "success");
        }
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
        Swal.fire("Error", "Datos incorrectos", "error");
      });
  };
};

export const setImagen = (img, idp2) => {
  return async () => {
    const formData = new FormData();
    formData.append("imagen", img);
    console.log(img);
    let config1 = {
      method: "put",
      url: process.env.REACT_APP_URL_API + "uploads/CATEGORIA/" + idp2,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      data: formData,
    };
    axios(config1)
      .then((response) => {
        if (response.status) {
          Swal.fire("Enviado", "Se actualizo el icono", "success");
        }
      })
      .catch((e) => {
        console.log("ERROR", e);
        Swal.fire("Error", "No se envió la información", "error");
      });
  };
};
