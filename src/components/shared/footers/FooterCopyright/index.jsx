import React from "react";
import img from "./LOGO IPES-PLAZAS-01.png";

const FooterCopyright = () => {
  return (
    <div className="ps-copyright">
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "15px",
          textAlign: "center",
          width: "95%",
        }}
      >
        <img src={img} alt="" style={{ width: "90%" }} />
      </div>
      <p style={{ color: "white" }}>
        &copy;2021 IPES. Todos los derechos reservados.
      </p>
    </div>
  );
};

export default FooterCopyright;
