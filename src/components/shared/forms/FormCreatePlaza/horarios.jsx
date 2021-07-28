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
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcCallIcon from "@material-ui/icons/AddIcCall";

const Horarios = ({ plaza, horario_m1, setHorariom1 }) => {
  const classes = useStyles();
  const [horaSI, setHoraSI] = useState(false);
  const [value, setValue] = useState(0);
  const Dias = [
    {
      0: "Lunes",
      1: "Martes",
      2: "Miércoles",
      3: "Jueves",
      4: "Viernes",
      5: "Sábado",
      6: "Domingo",
    },
  ];
  console.log(Dias[0][0]);
  const HoraSi = () => {
    setHoraSI(true);
    setHorariom1([
      {
        name: Dias[0][0],
        inicio: "",
        finalizar: "",
      },
    ]);
  };

  const HoraNO = () => {
    setHoraSI(false);
    setHorariom1([
      {
        name: "Todos los días",
        inicio: "",
        finalizar: "",
      },
    ]);
  };

  //agregar un día
  const handleAddTel = () => {
    for (const i of Dias.reverse()) {
      setHorariom1([
        ...horario_m1,
        {
          name: i[horario_m1.length],
          inicio: "",
          finalizar: "",
        },
      ]);
    }
  };

  //evento para modificar input
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...horario_m1];
    list[index][name] = value;
    setHorariom1(list);
  };

  // evento para remover un hijo
  const handleRemoveClick = (index) => {
    const list = [...horario_m1];
    list.splice(index, 2);
    setHorariom1(list);
  };

  console.log(JSON.stringify(horario_m1));

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Horario de la plaza {plaza}
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
        {horaSI
          ? horario_m1.map((h, i) => {
              return (
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={2}
                  key={i + 1}
                >
                  <Grid item xs={12} sm={2}>
                    <label>{h.name}</label>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      type="time"
                      value={h.inicio}
                      name="inicio"
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} className={classes.horario}>
                    <TextField
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      type="time"
                      value={h.finalizar}
                      name="finalizar"
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} style={{ textAlign: "center" }}>
                    {horario_m1.length !== 1 && (
                      <IconButton
                        onClick={() => handleRemoveClick(i)}
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                    {horario_m1.length - 1 === i && (
                      <IconButton
                        onClick={handleAddTel}
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <AddIcCallIcon />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              );
            })
          : horario_m1.map((h, i) => {
              return (
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  justify="center"
                  alignItems="center"
                  key={i + 2}
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
                      value={h.inicio}
                      name="inicio"
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      type="time"
                      value={h.finalizar}
                      name="finalizar"
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </Grid>
                </Grid>
              );
            })}
      </Grid>
    </React.Fragment>
  );
};

Horarios.propTypes = {
  plaza: PropTypes.string,
  horario_m1: PropTypes.string,
  setHorariom1: PropTypes.func,
};

export default Horarios;
