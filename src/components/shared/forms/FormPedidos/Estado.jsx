import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";

const Estado = ({ estado, setEstado }) => {
  const estados = [
    {
      value: "0",
      label: "Enviado",
    },
    {
      value: "1",
      label: "En progreso",
    },
    {
      value: "2",
      label: "Entregado",
    },
    {
      value: "3",
      label: "Cancelado",
    },
  ];
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Ingresar la información del Estado del pedido
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="outlined-select-currency-native"
            select
            variant="outlined"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            fullWidth
            // className={classes.margin}
          >
            {estados.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Estado.propTypes = {
  estado: PropTypes.string,
  setEstado: PropTypes.func,
};

export default Estado;
