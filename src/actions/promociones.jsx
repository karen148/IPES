import axios from "axios";
import { types } from "./../types";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import { updateImg } from "./imagen";
import firebase from "firebase";

export const getPromocion = () => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(process.env.REACT_APP_URL_API + "promociones/getAll", config)
      .then((response) => {
        console.log(response.data.promociones);
        let data = response.data.promociones;
        let promocion = data.map((item) => ({
          id: item.id,
          producto_id: item.producto_id,
          plaza: item.plazas_id,
          categorias_id: item.categorias_id,
          imagen: item.imagen,
          activo: item.activo ? "Activo" : "Inactivo",
          fecha: item.updated_at === null ? item.created_at : item.updated_at,
          acciones: [
            {
              name: "Editar",
              icon: <EditIcon />,
              id: item.id,
            },
            {
              name: "Activar",
              icon: <CheckIcon />,
              id: item.id,
            },
            {
              name: "Desactivar",
              icon: <CloseIcon />,
              id: item.id,
            },
          ],
        }));
        dispatch(PromocionDatos(promocion));
        console.log(promocion);
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

export const getPromocionID = (idp, setPromocion) => {
  return async () => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(
        process.env.REACT_APP_URL_API + "promociones/findById/" + idp,
        config
      )
      .then((response) => {
        let data = response.data.promocion;
        setPromocion(data);
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

export const setPromocion = (plaza, producto, categoria, img, setMsg) => {
  return async () => {
    let cate = [];
    let pro = [];
    let pla = [];
    categoria.map((item) => {
      Array.prototype.push.apply(cate, [item.id]);
    });
    producto.map((item) => {
      Array.prototype.push.apply(pro, [item.id]);
    });
    plaza.map((item) => {
      Array.prototype.push.apply(pla, [item.id]);
    });

    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    axios
      .post(
        process.env.REACT_APP_URL_API + "promociones/crear",
        {
          producto_id: pro,
          plazas_id: pla,
          categorias_id: cate,
        },
        config
      )
      .then((response) => {
        setMsg(1);

        if (response.status === 200) {
          console.log(response);
          let ids = response.data.promocion.id;
          if (img) {
            updateImg(
              img,
              `PROMOCIONES/img/${ids}`,
              `promociones/update/${ids}`,
              "imagen",
              setMsg
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

export const UpdatePromocion = (idp, plaza, producto, categoria, setMsg) => {
  return async () => {
    let cate = [];
    let pro = [];
    let pla = [];
    categoria.map((item) => {
      Array.prototype.push.apply(cate, [item.id]);
    });
    producto.map((item) => {
      Array.prototype.push.apply(pro, [item.id]);
    });
    plaza.map((item) => {
      Array.prototype.push.apply(pla, [item.id]);
    });

    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    axios
      .put(
        process.env.REACT_APP_URL_API + "promociones/update/" + idp,
        {
          producto_id: pro,
          plazas_id: pla,
          categorias_id: cate,
        },
        config
      )
      .then((response) => {
        if (response.status === 200) {
          setMsg(1);
        }
      })
      .catch((e) => {
        setMsg(2);
        console.log("ERROR!!!!!", e);
      });
  };
};

export const UpdateImagen = (img, img1, idp, setMsg1) => {
  return async () => {
    updateImg(
      img,
      `PROMOCIONES/img/${idp}`,
      `promociones/update/${idp}`,
      "imagen",
      setMsg1
    );
    var desertRef = firebase
      .app()
      .storage("gs://ipes-adeda.appspot.com")
      .ref(`/PROMOCIONES/img/${idp}/`)
      .child(`${img1}`);
    await desertRef
      .delete()
      .then((ref) => console.log("success =>", ref))
      .catch((error) => console.log(error));
  };
};

export const DeletePromocion = (idp) => {
  return async () => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .put(
        process.env.REACT_APP_URL_API + "promociones/update/" + idp,
        {
          activo: true,
        },
        config
      )
      .then((response) => {
        let data = response.data;
        console.log(data);
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

export const DesactivarPromocion = (idp) => {
  return async () => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .put(
        process.env.REACT_APP_URL_API + "promociones/update/" + idp,
        {
          activo: false,
        },
        config
      )
      .then((response) => {
        let data = response.data;
        console.log(data);
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

const PromocionDatos = (promocion) => ({
  type: types.promocionesDatos,
  promocion: promocion,
});
