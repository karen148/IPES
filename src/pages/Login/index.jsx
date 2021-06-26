import React, { useState } from "react";
import { useForm } from "./../../hooks/useForm";
import { useDispatch } from "react-redux";
import { startLogin } from "./../../actions/auth";

import EmailIcon from "@material-ui/icons/Email";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";

import Alert from "@material-ui/lab/Alert";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
// import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import img from "./login.png";

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

export default function Login() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [eres, setEres] = useState(1);

  const [formLogin, handleInputChange] = useForm({
    email: "",
    contraseña: "",
  });

  const { email, contraseña } = formLogin;

  const validarEmail = (email) => {
    if (eres === "") {
      return true;
    } else if (eres === 1) {
      if (email === "") {
        return true;
      } else if (
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(email)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  const validarCC = (email) => {
    if (eres === "") {
      return true;
    } else if (eres === 2) {
      if (email === "") {
        return true;
      } else if (/^([0-9])*$/.test(email)) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  const handleChange = () => {
    dispatch(startLogin(email, contraseña));
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={12} md={12} className={classes.image}></Grid>
      <Grid item xs={12} sm={12} md={12} className={classes.div2}>
        <Box borderBottom={2} mx="auto" p={1} className={classes.boxi}>
          <p className={classes.text}>Bienvenido</p>
        </Box>
        <Card className={classes.cardd}>
          <CardMedia
            alt="Contemplative Reptile"
            className={classes.img}
            title="Contemplative Reptile"
            image={img}
            xs={false}
          />
          <CardContent>
            <div className={classes.paper}>
              <p
                style={{
                  textAlign: "center",
                  color: "#450016",
                  fontWeight: "bold",
                  fontSize: "30px",
                }}
              >
                Inicio de sesión
              </p>
              <br></br>
              <form
                className={classes.form}
                noValidate
                style={{ fontSize: "20px" }}
              >
                <TextField
                  id="standard-select-currency"
                  select
                  label="Selecciona tu rol"
                  fullWidth
                  value={eres}
                  onChange={(e) => setEres(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value={1}>Administrador</MenuItem>
                  <MenuItem value={2}>Locatario</MenuItem>
                </TextField>
                {eres === 1 ? (
                  <>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Correo electrónico"
                      id="standard-basic"
                      name="email"
                      values={email}
                      onChange={handleInputChange}
                      type="email"
                      style={{ fontSize: "30px" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </>
                ) : (
                  <>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Cédula"
                      id="email"
                      name="email"
                      values={email}
                      onChange={handleInputChange}
                      type="number"
                      style={{ fontSize: "20px" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AssignmentIndIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </>
                )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="contraseña"
                  label="Contraseña"
                  values={contraseña}
                  onChange={handleInputChange}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
                {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleChange}
                  style={{ fontSize: "16px", color: "white" }}
                >
                  Enviar
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      href="/contraseña"
                      variant="body2"
                      style={{ fontSize: "14px" }}
                      color="secondary"
                    >
                      Olvidó contraseña?
                    </Link>
                  </Grid>
                  {!validarEmail(email) && (
                    <Grid item xs={12}>
                      <Alert
                        severity="warning"
                        style={{ marginBottom: "10px" }}
                      >
                        Correo invalido
                      </Alert>
                    </Grid>
                  )}
                  {!validarCC(email) && (
                    <Grid item xs={12}>
                      <Alert
                        severity="warning"
                        style={{ marginBottom: "10px" }}
                      >
                        El número del documento esta mal escrito
                      </Alert>
                    </Grid>
                  )}
                  {/* <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"¿No tienes una cuenta? Inscribirse"}
                </Link>
              </Grid> */}
                </Grid>
                {/* <Box mt={5}>
              <Copyright />
            </Box> */}
              </form>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
