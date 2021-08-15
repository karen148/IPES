import React, { useState, useEffect } from "react";
import TooltipE from "./../../tooltip";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../../../actions/auth";
import { Img, NoImg } from "actions/imagen";

const WidgetUserWelcome = () => {
  const dispatch = useDispatch();
  const { name, img, rol, id } = useSelector((state) => state.auth);
  const { Noimg } = useSelector((state) => state.imagen);

  const [img1, setImg] = useState("");

  const exitApp = () => {
    dispatch(startLogout());
  };

  useEffect(() => {
    if (img) {
      dispatch(Img(`ADMINS/${rol}/${id}/${img}`, setImg, img));
    } else {
      dispatch(NoImg());
    }
  }, [img1]);

  return (
    <div className="ps-block--user-wellcome">
      <div className="ps-block__left">
        <img
          src={img1 ? img1 : Noimg}
          id="myimg"
          alt=""
          width="90px"
          height="90px"
        />
      </div>
      <div className="ps-block__right">
        <p style={{ color: "white" }}>
          Hola,
          <a href="perfil" style={{ color: "white" }}>
            {name.split(" ")[0]}
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
