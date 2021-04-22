import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MenuItem from "@material-ui/core/MenuItem";
import { useSelector } from "react-redux";

const Plaza = ({ local, cat, setCat, plaza, setPlaza }) => {
  const { plazastrues, localidades, categorias } = useSelector(
    (state) => state.plaza
  );
  console.log(plaza);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Categorías del local {local}
      </Typography>
      <br></br>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <label>Plaza</label>
          <TextField
            id="standard-select-currency"
            variant="outlined"
            select
            value={plaza}
            onChange={(e) => setPlaza(e.target.value)}
            fullWidth
          >
            {plazastrues?.map((option) => (
              <MenuItem key={option?.id} value={option?.id}>
                {option?.nombre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {plaza.length !== 0 ? (
          <>
            <Grid item xs={12} sm={6}>
              <label>Localidad</label>
              <TextField
                margin="normal"
                variant="outlined"
                type="text"
                style={{ marginTop: "1px" }}
                value={localidades?.map((item) => {
                  if (
                    item.id ===
                    plazastrues.filter((item2) => item2.id === plaza)[0]
                      ?.localidad_id
                  ) {
                    return item.label;
                  }
                })}
                name="localidad"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <label>Categoría</label>
              <Autocomplete
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                value={cat}
                onChange={(event, newValue) => {
                  setCat(newValue);
                }}
                options={categorias}
                getOptionLabel={(option) => option?.label}
                // options={
                //   plazastrues.filter((item) => item.id === plaza)[0]
                //     ?.categorias_id
                // }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Categorías de las plazas"
                  />
                )}
              />
            </Grid>
          </>
        ) : (
          ""
        )}
      </Grid>
    </React.Fragment>
  );
};

Plaza.propTypes = {
  local: PropTypes.string,
  cat: PropTypes.array,
  setCat: PropTypes.func,
  plaza: PropTypes.array,
  setPlaza: PropTypes.func,
};

export default Plaza;
