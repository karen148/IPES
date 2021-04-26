import React, { useEffect } from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { starChecking } from "./../actions/auth";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import CircularProgress from "@material-ui/core/CircularProgress";
import Login from "./../pages/Login";
import Tablero from "./../pages/Tablero";
import Perfil from "./../pages/Perfil";
import Plazas from "./../pages/Plazas";
import Locatarios from "./../pages/Locatarios";
import ForgotPass from "./../pages/ForgotPass";
import Categorias from "./../pages/Categorias";
import Productos from "./../pages/Productos";

import useStyles from "./style";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, id } = useSelector((state) => state.auth);
  const classes = useStyles();

  useEffect(() => {
    dispatch(starChecking());
  }, [dispatch]);

  if (checking) {
    return (
      <div className={classes.root}>
        <CircularProgress color="secondary" />
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
          <PrivateRoute
            exact
            path="/"
            component={Tablero}
            isAuthenticated={!!id}
          />
          <PrivateRoute
            exact
            path="/perfil"
            component={Perfil}
            isAuthenticated={!!id}
          />
          <PublicRoute
            exact
            path="/plaza"
            component={Plazas}
            isAuthenticated={!!id}
          />
          <PublicRoute
            exact
            path="/locatario"
            component={Locatarios}
            isAuthenticated={!!id}
          />
          <PublicRoute
            exact
            path="/categorias"
            component={Categorias}
            isAuthenticated={!!id}
          />
          <PublicRoute
            exact
            path="/productos"
            component={Productos}
            isAuthenticated={!!id}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
