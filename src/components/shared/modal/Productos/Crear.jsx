import React, { useState } from "react";
import ModalForm from "./../modalForm";
import CssBaseline from "@material-ui/core/CssBaseline";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import Alert from "@material-ui/lab/Alert";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import useStyles from "components/shared/forms/style";
import Producto from "components/shared/forms/FormProducto/Producto";
import Imagenes from "components/shared/forms/FormProducto/Imagenes";
import Categorias from "components/shared/forms/FormProducto/Categorias";
import { setProductos } from "actions/producto";
import { useDispatch, useSelector } from "react-redux";
import { setProductosLocatario } from "actions/producto";

const Crear = ({ open, handleClose, locatario, rol }) => {
  const { msg } = useSelector((state) => state.producto);
  const dispatch = useDispatch();

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps1 = ["Producto"];
  const steps = ["Producto", "Imagenes", "Categorías"];
  const [alerta, setAlerta] = useState(false);

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

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const Registrar = () => {
    if (rol === "SUPER_ADMIN") {
      dispatch(
        setProductos(plaza, nombre, descripcion, sku, img1, img3, img5, cat)
      );
    } else {
      if (precio > rebaja) {
        let pro = [...locatario.productos_locatarios_id];
        console.log(pro);
        dispatch(
          setProductosLocatario(
            plaza,
            descripcion,
            sku,
            unidad,
            cantidad,
            existe,
            promocion,
            precio,
            rebaja,
            locatario.id
          )
        );
        setAlerta(true);
        setTimeout(() => {
          setAlerta(false);
        }, 3000);
      }
    }
  };

  console.log(sku);
  console.log(descripcion);
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
      case 2:
        return (
          <Categorias plaza={plaza} nombre={nombre} cat={cat} setCat={setCat} />
        );
      default:
        throw new Error("Error");
    }
  }

  const Limpiar = () => {
    setPlaza([]);
    setNombre("");
    setDescripion("");
    setSku("");
    setImgGaleria("img");
    setImg1(null);
    setImg2(null);
    setImg3(null);
    setImg4(null);
    setImg5(null);
    setImg6(null);
    setCat([]);
    setActiveStep(0);
    setCantidad(0);
    setExiste(false);
    setPromocion(false);
    setPrecio(0);
    setRebaja(0);
  };

  return (
    <ModalForm
      open={open}
      handleClose={handleClose}
      title="Crear Producto"
      tamaño="sm"
      Limpiar={Limpiar}
    >
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          {/* <Paper className={classes.paper}> */}
          <Typography component="h1" variant="h4" align="center"></Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {rol === "SUPER_ADMIN"
              ? steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))
              : steps1.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
          </Stepper>
          <React.Fragment>
            {rol === "SUPER_ADMIN" ? (
              activeStep === steps.length ? (
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
                        {alerta && (
                          <Alert severity="success" style={{ width: "100%" }}>
                            {msg}
                          </Alert>
                        )}
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ color: "white" }}
                          onClick={Registrar}
                          className={classes.button}
                        >
                          Enviar
                        </Button>
                      </>
                    ) : (
                      <>
                        {/* {alerta1 && (
                        <Alert severity="error" style={{ width: "100%" }}>
                          {mensaje1}
                        </Alert>
                      )} */}
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
              )
            ) : activeStep === steps1.length ? (
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
                  {activeStep === steps1.length - 1 ? (
                    <>
                      {alerta && (
                        <Alert severity="success" style={{ width: "100%" }}>
                          {msg}
                        </Alert>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ color: "white" }}
                        onClick={Registrar}
                        className={classes.button}
                      >
                        Enviar
                      </Button>
                    </>
                  ) : (
                    <>
                      {/* {alerta1 && (
                        <Alert severity="error" style={{ width: "100%" }}>
                          {mensaje1}
                        </Alert>
                      )} */}
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

Crear.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  locatario: PropTypes.array,
  rol: PropTypes.string,
};

export default Crear;
