import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
import Promociones from "components/shared/forms/FormPromociones/Promociones";
import Imagen from "components/shared/forms/FormPromociones/Imagen";
import { setPromocion } from "actions/promociones";

const Crear = ({ open, handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const steps = ["Promoción", "Imagen"];

  const [activeStep, setActiveStep] = useState(0);
  const [msg, setMsg] = useState(0);

  const [plaza, setPlaza] = useState([]);
  const [producto, setProducto] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [img, setImg] = useState(null);
  const [img1, setImg1] = useState(null);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const Registrar = () => {
    dispatch(setPromocion(plaza, producto, categorias, img, setMsg));
    setTimeout(() => {
      setMsg(0);
    }, 3000);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Promociones
            plaza={plaza}
            setPlaza={setPlaza}
            producto={producto}
            setProducto={setProducto}
            categoria={categorias}
            setCategorias={setCategorias}
          />
        );
      case 1:
        return <Imagen setImg={setImg} img1={img1} setImg1={setImg1} />;
      default:
        throw new Error("Error");
    }
  }

  const Limpiar = () => {
    setPlaza([]);
    setProducto([]);
    setCategorias([]);
    setImg(null);
    setImg1("");
    setActiveStep(0);
  };

  return (
    <ModalForm
      open={open}
      handleClose={handleClose}
      title="Crear Promoción"
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
                      {msg === 1 && (
                        <Alert severity="success" style={{ width: "100%" }}>
                          La información se envio
                        </Alert>
                      )}
                      {msg === 2 && (
                        <Alert severity="success" style={{ width: "100%" }}>
                          Error: No se pudo enviar la información
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
};

export default Crear;
