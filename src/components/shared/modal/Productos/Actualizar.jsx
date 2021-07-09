import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";

import ModalForm from "../modalForm";
import CssBaseline from "@material-ui/core/CssBaseline";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import useStyles from "components/shared/forms/style";
import Producto from "components/shared/forms/FormProducto/Producto";
import Imagenes from "components/shared/forms/FormProducto/Imagenes";
import Categorias from "components/shared/forms/FormProducto/Categorias";
import { useDispatch, useSelector } from "react-redux";
import { UpdateProductos } from "actions/producto";
import { UpdateImagen } from "actions/producto";
import { UpdateImagen2 } from "actions/producto";
import { UpdateImagen1 } from "actions/producto";
import { Img } from "actions/imagen";
// import { useForm } from "./../../../../hooks/useForm";

const Actualizar = ({
  open,
  handleClose,
  rol,
  unidad1,
  idProducto,
  nombrepro,
  plazapro,
  categorias1,
  sku1,
  imagen_principal,
  imagen1,
  imagen2,
}) => {
  const { msg } = useSelector((state) => state.producto);
  const { plazastrues, categorias } = useSelector((state) => state.plaza);
  const dispatch = useDispatch();

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ["Producto", "Categorías", "Imagenes"];
  const [alerta, setAlerta] = useState("Actualizar producto");

  const [plaza, setPlaza] = useState([]);
  const [nombre, setNombre] = useState("");
  const [sku, setSku] = useState("");
  const [unidad, setUnidad] = useState("");

  const [imggaleria, setImgGaleria] = useState("img");
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [img3, setImg3] = useState(null);
  const [img4, setImg4] = useState(null);
  const [img5, setImg5] = useState(null);
  const [img6, setImg6] = useState(null);

  const [cat, setCat] = useState([]);

  useEffect(() => {
    setNombre(nombrepro);
    setSku(sku1);
    setUnidad(unidad1);
    Img(
      `PRODUCTO/imagen_principal/${idProducto}/${imagen_principal}`,
      setImg2,
      imagen_principal
    );
    Img(`PRODUCTO/imagen_1/${idProducto}/${imagen1}`, setImg4, imagen1);
    Img(`PRODUCTO/imagen_2/${idProducto}/${imagen2}`, setImg6, imagen2);

    let plaza1 = [];
    if (plazapro !== null && plazapro?.length > 0) {
      for (let i = 0; i <= plazapro?.length; i++) {
        const element = plazapro[i];
        plazastrues.map((item) => {
          if (item.id === element) {
            plaza1.push(item);
          }
        });
      }
    }
    setPlaza(plaza1);

    let cate1 = [];
    if (categorias1 !== null && categorias1?.length > 0) {
      for (let i = 0; i <= categorias1?.length; i++) {
        const element = categorias1[i];
        categorias.map((item) => {
          if (item.id === element) {
            cate1.push(item);
          }
        });
      }
    }
    setCat(cate1);
  }, [
    nombrepro,
    plazapro,
    categorias1,
    sku1,
    imagen_principal,
    imagen1,
    imagen2,
    unidad1,
  ]);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Producto
            plaza={plaza}
            rol={rol}
            setPlaza={setPlaza}
            nombre={nombre}
            setNombre={setNombre}
            sku={sku}
            setSku={setSku}
            unidad={unidad}
            setUnidad={setUnidad}
          />
        );
      case 1:
        return (
          <Categorias plaza={plaza} nombre={nombre} cat={cat} setCat={setCat} />
        );
      case 2:
        return (
          <Imagenes
            nombre={nombre}
            imggaleria={imggaleria}
            setImgGaleria={setImgGaleria}
            img1={img1}
            setImg1={setImg1}
            img2={img2}
            setImg2={setImg2}
            img3={img3}
            setImg3={setImg3}
            img4={img4}
            setImg4={setImg4}
            img5={img5}
            setImg5={setImg5}
            img6={img6}
            setImg6={setImg6}
          />
        );

      default:
        throw new Error("Error");
    }
  }

  const ActualizarProducto = () => {
    dispatch(UpdateProductos(plaza, nombre, sku, cat, unidad, idProducto));
    setAlerta(msg);
    setTimeout(() => {
      setAlerta("Actualizar producto");
    }, 3000);
  };

  const ActualizarImagenP = () => {
    dispatch(UpdateImagen(img1, img2, idProducto, nombre));
    setAlerta(msg);
    setTimeout(() => {
      setAlerta("Actualizar producto");
    }, 3000);
  };

  const ActualizarImagen1 = () => {
    dispatch(UpdateImagen1(img3, img4, idProducto, nombre));
    setAlerta(msg);
    setTimeout(() => {
      setAlerta("Actualizar producto");
    }, 3000);
  };

  const ActualizarImagen2 = () => {
    dispatch(UpdateImagen2(img5, img6, idProducto, nombre));
    setAlerta(msg);
    setTimeout(() => {
      setAlerta("Actualizar producto");
    }, 3000);
  };

  const Limpiar = () => {
    setActiveStep(0);
  };

  return (
    <ModalForm
      open={open}
      handleClose={handleClose}
      title={alerta}
      tamaño="sm"
      Limpiar={Limpiar}
    >
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          {/* <Paper className={classes.paper}> */}
          <Typography component="h1" variant="h4" align="center"></Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom></Typography>
                {/* <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography> */}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Regresar
                    </Button>
                  )}
                  {activeStep === steps.length - 1 ? (
                    <>
                      {img1 && (
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ color: "white" }}
                          onClick={ActualizarImagenP}
                          className={classes.button}
                        >
                          Actualizar Imagen
                        </Button>
                      )}
                      {img3 && (
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ color: "white" }}
                          onClick={ActualizarImagen1}
                          className={classes.button}
                        >
                          Actualizar Imagen 1
                        </Button>
                      )}
                      {img5 && (
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ color: "white" }}
                          onClick={ActualizarImagen2}
                          className={classes.button}
                        >
                          Actualizar Imagen 2
                        </Button>
                      )}
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ color: "white" }}
                        onClick={ActualizarProducto}
                        className={classes.button}
                      >
                        Actualizar información
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ color: "white" }}
                        onClick={handleNext}
                        className={classes.button}
                      >
                        Siguiente
                      </Button>
                    </>
                  )}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
          {/* </Paper> */}
        </main>
      </React.Fragment>
    </ModalForm>
  );
};

Actualizar.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  rol: PropTypes.string,
  idProducto: PropTypes.string,
  nombrepro: PropTypes.string,
  plazapro: PropTypes.array,
  categorias1: PropTypes.array,
  sku1: PropTypes.string,
  imagen_principal: PropTypes.string,
  imagen1: PropTypes.string,
  imagen2: PropTypes.string,
  unidad1: PropTypes.string,
};

export default Actualizar;
