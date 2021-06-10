import axios from "axios";
import { types } from "./../types";
import { updateImg } from "./imagen";
import firebase from "firebase";

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

export const UpdateLogo = (img2, idLocatario) => {
  return async (dispatch) => {
    updateImg(img2, `LOCATARIOS/logo/${idLocatario}`);
    const formData = new FormData();
    formData.append("imagen", img2);
    formData.append("locatario", "logo");
    let config1 = {
      method: "put",
      url: process.env.REACT_APP_URL_API + "uploads/LOCATARIO/" + idLocatario,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: formData,
    };
    axios(config1)
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
        console.log("ERROR", e);
      });
  };
};

export const UpdateImagen = (img, idLocatario) => {
  return async () => {
    var desertRef = firebase
      .storage()
      .ref(`LOCATARIOS/img/${idLocatario}`)
      .child(`${idLocatario}`);
    desertRef.delete().then(() => {
      console.log("elimino");
    });
    updateImg(
      img,
      `LOCATARIOS/img/${idLocatario}`,
      `locatarios/update/${idLocatario}`,
      "img"
    );
    // const formData = new FormData(); gs://ipes-76061.appspot.com/LOCATARIOS/img/1432/0cb6bd05-59b1-43bb-9483-fef6df32d987.jpg
    // formData.append("imagen", img);
    // formData.append("locatario", "img");
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
  id
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
        console.log("ERROR!!!!!", e);
      });
  };
};

// const LocatariosDatos = (locatarios) => ({
//   type: types.locatariosDatos,
//   locatario: locatarios,
// });

const LocatarioMensaje = (mensajes) => ({
  type: types.locatariosMensaje,
  payload: mensajes,
});
