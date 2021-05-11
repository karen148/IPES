import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useSelector } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import PropTypes from "prop-types";

const Producto = ({
  plaza,
  setPlaza,
  nombre,
  setNombre,
  descripcion,
  setDescripion,
  sku,
  setSku,
}) => {
  const { plazastrues } = useSelector((state) => state.plaza);
  console.log(plaza);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Ingresar la información del producto
      </Typography>
      <Grid container spacing={3}>
        {plazastrues.length !== 0 ? (
          <Grid item xs={12} sm={12}>
            <label>Plaza</label>
            <Autocomplete
              multiple
              limitTags={2}
              id="multiple-limit-tags"
              options={plazastrues}
              getOptionLabel={(option) => option?.nombre}
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
        ) : (
          <Typography
            variant="subtitle1"
            gutterBottom
            style={{ marginLeft: "2%", marginTop: "10px" }}
          >
            No hay plazas registradas
          </Typography>
        )}
        <Grid item xs={12}>
          <label>Nombre del producto</label>
          <TextField
            margin="normal"
            variant="outlined"
            type="text"
            value={nombre}
            name="nombre"
            onChange={(e) => setNombre(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <label>SKU</label>
          <TextField
            margin="normal"
            variant="outlined"
            type="text"
            value={sku}
            name="sku"
            onChange={(e) => setSku(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <label>Descripción del producto</label>
          <TextareaAutosize
            aria-label="minimum height"
            variant="outlined"
            value={descripcion}
            onChange={(e) => setDescripion(e.target.value)}
            fullWidth
            style={{ width: "100%", height: " 100px" }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Producto.propTypes = {
  plaza: PropTypes.array,
  setPlaza: PropTypes.func,
  nombre: PropTypes.string,
  setNombre: PropTypes.func,
  descripcion: PropTypes.string,
  setDescripion: PropTypes.func,
  sku: PropTypes.string,
  setSku: PropTypes.func,
};

export default Producto;
