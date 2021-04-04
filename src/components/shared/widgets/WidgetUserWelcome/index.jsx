import React, { useState, useEffect } from "react";
import axios from "axios";
import TooltipE from "./../../tooltip";
import { useDispatch } from "react-redux";
import { startLogout } from "../../../../actions/auth";

const WidgetUserWelcome = () => {

  const dispatch = useDispatch();

  const [nombre, setNombre] = useState("");
  const [img, setImg] = useState("");
  const exitApp = () => {
    dispatch( startLogout() )
  };

  const getDatos = () => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(
        process.env.REACT_APP_URL_API +
          `admins/getAdmin/${localStorage.getItem("id")}`,
        config
      )
      .then((response) => {
        let data = response.data.admin;
        setNombre(data.nombre);
        setImg(process.env.REACT_APP_URL_API +`uploads/retorna/${localStorage.getItem("rol")}/`+data.img)
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
  useEffect(() => {
    getDatos();
  }, []);

  return (
    <div className="ps-block--user-wellcome">
      <div className="ps-block__left">
        <img src={img} alt="" width="80px" height="80px" />
      </div>
      <div className="ps-block__right">
        <p>
          Hola,<a href="perfil">{nombre}</a>
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
