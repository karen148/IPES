import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";

const ArchivoCSV = ({ archivo, setArchivo }) => {
  const handleImg1 = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event[0]);
    reader.onload = function () {
      setArchivo(event[0]);
    };

    reader.onerror = function () {
      console.log(reader.error);
    };
  };

  console.log(archivo);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Archivo para subir locatarios
      </Typography>
      <br></br>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <input
            className="form-control mb-1"
            type="file"
            placeholder=""
            style={{ paddingTop: "10px" }}
            // accept=".png,.jpg,.JPG,.jpeg,.gif"
            onChange={(e) => handleImg1(e.target.files)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

ArchivoCSV.propTypes = {
  archivo: PropTypes.array,
  setArchivo: PropTypes.func,
};

export default ArchivoCSV;
