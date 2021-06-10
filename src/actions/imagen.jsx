import firebase from "firebase";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const updateImg = async (img1, url, url2, verificar) => {
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
      },
      (error) => {
        console.log(error.message);
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
    }
  }
};
