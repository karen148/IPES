import axios from "axios";
import { types } from "./../types";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { updateImg } from "./imagen";

export const UpdateImagen1 = (img3, idProducto) => {
  return async (dispatch) => {
    updateImg(img3, `PRODUCTOS/imagen_1/${idProducto}`);
    const formData = new FormData();
    formData.append("imagen", img3);
    formData.append("producto", "imagen_1");
    console.log(img3);
    let config1 = {
      method: "put",
      url: process.env.REACT_APP_URL_API + "uploads/PRODUCTOS/" + idProducto,
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

export const UpdateImagen2 = (img5, idProducto) => {
  return async (dispatch) => {
    updateImg(img5, `PRODUCTOS/imagen_2/${idProducto}`);
    const formData = new FormData();
    formData.append("imagen", img5);
    formData.append("producto", "imagen_2");
    console.log(img5);
    let config1 = {
      method: "put",
      url: process.env.REACT_APP_URL_API + "uploads/PRODUCTOS/" + idProducto,
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

export const UpdateImagen = (img1, idProducto) => {
  return async (dispatch) => {
    updateImg(img1, `PRODUCTOS/imagen_principal/${idProducto}`);
    const formData = new FormData();
    formData.append("imagen", img1);
    formData.append("producto", "imagen_principal");
    console.log(img1);
    let config1 = {
      method: "put",
      url: process.env.REACT_APP_URL_API + "uploads/PRODUCTOS/" + idProducto,
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
        process.env.REACT_APP_URL_API + "productos/update/" + idProducto,
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

export const setProductosLocatario = (
  plaza,
  descripcion,
  sku,
  unidad,
  cantidad,
  existe,
  promocion,
  precio,
  rebaja,
  locatario
) => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .post(
        process.env.REACT_APP_URL_API + "productosLocatarios/crear",
        {
          producto_id: plaza.id,
          locatario_id: locatario,
          stock: existe,
          en_promocion: promocion,
          unidad: unidad,
          cantidad_unidad: cantidad,
          precio: precio,
          precio_rebajado: rebaja,
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

export const UpdateProductosLocatario = (
  plaza,
  descripcion,
  sku,
  unidad,
  cantidad,
  existe,
  promocion,
  precio,
  rebaja,
  locatario,
  id
) => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .put(
        process.env.REACT_APP_URL_API + `productosLocatarios/update/${id}`,
        {
          producto_id: plaza.id,
          locatario_id: locatario,
          stock: existe,
          en_promocion: promocion,
          unidad: unidad,
          cantidad_unidad: cantidad,
          precio: precio,
          precio_rebajado: rebaja,
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
            updateImg(img1, `PRODUCTOS/imagen_principal/${ids}`);
            const formData = new FormData();
            formData.append("imagen", img1);
            formData.append("producto", "imagen_principal");
            console.log(img1);
            let config1 = {
              method: "put",
              url: process.env.REACT_APP_URL_API + "uploads/PRODUCTOS/" + ids,
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
          if (img3) {
            updateImg(img3, `PRODUCTOS/imagen_1/${ids}`);
            const formData = new FormData();
            formData.append("imagen", img3);
            formData.append("producto", "imagen_1");
            console.log(img3);
            let config2 = {
              method: "put",
              url: process.env.REACT_APP_URL_API + "uploads/PRODUCTOS/" + ids,
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
          if (img5) {
            updateImg(img3, `PRODUCTOS/imagen_2/${ids}`);
            const formData = new FormData();
            formData.append("imagen", img5);
            formData.append("producto", "imagen_2");
            console.log(img5);
            let config2 = {
              method: "put",
              url: process.env.REACT_APP_URL_API + "uploads/PRODUCTOS/" + ids,
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
          fecha: item.updated_at === null ? item.created_at : item.updated_at,
          imagen_principal: item.imagen_principal,
          imagen_1: item.imagen_1,
          imagen_2: item.imagen_2,
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

export const getProductoLocatario = (producto) => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(
        process.env.REACT_APP_URL_API +
          `productosLocatarios/getByLocatarios/${producto}`,
        config
      )
      .then((response) => {
        console.log(response.data.productos);
        console.log(response);
        let data = response.data.productos;
        let productos = [];
        if (response.data.productos.length > 0) {
          data.map((item) => {
            productos.push({
              id: item.id,
              producto_id: item.producto_id,
              stock: item.stock ? "Sí hay" : "No hay",
              en_promocion: item.en_promocion ? "Sí" : "No",
              unidad: item.unidad,
              cantidad_unidad: item.cantidad_unidad,
              activo: item.activo ? "Activo" : "Inactivo",
              precio: item.precio,
              precio_rebajado: item.precio_rebajado,
              descripcion: item.descripcion,
              fecha:
                item.updated_at === null ? item.created_at : item.updated_at,
              sku: item.sku,
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
            });
          });
        }
        console.log(productos);
        dispatch(ProductosLocatarios(productos));
        dispatch(ProductoMensaje({ msg: "enviar" }));
      })
      .catch((e) => {
        dispatch(ProductoMensaje({ msg: "error" }));
        console.log("ERROR!!!!!", e);
      });
  };
};

export const DeleteProductoLoc = (idProducto) => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .put(
        process.env.REACT_APP_URL_API +
          "productosLocatarios/delete/" +
          idProducto,
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

export const DeleteProducto = (idProducto) => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .put(
        process.env.REACT_APP_URL_API + "productos/delete/" + idProducto,
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

const ProductosLocatarios = (productos) => ({
  type: types.productoLocatarios,
  producto: productos,
});

const Productos = (productos) => ({
  type: types.productoDatos,
  producto: productos,
});

const ProductoMensaje = (mensajes) => ({
  type: types.productoMensaje,
  payload: mensajes,
});
