import React, { useState, useEffect } from "react";
import TooltipE from "./../../tooltip";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../../../actions/auth";
import { Img } from "actions/imagen";

const WidgetUserWelcome = () => {
  const dispatch = useDispatch();
  const { name, img, rol, id } = useSelector((state) => state.auth);

  const [img1, setImg] = useState("");

  const exitApp = () => {
    dispatch(startLogout());
  };

  useEffect(() => {
    dispatch(Img(`ADMINS/${rol}/${id}/${img}`, setImg, img));
  }, [dispatch]);

  return (
    <div className="ps-block--user-wellcome">
      <div className="ps-block__left">
        <img src={img1} id="myimg" alt="" width="80px" height="80px" />
      </div>
      <div className="ps-block__right">
        <p style={{ color: "white" }}>
          Hola,
          <a href="perfil" style={{ color: "white" }}>
            {name}
          </a>
        </p>
      </div>
      <div className="ps-block__action">
        <TooltipE title="Cerrar sesión">
          <a href="/home" onClick={exitApp}>
            <i className="lnr lnr-exit" style={{ color: "#450016" }}></i>
          </a>
        </TooltipE>
      </div>
    </div>
  );
};

export default WidgetUserWelcome;
