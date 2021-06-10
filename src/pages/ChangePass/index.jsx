import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockIcon from "@material-ui/icons/Lock";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import useStyles from "./style";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

export default function ChangePass({ history }) {
  const classes = useStyles();

  const [ojo1, setOjo1] = useState("visibility_off");
  const [ojo2, setOjo2] = useState("visibility_off");
  const [state, setState] = useState({
    contraseña: "",
    ncontraseña: "",
  });

  const handleState = (event) => {
    const { value, name } = event.target;
    setState((_state) => ({ ..._state, [name]: value }));
  };

  const ValiContraseña = (confirmar_contraseña) => {
    if (
      /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,16}$/.test(confirmar_contraseña)
    ) {
      return true;
    } else {
      console.log("MALLLL");
      return false;
    }
  };

  const showPass1 = () => {
    var cambio = document.getElementById("pass1");
    if (cambio.type === "password") {
      cambio.type = "text";
      setOjo1("visibility");
    } else {
      cambio.type = "password";
      setOjo1("visibility_off");
    }
  };

  const showPass2 = () => {
    var cambio = document.getElementById("pass2");
    if (cambio.type === "password") {
      cambio.type = "text";
      setOjo2("visibility");
    } else {
      cambio.type = "password";
      setOjo2("visibility_off");
    }
  };

  let fecthApi = async () => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    if (ValiContraseña(state.ncontraseña)) {
      axios
        .put(
          process.env.REACT_APP_URL_AUTH + "admin-auth/new-password",
          {
            newPassword: state.ncontraseña,
          },
          config
        )
        .then((response) => {
          console.log(response.status);
          if (response.status === 200) {
            alert("Se envio la información correctamente");
            console.log("CORREO");
            return history.push("/");
          }
        })
        .catch((e) => {
          console.log("ERROR!!!!!", e);
        });
    }
  };
  console.log(state.contraseña === state.ncontraseña);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon style={{ fontSize: "20px" }} />
        </Avatar>
        <Typography component="h1" variant="h5" style={{ fontSize: "20px" }}>
          Cambio de contraseña
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <label>Nueva Contraseña</label>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="pass1"
                name="contraseña"
                values={state.contraseña}
                onChange={handleState}
                style={{ fontSize: "20px" }}
                type="password"
              />
              <span
                className="material-icons icon"
                style={{
                  float: "right",
                  cursor: "pointer",
                  position: "relative",
                  margin: "-40px 10px 0 0",
                }}
                onClick={showPass1}
              >
                {ojo1}
              </span>
            </Grid>
            <Grid item xs={12}>
              <label>Volver a dilengenciar la contraseña</label>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="pass2"
                name="ncontraseña"
                values={state.ncontraseña}
                onChange={handleState}
                style={{ fontSize: "20px" }}
                type="password"
              />
              <span
                className="material-icons icon"
                style={{
                  float: "right",
                  cursor: "pointer",
                  position: "relative",
                  margin: "-40px 10px 0 0",
                }}
                onClick={showPass2}
              >
                {ojo2}
              </span>
            </Grid>
            <Grid item xs={12}>
              {/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,16}$/.test(
                state.contraseña
              ) ? (
                <>
                  {state.contraseña === state.ncontraseña ? (
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={fecthApi}
                      className={classes.submit}
                      style={{ fontSize: "16px", color: "white" }}
                    >
                      Actualizar
                    </Button>
                  ) : (
                    <div className="ps-form text-center">
                      <h5 style={{ marginBottom: "25px" }}>
                        Por favor verifique que este bien escrita la contraseña
                      </h5>
                    </div>
                  )}
                </>
              ) : (
                <div className="ps-form">
                  <h5 style={{ marginBottom: "25px" }}>
                    La contraseña debe tener
                  </h5>
                  <ul>
                    <li>Al menos una letra en minúscula</li>
                    <li>Al menos una letra en Mayúscula</li>
                    <li>Al menos un número</li>
                    <li>Al menos 6 carácteres</li>
                  </ul>
                </div>
              )}
            </Grid>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                href="/login"
                variant="body2"
                style={{ fontSize: "14px" }}
                color="grey"
              >
                Iniciar sesión
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

ChangePass.propTypes = {
  history: PropTypes.array,
};
