import React, { useEffect, useState } from "react";
import Formatear from "components/shared/formatoNumero/Formatear_numeros";
import { useDispatch, useSelector } from "react-redux";
import { getGananciasTotales } from "actions/balance";
import { getGananciasLocatario } from "actions/balance";
import { getLocatarioCedula } from "actions/locatarios";

const WidgetEarningSidebar = () => {
  const { rol, codigo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [ganancia, setGanancias] = useState("");
  const [locatario, setLocatario] = useState([]);

  useEffect(() => {
    if (rol === "SUPER_ADMIN") {
      dispatch(getGananciasTotales(setGanancias));
    } else {
      dispatch(getLocatarioCedula(setLocatario, codigo));
    }
  }, [dispatch]);

  useEffect(() => {
    if (locatario.id) {
      dispatch(getGananciasLocatario(setGanancias, locatario.id));
    }
  }, [dispatch, locatario.id]);

  return (
    <div className="ps-block--earning-count">
      {rol === "SUPER_ADMIN" ? (
        <>
          <small style={{ color: "white" }}>Ganancia</small>
          <h3 style={{ color: "white" }}>$ {Formatear(ganancia)}</h3>
        </>
      ) : (
        <>
          <small style={{ color: "white" }}>Ventas</small>
          <h3 style={{ color: "white" }}>$ {Formatear(ganancia)}</h3>
        </>
      )}
    </div>
  );
};

export default WidgetEarningSidebar;
