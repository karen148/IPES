import firebase from "firebase";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const updateImg = async (
  img1,
  url,
  url2,
  verificar,
  setMsg,
  producto
) => {
  if (img1) {
    const nombre = img1.name.split(".", 2);
    const extension = nombre[nombre.length - 1];
    const nom = uuidv4();
    const imagen = `${uuidv4()}.${extension}`;
    console.log(nom);
    const storageRef = firebase.storage().ref(`${url}/${imagen}`);
    const task = storageRef.put(img1);
    task.on(
      "state_changed",
      () => {
        console.log("Exito");
        // setMsg({
        //   tipo: "success",
        //   msg: "Imagen acualizada en el servidor de Google",
        // });
      },
      (error) => {
        console.log(error.message);
        // setMsg({
        //   tipo: "error",
        //   msg: "El icono no se actualizo en el servidor de Google",
        // });
      }
    );
    let config1 = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    if (verificar === "img") {
      axios
        .put(
          process.env.REACT_APP_URL_API + `${url2}`,
          { img: imagen },
          config1
        )
        .then((response) => {
          let data = response.data;
          console.log(data);
        })
        .catch((e) => {
          console.log("ERROR", e);
        });
    } else if (verificar === "logo") {
      axios
        .put(
          process.env.REACT_APP_URL_API + `${url2}`,
          { logo: imagen },
          config1
        )
        .then((response) => {
          let data = response.data;
          console.log(data);
        })
        .catch((e) => {
          console.log("ERROR", e);
        });
    } else if (verificar === "icono") {
      axios
        .put(
          process.env.REACT_APP_URL_API + `${url2}`,
          { icono: imagen },
          config1
        )
        .then(() => {
          setMsg({
            tipo: "success",
            msg: "Icono actualizado en la base de datos",
          });
        })
        .catch(() => {
          setMsg({
            tipo: "error",
            msg: "Icono no actualizado en la base de datos",
          });
        });
    } else if (verificar === "imagen_principal") {
      axios
        .put(
          process.env.REACT_APP_URL_API + `${url2}`,
          { nombre: producto, imagen_principal: imagen },
          config1
        )
        .then(() => {
          setMsg({
            tipo: "success",
            msg: "La imagen se actualizo en la base de datos",
          });
        })
        .catch(() => {
          setMsg({
            tipo: "error",
            msg: "La imagen no se actualizo en la base de datos",
          });
        });
    } else if (verificar === "imagen_1") {
      axios
        .put(
          process.env.REACT_APP_URL_API + `${url2}`,
          { nombre: producto, imagen_1: imagen },
          config1
        )
        .then(() => {
          setMsg({
            tipo: "success",
            msg: "La imagen se actualizo en la base de datos",
          });
        })
        .catch(() => {
          setMsg({
            tipo: "error",
            msg: "La imagen no se actualizo en la base de datos",
          });
        });
    } else if (verificar === "imagen_2") {
      axios
        .put(
          process.env.REACT_APP_URL_API + `${url2}`,
          { nombre: producto, imagen_2: imagen },
          config1
        )
        .then(() => {
          setMsg({
            tipo: "success",
            msg: "La imagen se actualizo en la base de datos",
          });
        })
        .catch(() => {
          setMsg({
            tipo: "error",
            msg: "La imagen no se actualizo en la base de datos",
          });
        });
    } else if (verificar === "imagen") {
      axios
        .put(
          process.env.REACT_APP_URL_API + `${url2}`,
          { imagen: imagen },
          config1
        )
        .then(() => {
          setMsg({
            tipo: "success",
            msg: "Icono actualizado en la base de datos",
          });
        })
        .catch(() => {
          setMsg({
            tipo: "error",
            msg: "La imagen no se actualizo en la base de datos",
          });
        });
    }
  }
};

export const NoImg = (setImg) => {
  return async () => {
    var desertRef1 = firebase.storage().ref().child(`no-photo.svg`);
    desertRef1.getDownloadURL().then(function (url) {
      setImg(url);
    });
  };
};

export const Img = (url, setImg, img) => {
  return async () => {
    if (img) {
      var desertRef1 = firebase.storage().ref().child(`${url}`);
      desertRef1.getDownloadURL().then(function (url1) {
        setImg(url1);
      });
    } else {
      var desertRef2 = firebase.storage().ref().child(`no-photo.svg`);
      desertRef2.getDownloadURL().then(function (url1) {
        setImg(url1);
      });
    }
  };
};
