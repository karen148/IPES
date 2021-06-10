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
import { UpdateImagen } from "actions/producto";
import { UpdateImagen2 } from "actions/producto";
import { UpdateImagen1 } from "actions/producto";
import { UpdateProductosLocatario } from "actions/producto";
// import { useForm } from "./../../../../hooks/useForm";

const ActualizarLoc = ({
  open,
  handleClose,
  rol,
  locatario,
  idPro,
  idProducto,
  stock,
  en_promocion,
  unidad1,
  sku1,
  descripcion1,
  cantidad_unidad,
  precio_rebajado,
  precio1,
}) => {
  const { msg } = useSelector((state) => state.producto);
  const { id } = useSelector((state) => state.auth);
  const { productos } = useSelector((state) => state.producto);
  const dispatch = useDispatch();

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ["Producto"];
  const [alerta, setAlerta] = useState("Actualizar producto");

  const [plaza, setPlaza] = useState([]);
  const [nombre, setNombre] = useState("");
  const [unidad, setUnidad] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [existe, setExiste] = useState(false);
  const [promocion, setPromocion] = useState(false);
  const [precio, setPrecio] = useState(0);
  const [rebaja, setRebaja] = useState(0);
  const [descripcion, setDescripion] = useState("");
  const [sku, setSku] = useState("");

  const [imggaleria, setImgGaleria] = useState("img");
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [img3, setImg3] = useState(null);
  const [img4, setImg4] = useState(null);
  const [img5, setImg5] = useState(null);
  const [img6, setImg6] = useState(null);

  const [cat, setCat] = useState([]);

  useEffect(() => {
    setSku(sku1);
    setDescripion(descripcion1);
    setPlaza(productos.filter((item) => item.id === idProducto)[0]);
    setPromocion(en_promocion);
    setExiste(stock);
    setUnidad(unidad1);
    setCantidad(cantidad_unidad);
    setRebaja(precio_rebajado);
    setPrecio(precio1);
  }, [
    idProducto,
    stock,
    en_promocion,
    unidad1,
    sku1,
    descripcion1,
    cantidad_unidad,
    precio_rebajado,
    precio1,
  ]);

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Producto
            rol={rol}
            locatario={locatario}
            plaza={plaza}
            setPlaza={setPlaza}
            nombre={nombre}
            setNombre={setNombre}
            descripcion={descripcion}
            setDescripion={setDescripion}
            sku={sku}
            setSku={setSku}
            unidad={unidad}
            setUnidad={setUnidad}
            cantidad={cantidad}
            setCantidad={setCantidad}
            existe={existe}
            setExiste={setExiste}
            promocion={promocion}
            setPromocion={setPromocion}
            precio={precio}
            setPrecio={setPrecio}
            rebaja={rebaja}
            setRebaja={setRebaja}
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
    dispatch(
      UpdateProductosLocatario(
        plaza,
        descripcion,
        sku,
        unidad,
        cantidad,
        existe,
        promocion,
        precio,
        rebaja,
        id,
        idPro
      )
    );
    setAlerta("El producto se actualizo");
    setTimeout(() => {
      setAlerta("Actualizar producto");
    }, 4000);
  };

  const ActualizarImagenP = () => {
    dispatch(UpdateImagen(img1, idProducto));
    setAlerta(msg);
    setTimeout(() => {
      setAlerta("Actualizar producto");
    }, 3000);
  };

  const ActualizarImagen1 = () => {
    dispatch(UpdateImagen1(img3, idProducto));
    setAlerta(msg);
    setTimeout(() => {
      setAlerta("Actualizar producto");
    }, 3000);
  };

  const ActualizarImagen2 = () => {
    dispatch(UpdateImagen2(img5, idProducto));
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
                  {activeStep === steps.length - 2 ? (
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

ActualizarLoc.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  sku1: PropTypes.string,
  descripcion1: PropTypes.string,
  idPro: PropTypes.string,
  idProducto: PropTypes.string,
  stock: PropTypes.bool,
  en_promocion: PropTypes.bool,
  unidad1: PropTypes.string,
  cantidad_unidad: PropTypes.number,
  precio_rebajado: PropTypes.number,
  rol: PropTypes.string,
  locatario: PropTypes.object,
  precio1: PropTypes.number,
};

export default ActualizarLoc;
