import axios from "axios";
import { types } from "./../types";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { updateImg } from "./imagen";
import firebase from "firebase";
import uniqid from "uniqid";

export const UpdateImagen1 = (img3, img4, idProducto, setMsg, nombre) => {
  return async () => {
    updateImg(
      img3,
      `PRODUCTO/imagen_1/${idProducto}`,
      `productos/update/${idProducto}`,
      "imagen_1",
      setMsg,
      nombre
    );
    var desertRef = firebase
      .app()
      .storage("gs://ipes-adeda.appspot.com")
      .ref(`/PRODUCTO/imagen_1/${idProducto}/`)
      .child(`${img4}`);
    await desertRef
      .delete()
      .then((ref) => console.log("success =>", ref))
      .catch((error) => console.log(error));
  };
};

export const UpdateImagen2 = (img5, img6, idProducto, setMsg, nombre) => {
  return async () => {
    updateImg(
      img5,
      `PRODUCTO/imagen_2/${idProducto}`,
      `productos/update/${idProducto}`,
      "imagen_2",
      setMsg,
      nombre
    );
    var desertRef = firebase
      .app()
      .storage("gs://ipes-adeda.appspot.com")
      .ref(`/PRODUCTO/imagen_2/${idProducto}/`)
      .child(`${img6}`);
    await desertRef
      .delete()
      .then((ref) => console.log("success =>", ref))
      .catch((error) => console.log(error));
  };
};

export const UpdateImagen = (img1, img2, idProducto, setMsg, nombre) => {
  return async () => {
    if (img1) {
      updateImg(
        img1,
        `PRODUCTO/imagen_principal/${idProducto}`,
        `productos/update/${idProducto}`,
        "imagen_principal",
        setMsg,
        nombre
      );
      var desertRef = firebase
        .app()
        .storage("gs://ipes-adeda.appspot.com")
        .ref(`/PRODUCTO/imagen_principal/${idProducto}/`)
        .child(`${img2}`);
      await desertRef
        .delete()
        .then((ref) => console.log("success =>", ref))
        .catch((error) => console.log(error));
    }
  };
};

export const UpdateProductos = (
  plaza,
  nombre,
  sku,
  cat,
  unidad,
  idProducto
) => {
  return async (dispatch) => {
    let cate = [];
    console.log(sku);
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
          unidad: unidad,
          sku: uniqid(),
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
  cantidad,
  existe,
  promocion,
  precio,
  rebaja,
  locatario,
  setMsg
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
        setMsg(1);
        let data = response.data;
        dispatch(
          ProductoMensaje({
            ok: data.ok,
            msg: data.msg,
          })
        );
      })
      .catch((e) => {
        setMsg(2);
        console.log("ERROR!!!!!", e);
      });
  };
};

export const UpdateProductosLocatario = (
  plaza,
  descripcion,
  sku,
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
  unidad,
  sku,
  img1,
  img3,
  img5,
  cat,
  setMsg
) => {
  return async (dispatch) => {
    console.log(sku);
    let cate = [];
    cat.map((item) => {
      Array.prototype.push.apply(cate, [item.id]);
    });
    console.log(cat);
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
          unidad: unidad,
          sku: uniqid(),
        },
        config
      )
      .then((response) => {
        console.log(response);
        let data = response.data;
        setMsg({
          tipo: "success",
          msg: "El producto se creo exitosamente",
        });
        dispatch(
          ProductoMensaje({
            ok: data.ok,
            msg: data.msg,
          })
        );
        if (response.status === 200) {
          console.log(response);
          let ids = data.producto.id;
          let nombre = data.producto.nombre;
          if (img1) {
            updateImg(
              img1,
              `PRODUCTO/imagen_principal/${ids}`,
              `productos/update/${ids}`,
              "imagen_principal",
              setMsg,
              nombre
            );
          }
          if (img3) {
            updateImg(
              img3,
              `PRODUCTO/imagen_1/${ids}`,
              `productos/update/${ids}`,
              "imagen_1",
              setMsg,
              nombre
            );
          }
          if (img5) {
            updateImg(
              img5,
              `PRODUCTO/imagen_2/${ids}`,
              `productos/update/${ids}`,
              "imagen_2",
              setMsg,
              nombre
            );
          }
        }
      })
      .catch((e) => {
        setMsg(2);
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
          unidad: item.unidad,
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
        // console.log(
        //   productos.sort((a, b) => {
        //     var x = a["nombre"];
        //     var y = b["nombre"];
        //     return x < y ? -1 : x > y ? 1 : 0;
        //   })
        // );
        dispatch(
          Productos(
            productos.sort((a, b) => {
              var x = a["nombre"];
              var y = b["nombre"];
              return x < y ? -1 : x > y ? 1 : 0;
            })
          )
        );
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
              nombre: item.nombre,
              producto_id: item.producto_id,
              stock: item.stock ? "Sí hay" : "No hay",
              en_promocion: item.en_promocion ? "Sí" : "No",
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
        dispatch(
          ProductosLocatarios(
            productos.sort((a, b) => {
              var x = a["nombre"];
              var y = b["nombre"];
              return x < y ? -1 : x > y ? 1 : 0;
            })
          )
        );
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
