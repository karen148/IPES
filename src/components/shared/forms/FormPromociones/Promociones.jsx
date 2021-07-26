import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Promociones = ({ plaza, setPlaza, categoria, setCategorias }) => {
  const { categorias, plazastrues } = useSelector((state) => state.plaza);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Ingresar la información de la promoción
      </Typography>
      <br></br>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <label>Plaza</label>
          <Autocomplete
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            options={plazastrues}
            getOptionLabel={(option) => (option?.nombre ? option?.nombre : "")}
            value={plaza}
            onChange={(event, newValue) => {
              setPlaza(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                type="text"
                margin="normal"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <label>Categorias</label>
          <Autocomplete
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            options={categorias}
            getOptionLabel={(option) => (option?.label ? option?.label : "")}
            value={categoria}
            onChange={(event, newValue) => {
              setCategorias(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                type="text"
                margin="normal"
                variant="outlined"
              />
            )}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Promociones.propTypes = {
  plaza: PropTypes.array,
  setPlaza: PropTypes.func,
  categoria: PropTypes.array,
  setCategorias: PropTypes.func,
};

export default Promociones;
