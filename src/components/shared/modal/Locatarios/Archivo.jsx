import React, { useState, useEffect } from "react";
import axios from "axios";

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
import { useDispatch, useSelector } from "react-redux";
import ArchivoCSV from "components/shared/forms/FormProducto/ArchivoCSV";
import { ArchivoLocatario } from "actions/locatarios";
import { setPlazasExcel } from "actions/plaza";
import { setLocatariosExcel } from "actions/locatarios";

const Archivo = ({ open, handleClose }) => {
  const { id } = useSelector((state) => state.auth);
  const { msg } = useSelector((state) => state.locatario);
  const { plazastrues } = useSelector((state) => state.plaza);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Archivo"];

  const [hojas, setHojas] = useState([]);
  const [alerta, setAlerta] = useState(false);
  const [msg1, setMsg] = useState("");

  useEffect(() => {
    console.log("buenas");
    hojas.map((item) => {
      let local = [];
      let telefonos = [];
      var expresionRegular = /\s*-\s*/;
      let plaza = plazastrues.filter(
        (pla) =>
          pla.nombre.trim().toLowerCase() === item.plaza.trim().toLowerCase()
      )[0];
      item.data.map((dat) => {
        for (const iterator of dat["NUMERO DEL LOCAL"].split(
          expresionRegular
        )) {
          local.push(iterator);
        }
        for (const iterator of dat["TELEFONOS DE DOMICILIOS"].split(
          expresionRegular
        )) {
          telefonos.push(iterator);
        }
        if (plaza) {
          console.log("crear locatario");
          console.log(dat["NUMERO DEL LOCAL"].length);
          dispatch(
            setLocatariosExcel(
              dat["NUMERO DE CEDULA"]?.toString(),
              dat["NOMBRE DEL COMERCIANTE"]?.toString(),
              local,
              dat["NOMBRE DEL LOCAL"]?.toString(),
              telefonos,
              id,
              plaza.id
            )
          );
        } else {
          console.log("crear plaza");
          console.log(dat["NUMERO DEL LOCAL"]?.toString().length);
          dispatch(
            setPlazasExcel(
              item.plaza.toUpperCase(),
              local,
              dat["NUMERO DE CEDULA"]?.toString(),
              dat["NOMBRE DEL COMERCIANTE"]?.toString(),
              telefonos,
              id,
              dat["NOMBRE DEL LOCAL"]?.toString(),
              setMsg
            )
          );
        }
      });
    });
  }, [hojas.length > 0 && hojas]);

  console.log(msg1);

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
            titulo={"Archivo Excel para subir información de los locatarios"}
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

  const ExportarPlantilla = async () => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(
        process.env.REACT_APP_URL_API + "locatarios/descargaPlantilla",
        config
      )
      .then((response) => {
        console.log(response);
        window.open(
          process.env.REACT_APP_URL_API + "locatarios/descargaPlantilla",
          "_self"
        );
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
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
                <Typography variant="h5" gutterBottom>
                  {msg}
                </Typography>
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
