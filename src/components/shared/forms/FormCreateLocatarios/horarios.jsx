import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import TodayIcon from "@material-ui/icons/Today";
import DateRangeIcon from "@material-ui/icons/DateRange";
import TextField from "@material-ui/core/TextField";
import useStyles from "../style";

const Horarios = ({
  local,
  horario_m1,
  setHorariom1,
  horario_m2,
  setHorariom2,
  horario_lm1,
  setHorariolm1,
  horario_lm2,
  setHorariolm2,
  horario_mm1,
  setHorariomm1,
  horario_mm2,
  setHorariomm2,
  horario_jm1,
  setHorariojm1,
  horario_jm2,
  setHorariojm2,
  horario_vm1,
  setHorariovm1,
  horario_vm2,
  setHorariovm2,
  horario_sm1,
  setHorariosm1,
  horario_sm2,
  setHorariosm2,
  horario_dm1,
  setHorariodm1,
  horario_dm2,
  setHorariodm2,
}) => {
  const classes = useStyles();
  const [horaSI, setHoraSI] = useState(false);
  const [value, setValue] = useState(0);

  const HoraSi = () => {
    setHoraSI(true);
  };

  const HoraNO = () => {
    setHoraSI(false);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Horario del local {local}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            showLabels
            className={classes.navbar}
          >
            <BottomNavigationAction
              label="Horario Fijo"
              onClick={HoraNO}
              icon={<TodayIcon style={{ fontSize: "35px" }} />}
            />
            <BottomNavigationAction
              label="Horario por días"
              icon={<DateRangeIcon style={{ fontSize: "35px" }} />}
              onClick={HoraSi}
            />
          </BottomNavigation>
        </Grid>
        {/* <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={HoraNO}
            style={{ color: "white" }}
          >
            Horario Fijo
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={HoraSi}
            style={{ color: "white" }}
          >
            Horario por días
          </Button>
        </Grid> */}
        {horaSI ? (
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12} sm={2}>
              <label>Lunes: </label>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                margin="normal"
                variant="outlined"
                fullWidth
                type="time"
                value={horario_m1}
                name="horario_m1"
                onChange={(e) => setHorariom1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4} className={classes.horario}>
              <TextField
                margin="normal"
                variant="outlined"
                fullWidth
                type="time"
                value={horario_m2}
                name="horario_m2"
                onChange={(e) => setHorariom2(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <label>Martes: </label>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                margin="normal"
                variant="outlined"
                fullWidth
                type="time"
                value={horario_lm1}
                name="horario_lm1"
                onChange={(e) => setHorariolm1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4} className={classes.horario}>
              <TextField
                margin="normal"
                variant="outlined"
                fullWidth
                type="time"
                value={horario_lm2}
                name="horario_lm2"
                onChange={(e) => setHorariolm2(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <label>Miercoles: </label>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                margin="normal"
                variant="outlined"
                fullWidth
                type="time"
                value={horario_mm1}
                name="horario_mm1"
                onChange={(e) => setHorariomm1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4} className={classes.horario}>
              <TextField
                margin="normal"
                variant="outlined"
                fullWidth
                type="time"
                value={horario_mm2}
                name="horario_mm2"
                onChange={(e) => setHorariomm2(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <label>Jueves: </label>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                margin="normal"
                variant="outlined"
                fullWidth
                type="time"
                value={horario_jm1}
                name="horario_jm1"
                onChange={(e) => setHorariojm1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4} className={classes.horario}>
              <TextField
                margin="normal"
                variant="outlined"
                fullWidth
                type="time"
                value={horario_jm2}
                name="horario_jm2"
                onChange={(e) => setHorariojm2(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <label>Viernes: </label>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                margin="normal"
                variant="outlined"
                fullWidth
                type="time"
                value={horario_vm1}
                name="horario_vm1"
                onChange={(e) => setHorariovm1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4} className={classes.horario}>
              <TextField
                margin="normal"
                variant="outlined"
                fullWidth
                type="time"
                value={horario_vm2}
                name="horario_vm2"
                onChange={(e) => setHorariovm2(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <label>Sabado: </label>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                margin="normal"
                variant="outlined"
                fullWidth
                type="time"
                value={horario_sm1}
                name="horario_sm1"
                onChange={(e) => setHorariosm1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4} className={classes.horario}>
              <TextField
                margin="normal"
                variant="outlined"
                fullWidth
                type="time"
                value={horario_sm2}
                name="horario_sm2"
                onChange={(e) => setHorariosm2(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <label>Domingo: </label>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                margin="normal"
                variant="outlined"
                fullWidth
                type="time"
                value={horario_dm1}
                name="horario_dm1"
                onChange={(e) => setHorariodm1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4} className={classes.horario}>
              <TextField
                margin="normal"
                variant="outlined"
                fullWidth
                type="time"
                value={horario_dm2}
                name="horario_dm2"
                onChange={(e) => setHorariodm2(e.target.value)}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            direction="row"
            spacing={2}
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={12}>
              <br></br>
              <label>El mismo horario para todos los días</label>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                variant="outlined"
                fullWidth
                type="time"
                value={horario_m1}
                name="horario_m1"
                onChange={(e) => setHorariom1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                variant="outlined"
                fullWidth
                type="time"
                value={horario_m2}
                name="horario_m2"
                onChange={(e) => setHorariom2(e.target.value)}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};

Horarios.propTypes = {
  local: PropTypes.string,
  horario_m1: PropTypes.string,
  setHorariom1: PropTypes.func,
  horario_m2: PropTypes.string,
  setHorariom2: PropTypes.func,
  horario_lm1: PropTypes.string,
  setHorariolm1: PropTypes.func,
  horario_lm2: PropTypes.string,
  setHorariolm2: PropTypes.func,
  horario_mm1: PropTypes.string,
  setHorariomm1: PropTypes.func,
  horario_mm2: PropTypes.string,
  setHorariomm2: PropTypes.func,
  horario_jm1: PropTypes.string,
  setHorariojm1: PropTypes.func,
  horario_jm2: PropTypes.string,
  setHorariojm2: PropTypes.func,
  horario_vm1: PropTypes.string,
  setHorariovm1: PropTypes.func,
  horario_vm2: PropTypes.string,
  setHorariovm2: PropTypes.func,
  horario_sm1: PropTypes.string,
  setHorariosm1: PropTypes.func,
  horario_sm2: PropTypes.string,
  setHorariosm2: PropTypes.func,
  horario_dm1: PropTypes.string,
  setHorariodm1: PropTypes.func,
  horario_dm2: PropTypes.string,
  setHorariodm2: PropTypes.func,
};

export default Horarios;
