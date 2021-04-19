import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

import Modal from "./../index";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Categoria from "components/shared/forms/FormUpdateCatgory/Categoria";
import Imagen from "components/shared/forms/FormUpdateCatgory/Imagenes";

const Actualizar = ({
  open,
  handleClose,
  idCategoria,
  nombre,
  slug,
  img,
  descripcion,
}) => {
  const useStyles = makeStyles((theme) => ({
    appBar: {
      position: "relative",
    },
    layout: {
      width: "auto",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: "flex",
      justifyContent: "flex-end",
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }));

  const steps = ["Categoría", "Icono"];
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Categoria
            idCategoria={idCategoria}
            nombre={nombre}
            slug={slug}
            descripcion={descripcion}
          />
        );
      case 1:
        return <Imagen idCategoria={idCategoria} img={img} />;
      default:
        throw new Error("Error");
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="Actualizar categoría"
      tamaño="md"
    >
      <Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center"></Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Fragment>
              {activeStep === steps.length ? (
                <Fragment>
                  <Typography variant="h5" gutterBottom>
                    Información enviada exitosamente.
                  </Typography>
                  {/* <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography> */}
                </Fragment>
              ) : (
                <Fragment>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button
                        onClick={handleBack}
                        color="default"
                        className={classes.button}
                      >
                        Regresar
                      </Button>
                    )}
                    {activeStep !== steps.length - 1 && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                        style={{ color: "white" }}
                      >
                        Siguiente
                      </Button>
                    )}
                  </div>
                </Fragment>
              )}
            </Fragment>
          </Paper>
        </main>
      </Fragment>
    </Modal>
  );
};

Actualizar.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  idCategoria: PropTypes.string,
  nombre: PropTypes.string,
  slug: PropTypes.string,
  img: PropTypes.string,
  descripcion: PropTypes.string,
};

export default Actualizar;
