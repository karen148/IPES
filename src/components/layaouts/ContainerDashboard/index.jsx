import React from "react";
import FooterCopyright from "./../../shared/footers/FooterCopyright";
import MenuSidebar from "./../../shared/menus/MenuSidebar";
import WidgetEarningSidebar from "./../../shared/widgets/WidgetEarningSidebar";
import WidgetUserWelcome from "./../../shared/widgets/WidgetUserWelcome";
import HeaderMobile from "./../../shared/headers/HeaderMobile";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./../../../theme";
import PropTypes from "prop-types";

// import useStyles from "./styles"
import "./style.css";
import DrawerMenu from "components/shared/menus/DrawerMenu";

/**
 * ContainerDashboard es el layaout principal el cual maquetea las vistas que se
 * encuentran en la carpeta pages.
 * @param {Array} children - Contenedor de los componentes paginas
 * @returns {Object} Contenido de las vitas (page)
 */

const ContainerDashboard = ({ children }) => {
  // const class2 = useStyles();

  return (
    <div className="martfury-admin">
      <main className="ps-main">
        <div className="ps-main__sidebar">
          <div className="ps-sidebar">
            <div className="ps-sidebar__top">
              <ThemeProvider theme={theme}>
                <WidgetUserWelcome />
              </ThemeProvider>
              <WidgetEarningSidebar />
            </div>
            <div className="ps-sidebar__content">
              <div className="ps-sidebar__center">
                <MenuSidebar />
              </div>
            </div>
            <div className="ps-sidebar__footer">
              <FooterCopyright />
            </div>
          </div>
        </div>
        <div className="ps-main__wrapper">
          <HeaderMobile />
          {children}
          <DrawerMenu />
        </div>
      </main>
    </div>
  );
};

ContainerDashboard.propTypes = {
  children: PropTypes.array,
};

export default ContainerDashboard;
