import React, { useEffect } from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { starChecking } from "./../actions/auth";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
// import CircularProgress from "@material-ui/core/CircularProgress";
import Login from "./../pages/Login";
import Tablero from "./../pages/Tablero";
import Perfil from "./../pages/Perfil";
import Plazas from "./../pages/Plazas";
import Locatarios from "./../pages/Locatarios";
import ForgotPass from "./../pages/ForgotPass";
import ChangePass from "./../pages/ChangePass";
import Categorias from "./../pages/Categorias";
import Productos from "./../pages/Productos";
import Clientes from "pages/Clientes";
import Pedidos from "pages/Pedidos";
import useStyles from "./style";
import img1 from "./logo.png";
import "./../components/layaouts/ContainerDashboard/style.css";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, id, rol } = useSelector((state) => state.auth);
  const classes = useStyles();

  const roles = ["SUPER_ADMIN", "ADMIN_LOCATARIO"];
  const admin = ["SUPER_ADMIN"];
  // const locatario = ["ADMIN_LOCATARIO"];

  useEffect(() => {
    dispatch(starChecking());
  }, [dispatch]);

  if (checking) {
    return (
      <div className={classes.root}>
        <div>
          <img src={img1} alt="" />
        </div>
        <div className="loader">Loading...</div>
        {/* <CircularProgress color="secondary" /> */}
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <PublicRoute
            exact
            path="/login"
            component={Login}
            isAuthenticated={!!id}
          />
          <PublicRoute
            exact
            path="/contraseña"
            component={ForgotPass}
            isAuthenticated={!!id}
          />
          <PublicRoute
            exact
            path="/cambiocontraseña"
            component={ChangePass}
            isAuthenticated={!!id}
          />
          <PrivateRoute
            exact
            path={rol === "SUPER_ADMIN" ? "/admin" : "/locatario"}
            component={Tablero}
            isAuthenticated={!!id}
            userRole={rol}
            requiredRoles={roles}
          />
          <PrivateRoute
            exact
            path={rol === "SUPER_ADMIN" ? "/admin/perfil" : "/locatario/perfil"}
            component={Perfil}
            isAuthenticated={!!id}
            userRole={rol}
            requiredRoles={roles}
          />
          <PrivateRoute
            exact
            path="/admin/plaza"
            component={Plazas}
            isAuthenticated={!!id}
            userRole={rol}
            requiredRoles={admin}
          />
          <PrivateRoute
            exact
            path="/admin/locatarios"
            component={Locatarios}
            isAuthenticated={!!id}
            userRole={rol}
            requiredRoles={admin}
          />
          <PrivateRoute
            exact
            path="/admin/categorias"
            component={Categorias}
            isAuthenticated={!!id}
            userRole={rol}
            requiredRoles={admin}
          />
          <PrivateRoute
            exact
            path={
              rol === "SUPER_ADMIN"
                ? "/admin/productos"
                : "/locatario/productos"
            }
            component={Productos}
            isAuthenticated={!!id}
            userRole={rol}
            requiredRoles={roles}
          />
          <PrivateRoute
            exact
            path="/admin/clientes"
            component={Clientes}
            isAuthenticated={!!id}
            userRole={rol}
            requiredRoles={admin}
          />
          <PrivateRoute
            exact
            path={
              rol === "SUPER_ADMIN" ? "/admin/pedidos" : "/locatario/pedidos"
            }
            component={Pedidos}
            isAuthenticated={!!id}
            userRole={rol}
            requiredRoles={roles}
          />
          <Redirect to={rol === "SUPER_ADMIN" ? "/admin" : "/locatario"} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
