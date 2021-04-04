import React from "react";
import { useForm } from './../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { startLogin } from './../../actions/auth';

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";

import {ThemeProvider} from '@material-ui/core/styles';
import theme from './../../theme'
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

export default function Login({ history }) {

  const classes = useStyles();

  const dispatch = useDispatch();

  const [ formLogin, handleInputChange ] = useForm({
    email: "",
    contraseña: "",
  })

  const { email, contraseña } = formLogin;

  const handleChange = () => {
    dispatch(startLogin(email, contraseña))
  } 

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonIcon style={{fontSize: '20px'}}/>
          </Avatar>
          <Typography component="h1" variant="h5" style={{fontSize: '20px'}}>
            Iniciar sesión
          </Typography>
          <form className={classes.form} noValidate style={{fontSize: '20px'}}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electronico"
              name="email"
              values={email}
              onChange={handleInputChange}
              autoComplete="email"
              autoFocus
              style={{fontSize: '20px'}}
            />
            <TextField
              variant="outlined"
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
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={handleChange}
              style={{fontSize: '16px', color: 'white'}}
            >
              Enviar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-pass" variant="body2" style={{fontSize: '14px'}} color='secondary'>
                  Olvidó contraseña?
                </Link>
              </Grid>
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
      </Grid>
      </ThemeProvider>
    </Grid>
  );
}