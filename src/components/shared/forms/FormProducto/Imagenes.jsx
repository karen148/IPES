import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ImageIcon from "@material-ui/icons/Image";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import useStyles from "../FormAccountSettings/styles";
// import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";

const Imagenes = ({
  nombre,
  imggaleria,
  setImgGaleria,
  img1,
  setImg1,
  img2,
  setImg2,
  img3,
  setImg3,
  img4,
  setImg4,
  img5,
  setImg5,
  img6,
  setImg6,
}) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleImg1 = (event) => {
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

  const handleImg2 = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event[0]);
    reader.onload = function () {
      setImg3(event[0]);
      setImg4(reader.result);
    };

    reader.onerror = function () {
      console.log(reader.error);
    };
  };

  const handleImg3 = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event[0]);
    reader.onload = function () {
      setImg5(event[0]);
      setImg6(reader.result);
    };

    reader.onerror = function () {
      console.log(reader.error);
    };
  };

  const Galeria = () => {
    setImgGaleria("galeria");
  };

  const Img = () => {
    setImgGaleria("img");
  };
  console.log(img1);
  console.log(img3);
  console.log(img5);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Imagenes del producto {nombre}
      </Typography>
      <Grid container spacing={3}>
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
              label="Imagen"
              onClick={Img}
              icon={<ImageIcon style={{ fontSize: "35px" }} />}
            />
            <BottomNavigationAction
              label="Galería"
              icon={<PhotoLibraryIcon style={{ fontSize: "35px" }} />}
              onClick={Galeria}
            />
          </BottomNavigation>
        </Grid>
        {imggaleria === "img" ? (
          <Grid
            container
            direction="row"
            spacing={2}
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={12}>
              <label>
                {" "}
                Por favor verifique que la <b>imagen</b> tenga los siguientes
                formatos: 'png', 'jpg', 'JPG', 'jpeg', 'gif'
              </label>
            </Grid>
            <Grid item xs={12} sm={12}>
              <input
                className="form-control mb-1"
                type="file"
                placeholder=""
                style={{ paddingTop: "10px" }}
                accept=".png,.jpg,.JPG,.jpeg,.gif"
                onChange={(e) => handleImg1(e.target.files)}
              />
            </Grid>
            <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
              <img src={img2} alt="" width="150px" height="200px" />
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            direction="row"
            spacing={2}
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={12}>
              <label>
                {" "}
                Por favor verifique que la <b>imagen de la galería</b> tenga los
                siguientes formatos: 'png', 'jpg', 'JPG', 'jpeg', 'gif''
              </label>
            </Grid>
            <Grid item xs={12} sm={12}>
              <input
                className="form-control mb-1"
                type="file"
                placeholder=""
                style={{ paddingTop: "10px" }}
                accept=".png,.jpg,.JPG,.jpeg,.gif"
                onChange={(e) => handleImg2(e.target.files)}
              />
            </Grid>
            {img4 && (
              <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
                <img src={img4} alt="" width="150px" height="200px" />
              </Grid>
            )}
            <Grid item xs={12} sm={12}>
              <input
                className="form-control mb-1"
                type="file"
                placeholder=""
                style={{ paddingTop: "10px" }}
                accept=".png,.jpg,.JPG,.jpeg,.gif"
                onChange={(e) => handleImg3(e.target.files)}
              />
            </Grid>
            {img6 && (
              <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
                <img src={img6} alt="" width="150px" height="200px" />
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};
Imagenes.propTypes = {
  nombre: PropTypes.string,
  imggaleria: PropTypes.string,
  setImgGaleria: PropTypes.func,
  img1: PropTypes.array,
  setImg1: PropTypes.func,
  img2: PropTypes.string,
  setImg2: PropTypes.func,
  img3: PropTypes.array,
  setImg3: PropTypes.func,
  img4: PropTypes.string,
  setImg4: PropTypes.func,
  img5: PropTypes.array,
  setImg5: PropTypes.func,
  img6: PropTypes.string,
  setImg6: PropTypes.func,
};

export default Imagenes;
