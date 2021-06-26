import React from "react";
import PropTypes from "prop-types";

const HeaderDashboard = ({
  title = "Tablero",
  description = "Encuentra todo aquí",
}) => {
  return (
    <header className="header--dashboard">
      <div className="header__left">
        <h2 style={{ color: "#450016" }}>{title}</h2>
        <p style={{ color: "#000", fontSize: "19px" }}>{description}</p>
      </div>
    </header>
  );
};

HeaderDashboard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default HeaderDashboard;
