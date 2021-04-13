import React from "react";
import PropTypes from "prop-types";

const HeaderDashboard = ({
  title = "Tablero",
  description = "Encuentra todo aquí",
}) => {
  return (
    <header className="header--dashboard">
      <div className="header__left">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {/* <div className="header__center">
                <FormHeaderSearch />
            </div>
            <div className="header__right">
                <a className="header__site-link" href="#">
                    <span>Ver tu tienda</span>
                    <i className="lnr lnr-enter"></i>
                </a>
            </div> */}
    </header>
  );
};

HeaderDashboard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default HeaderDashboard;
