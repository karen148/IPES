import { toggleDrawerMenu } from "actions/menu";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuSidebar from "../MenuSidebar";

const DrawerMenu = () => {
  const dispatch = useDispatch();
  const { isDrawerMenu } = useSelector((state) => state.menu);
  const handleCloseDrawer = () => {
    dispatch(toggleDrawerMenu(false));
  };
  return (
    <aside className={`ps-drawer--mobile ${isDrawerMenu && "active"}`}>
      <div className="ps-drawer__header">
        <h4> Menu</h4>
        <button className="ps-drawer__close" onClick={handleCloseDrawer}>
          <i className="icon icon-cross"></i>
        </button>
      </div>
      <div className="ps-drawer__content">
        <MenuSidebar />
      </div>
    </aside>
  );
};

export default DrawerMenu;
