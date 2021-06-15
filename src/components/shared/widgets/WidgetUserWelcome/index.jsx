import React, { useState, useEffect } from "react";
import TooltipE from "./../../tooltip";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../../../actions/auth";
import firebase from "firebase";

const WidgetUserWelcome = () => {
  const dispatch = useDispatch();
  const { name, img, rol, id } = useSelector((state) => state.auth);

  const [img1, setImg] = useState("");

  const exitApp = () => {
    dispatch(startLogout());
  };

  useEffect(() => {
    setImg(process.env.REACT_APP_URL_API + `uploads/retorna/${rol}/` + img);
  }, []);

  var desertRef = firebase.storage().ref().child(`ADMINS/${rol}/${id}/${img}`);

  desertRef.getDownloadURL().then(function (url) {
    console.log(url);
    var img = document.getElementById("myimg");
    img.src = url;
  });
  console.log(img1);
  return (
    <div className="ps-block--user-wellcome">
      <div className="ps-block__left">
        <img src={""} id="myimg" alt="" width="80px" height="80px" />
      </div>
      <div className="ps-block__right">
        <p>
          Hola,<a href="perfil">{name}</a>
        </p>
      </div>
      <div className="ps-block__action">
        <TooltipE title="Cerrar sesión">
          <a href="/home" onClick={exitApp}>
            <i className="lnr lnr-exit"></i>
          </a>
        </TooltipE>
      </div>
    </div>
  );
};

export default WidgetUserWelcome;
