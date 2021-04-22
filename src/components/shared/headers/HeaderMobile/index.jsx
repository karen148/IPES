import { toggleDrawerMenu } from "actions/menu";
import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
// import { connect, useDispatch } from 'react-redux';
// import { toggleDrawerMenu } from './../../../../store/app/action';
// // { isDrawerMenu }
const HeaderMobile = ({ isDrawerMenu }) => {
  const dispatch = useDispatch();
  const handleOpenDrawer = () => {
    dispatch(toggleDrawerMenu(true));
    console.log(dispatch(toggleDrawerMenu(true)));
  };
  console.log(isDrawerMenu);
  return (
    <header className="header--mobile">
      <div className="header__left">
        <button className="ps-drawer-toggle" onClick={handleOpenDrawer}>
          <i className="lnr lnr-menu"></i>
        </button>
        <img src="" alt="" />
      </div>
      <div className="header__center">
        <a className="ps-logo" href="/">
          <img src="/img/logo.png" alt="" />
        </a>
      </div>
      <div className="header__right">
        <a className="header__site-link" href="/">
          <i className="lnr lnr-exit"></i>
        </a>
      </div>
    </header>
  );
};

HeaderMobile.propTypes = {
  isDrawerMenu: PropTypes.bool,
};

export default HeaderMobile;
// // export default connect((state) => state.app)(HeaderMobile);
