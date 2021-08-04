import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useSelector } from "react-redux";
// import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";

const Categoria = ({ plaza, cat, setCat }) => {
  const { categorias } = useSelector((state) => state.plaza);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Categorías de la plaza {plaza}
      </Typography>
      <br></br>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Autocomplete
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            value={cat}
            onChange={(event, newValue) => {
              setCat(newValue);
            }}
            options={categorias}
            getOptionLabel={(option) =>
              option.activo ? option.label : option.label + " - DESACTIVADA"
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Categorías de las plazas"
              />
            )}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Categoria.propTypes = {
  plaza: PropTypes.string,
  cat: PropTypes.string,
  setCat: PropTypes.func,
};

export default Categoria;
