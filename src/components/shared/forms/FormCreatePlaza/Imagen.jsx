import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PanoramaIcon from "@material-ui/icons/Panorama";
import ImageIcon from "@material-ui/icons/Image";
import useStyles from "../FormAccountSettings/styles";
// import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";

const Imagen = ({
  plaza,
  imglogo,
  setImgLogo,
  img,
  setImg,
  img1,
  setImg1,
  img2,
  setImg2,
  img3,
  setImg3,
}) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

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

  const handleImg2 = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event[0]);
    reader.onload = function () {
      setImg2(event[0]);
      setImg3(reader.result);
    };

    reader.onerror = function () {
      console.log(reader.error);
    };
  };

  const Logo = () => {
    setImgLogo("logo");
  };

  const Img = () => {
    setImgLogo("img");
  };

  console.log(img);
  console.log(img2);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Imagen y logo de la plaza {plaza}
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
              icon={<PanoramaIcon style={{ fontSize: "35px" }} />}
            />
            <BottomNavigationAction
              label="Logo"
              icon={<ImageIcon style={{ fontSize: "35px" }} />}
              onClick={Logo}
            />
          </BottomNavigation>
        </Grid>
        {/* <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={Logo}
            style={{ color: "white" }}
          >
            Logo
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={Img}
            style={{ color: "white" }}
          >
            Imagen
          </Button>
        </Grid> */}
        {imglogo === "img" ? (
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
                Por favor verifique que la <b>imagen del banner</b> tenga los
                siguientes formatos: 'png', 'jpg', 'JPG', 'jpeg', 'gif'
              </label>
            </Grid>
            <Grid item xs={12} sm={12}>
              <input
                className="form-control mb-1"
                type="file"
                placeholder=""
                style={{ paddingTop: "10px" }}
                accept=".png,.jpg,.JPG,.jpeg,.gif"
                onChange={(e) => handleImg(e.target.files)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <img src={img1} alt="" width="100%" height="150px" />
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
                Por favor verifique que el <b>logo</b> tenga los siguientes
                formatos: 'png', 'jpg', 'JPG', 'jpeg', 'gif''
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
            <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
              <img src={img3} alt="" width="150px" height="200px" />
            </Grid>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};

Imagen.propTypes = {
  plaza: PropTypes.string,
  cat: PropTypes.string,
  setCat: PropTypes.func,
  imglogo: PropTypes.string,
  setImgLogo: PropTypes.func,
  img: PropTypes.array,
  setImg: PropTypes.func,
  img1: PropTypes.string,
  setImg1: PropTypes.func,
  img2: PropTypes.array,
  setImg2: PropTypes.func,
  img3: PropTypes.string,
  setImg3: PropTypes.func,
};

export default Imagen;
