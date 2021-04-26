import axios from "axios";
import { types } from "./../types";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

export const UpdateGaleria = (img3, img5, idProducto) => {
  return async (dispatch) => {
    if (img3 && img5) {
      const formData = new FormData();
      formData.append("imagen1", img3);
      formData.append("imagen2", img5);
      formData.append("producto", "galeria");
      console.log(img3);
      let config1 = {
        method: "put",
        url: process.env.REACT_APP_URL_API + "uploads/PRODUCTO/" + idProducto,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: formData,
      };
      axios(config1)
        .then((response) => {
          console.log(response);
          let data = response.data;
          dispatch(
            ProductoMensaje({
              ok: data.ok,
              msg: data.msg,
            })
          );
        })
        .catch((e) => {
          console.log("ERROR", e);
        });
    } else if (img3) {
      const formData = new FormData();
      formData.append("imagen1", img3);
      formData.append("producto", "galeria");
      console.log(img3);
      let config1 = {
        method: "put",
        url: process.env.REACT_APP_URL_API + "uploads/PRODUCTO/" + idProducto,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: formData,
      };
      axios(config1)
        .then((response) => {
          console.log(response);
          let data = response.data;
          dispatch(
            ProductoMensaje({
              ok: data.ok,
              msg: data.msg,
            })
          );
        })
        .catch((e) => {
          console.log("ERROR", e);
        });
    } else {
      const formData = new FormData();
      formData.append("imagen1", img5);
      formData.append("producto", "galeria");
      console.log(img3);
      let config1 = {
        method: "put",
        url: process.env.REACT_APP_URL_API + "uploads/PRODUCTO/" + idProducto,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: formData,
      };
      axios(config1)
        .then((response) => {
          console.log(response);
          let data = response.data;
          dispatch(
            ProductoMensaje({
              ok: data.ok,
              msg: data.msg,
            })
          );
        })
        .catch((e) => {
          console.log("ERROR", e);
        });
    }
  };
};

export const UpdateImagen = (img1, idProducto) => {
  return async (dispatch) => {
    const formData = new FormData();
    formData.append("imagen", img1);
    formData.append("producto", "img");
    console.log(img1);
    let config1 = {
      method: "put",
      url: process.env.REACT_APP_URL_API + "uploads/PRODUCTO/" + idProducto,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: formData,
    };
    axios(config1)
      .then((response) => {
        console.log(response);
        let data = response.data;
        dispatch(
          ProductoMensaje({
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

export const UpdateProductos = (
  plaza,
  nombre,
  descripcion,
  sku,
  cat,
  idProducto
) => {
  return async (dispatch) => {
    let cate = [];
    cat.map((item) => {
      Array.prototype.push.apply(cate, [item.id]);
    });
    let plazas = [];
    plaza.map((item) => {
      Array.prototype.push.apply(plazas, [item.id]);
    });
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    axios
      .put(
        process.env.REACT_APP_URL_API + "productos/update" + idProducto,
        {
          nombre: nombre,
          categorias_id: cate,
          plazas_id: plazas,
          descripcion: descripcion,
          sku: sku,
        },
        config
      )
      .then((response) => {
        console.log(response);
        let data = response.data;
        dispatch(
          ProductoMensaje({
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

export const setProductos = (
  plaza,
  nombre,
  descripcion,
  sku,
  img1,
  img3,
  img5,
  cat
) => {
  return async (dispatch) => {
    let cate = [];
    cat.map((item) => {
      Array.prototype.push.apply(cate, [item.id]);
    });
    let plazas = [];
    plaza.map((item) => {
      Array.prototype.push.apply(plazas, [item.id]);
    });
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    axios
      .post(
        process.env.REACT_APP_URL_API + "productos/crear",
        {
          nombre: nombre,
          categorias_id: cate,
          plazas_id: plazas,
          descripcion: descripcion,
          sku: sku,
        },
        config
      )
      .then((response) => {
        console.log(response);
        let data = response.data;
        dispatch(
          ProductoMensaje({
            ok: data.ok,
            msg: data.msg,
          })
        );
        if (response.status === 200) {
          console.log(response);
          let ids = data.producto.id;
          if (img1) {
            const formData = new FormData();
            formData.append("imagen", img1);
            formData.append("producto", "img");
            console.log(img1);
            let config1 = {
              method: "put",
              url: process.env.REACT_APP_URL_API + "uploads/PRODUCTO/" + ids,
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              data: formData,
            };
            axios(config1)
              .then((response) => {
                console.log(response);
                let data = response.data;
                dispatch(
                  ProductoMensaje({
                    ok: data.ok,
                    msg: data.msg,
                  })
                );
              })
              .catch((e) => {
                console.log("ERROR", e);
              });
          }
          if (img3 || img5) {
            const formData = new FormData();
            formData.append("imagen1", img3);
            formData.append("imagen2", img5);
            formData.append("producto", "galeria");
            console.log(img3);
            let config2 = {
              method: "put",
              url: process.env.REACT_APP_URL_API + "uploads/PRODUCTO/" + ids,
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              data: formData,
            };
            axios(config2)
              .then((response) => {
                console.log(response);
                let data = response.data;
                dispatch(
                  ProductoMensaje({
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

export const getProducto = () => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(process.env.REACT_APP_URL_API + "productos/getAll", config)
      .then((response) => {
        console.log(response.data.productos);
        let data = response.data.productos;
        let productos = data.map((item) => ({
          id: item.id,
          nombre: item.nombre,
          categorias: item.categorias_id,
          plaza: item.plazas_id,
          descripcion: item.descripcion,
          sku: item.sku,
          activo: item.activo ? "Activo" : "Inactivo",
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
        console.log(productos);
        dispatch(Productos(productos));
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

export const DeleteProducto = (idProducto) => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .put(
        process.env.REACT_APP_URL_API + "productos/delete" + idProducto,
        {
          activo: false,
        },
        config
      )
      .then((response) => {
        let data = response.data;
        dispatch(
          ProductoMensaje({
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

const Productos = (productos) => ({
  type: types.productoDatos,
  producto: productos,
});

const ProductoMensaje = (mensajes) => ({
  type: types.productoMensaje,
  payload: mensajes,
});
