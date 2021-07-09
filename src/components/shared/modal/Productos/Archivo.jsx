import React, { useState } from "react";
import firebase from "firebase";
import { ArchivoLocatario } from "actions/locatarios";
import { useEffect } from "react";
import { verificarCategorias } from "actions/categoria";
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
import ArchivoCSV from "components/shared/forms/FormProducto/ArchivoCSV";

const Archivo = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Archivo"];

  const [hojas, setHojas] = useState([]);
  const [alerta, setAlerta] = useState(false);
  const [msg1, setMsg] = useState("");

  useEffect(() => {
    if (hojas[0]?.data?.length > 0) {
      console.log(hojas[0].data);
      hojas[0]?.data?.map((item) => {
        dispatch(
          verificarCategorias(
            item["Categoría"].toUpperCase(),
            item["Unidad de Medida"],
            item["Nombre Producto"],
            setMsg
          )
        );
      });
    }
  }, [hojas[0]?.data]);

  console.log(msg1);
  console.log(hojas[0]?.data);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <ArchivoCSV
            hojas={hojas}
            setHojas={setHojas}
            titulo={"Archivo para subir información de los productos"}
          />
        );
      default:
        throw new Error("Error");
    }
  };

  const Registrar = () => {
    dispatch(ArchivoLocatario(hojas));
    setAlerta(true);
    setTimeout(() => {
      setAlerta(false);
    }, 4000);
  };

  const Limpiar = () => {
    setHojas([]);
  };

  console.log(hojas);

  const ExportarPlantilla = async () => {
    var deserTableRowef4 = firebase
      .storage()
      .ref()
      .child(`PLANTILLA/PRODUCTOS/PLANTILLA_PRODCUTO.xlsx`);
    deserTableRowef4.getDownloadURL().then(function (url) {
      window.open(url);
    });
  };

  return (
    <ModalForm
      open={open}
      handleClose={handleClose}
      title="Archivo .xlsx"
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
                      {alerta && (
                        <Alert
                          severity="success"
                          style={{ marginBottom: "10px", width: "100%" }}
                        >
                          {msg1}
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
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ color: "white" }}
                        onClick={ExportarPlantilla}
                        className={classes.button}
                      >
                        Plantilla
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

Archivo.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default Archivo;
