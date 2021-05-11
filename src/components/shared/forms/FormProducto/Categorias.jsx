import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";

const Categorias = ({ plaza, nombre, cat, setCat }) => {
  const { categorias } = useSelector((state) => state.plaza);
  // let data = [];
  // console.log(plaza);
  // if (plaza.length > 0) {
  //   if (plaza?.categorias_id !== null && plaza?.categorias_id.length > 0) {
  //     for (let index = 0; index < plaza?.categorias_id.length; index++) {
  //       const element = plaza?.categorias_id[index];
  //       categorias?.map((item) => {
  //         if (item?.id === element) {
  //           data.push(item);
  //         }
  //       });
  //     }
  //   }
  // }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Categorías del producto {nombre}
      </Typography>
      <br></br>
      <Grid container spacing={3}>
        {plaza && plaza?.length !== 0 ? (
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
              getOptionLabel={(option) => option?.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Categorías de las plazas"
                />
              )}
            />
          </Grid>
        ) : (
          <Typography variant="h6" gutterBottom style={{ marginLeft: "2%" }}>
            La plaza {plaza?.nombre} no tiene categorías por el momento
          </Typography>
        )}
      </Grid>
    </React.Fragment>
  );
};

Categorias.propTypes = {
  plaza: PropTypes.array,
  nombre: PropTypes.string,
  cat: PropTypes.array,
  setCat: PropTypes.func,
};

export default Categorias;
