import React from 'react';
import axios from 'axios';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockIcon from '@material-ui/icons/Lock';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useStyles from './style';

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

export default function ChangePass({history}) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    email: ''
  });

  const handleState = (event) => {
    const { value, name } = event.target;
    setState((_state) => ({ ..._state, [name]: value }));
  };

  let fecthApi = async () =>{
    axios
      .post(process.env.REACT_APP_URL_AUTH+"admin-auth/forgot-password",
        {
          email: state.email,
        }
      )
      .then(response => {
        console.log(response.status);
        if (response.status === 200) {
          alert('Por favor revice su correo')
          console.log('CORREO');
          return history.push('/');
        }else{
          return history.push('/sign-up');
        }
      })
      .catch(e => {
        console.log("ERROR!!!!!", e);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon style={{fontSize: '20px'}}/>
        </Avatar>
        <Typography component="h1" variant="h5" style={{fontSize: '20px'}}>
          Olvidó de contraseña
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                values={state.email}
                onChange={handleState}
                autoComplete="email"
                style={{fontSize: '20px'}}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={fecthApi}
            className={classes.submit}
            style={{fontSize: '16px', color: 'white'}}
          >
            Enviar
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" style={{fontSize: '14px'}} color='grey'>
                ¿Ya tienes una cuenta? Inicia sesión 
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
  );
}