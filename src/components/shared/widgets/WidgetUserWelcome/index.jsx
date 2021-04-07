import React, { useState, useEffect } from "react";
import TooltipE from "./../../tooltip";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../../../actions/auth";

const WidgetUserWelcome = () => {

  const dispatch = useDispatch();
  const { name, img, rol } = useSelector(state => state.auth)

  const [img1, setImg] = useState("");
  const exitApp = () => {
    dispatch( startLogout() )
  };

  useEffect(() => {
    setImg(process.env.REACT_APP_URL_API +`uploads/retorna/${rol}/`+img)
  }, [])

  return (
    <div className="ps-block--user-wellcome">
      <div className="ps-block__left">
        <img src={img1} alt="" width="80px" height="80px" />
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
