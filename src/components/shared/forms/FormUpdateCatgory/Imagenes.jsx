import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import { setImagen } from "actions/categoria";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
// import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";

const Imagen = ({ idCategoria, img }) => {
  const dispatch = useDispatch();

  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);

  useEffect(() => {
    if (img) {
      setImg2(
        process.env.REACT_APP_URL_API + `uploads/retorna/CATEGORIA/${img}`
      );
    }
  }, [img]);

  const handleImg = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event[0]);
    reader.onload = function () {
      setImg1(event[0]);
      setImg2(reader.result);
    };

    reader.onerror = function () {
      console.log(reader.error);
    };
  };

  const ActualizarImagen = () => {
    dispatch(setImagen(img1, idCategoria));
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Actualizar Icono
      </Typography>
      <br></br>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <label>Icono SVG</label>
          <input
            style={{ paddingTop: "10px" }}
            className="form-control"
            type="file"
            placeholder=""
            accept=".svg"
            id="docs"
            name="imagen"
            onChange={(e) => handleImg(e.target.files)}
          />
          {img2 ? (
            <img
              src={img2}
              alt=""
              width="100px"
              height="100px"
              style={{ marginTop: "10px" }}
            />
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={ActualizarImagen}
            style={{ color: "white" }}
          >
            Actualizar
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Imagen.propTypes = {
  idCategoria: PropTypes.string,
  img: PropTypes.string,
};

export default Imagen;
