import React from "react";
import { useSelector } from "react-redux";

const WidgetEarningSidebar = () => {
  const { rol } = useSelector((state) => state.auth);
  return (
    <div className="ps-block--earning-count">
      {rol === "SUPER_ADMIN" ? (
        <>
          <small>Ganancia</small>
          <h3>$12,560.55</h3>
        </>
      ) : (
        <>
          <small>Ventas</small>
          <h3>$12,560.55</h3>
        </>
      )}
    </div>
  );
};

export default WidgetEarningSidebar;
