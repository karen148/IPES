import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
// import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";

const Imagen = ({ setImg, img1, setImg1 }) => {
  const handleImg = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event[0]);
    reader.onload = function () {
      setImg(event[0]);
      setImg1(reader.result);
    };

    reader.onerror = function () {
      console.log(reader.error);
    };
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Imagen de la promoción
      </Typography>
      <br></br>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <input
            style={{ paddingTop: "10px" }}
            className="form-control"
            type="file"
            placeholder=""
            accept=".png,.jpg"
            id="docs"
            name="imagen"
            onChange={(e) => handleImg(e.target.files)}
          />
          {img1 ? (
            <img
              src={img1}
              alt=""
              width="100px"
              height="100px"
              style={{ marginTop: "10px" }}
            />
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Imagen.propTypes = {
  setImg: PropTypes.func,
  img1: PropTypes.string,
  setImg1: PropTypes.func,
};

export default Imagen;
