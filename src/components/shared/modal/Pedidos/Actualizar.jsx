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
import { useDispatch } from "react-redux";
import Estado from "components/shared/forms/FormPedidos/Estado";
import { DeletePedido } from "actions/pedidos";
// import { useForm } from "./../../../../hooks/useForm";

const Actualizar = ({ open, handleClose, estado, id }) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ["Estado"];
  const [alerta, setAlerta] = useState("Actualizar pedido");

  const [estados, setEstado] = useState("");

  useEffect(() => {
    setEstado(estado);
  }, [estado]);

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Estado estado={estados} setEstado={setEstado} />;
      default:
        throw new Error("Error");
    }
  }

  const ActualizarProducto = () => {
    dispatch(DeletePedido(id, estados));
    setAlerta("El producto se actualizo");
    setTimeout(() => {
      setAlerta("Actualizar producto");
    }, 4000);
  };

  const Limpiar = () => {
    setActiveStep(0);
    setEstado("");
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
                    <></>
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

Actualizar.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  estado: PropTypes.string,
  id: PropTypes.string,
};

export default Actualizar;
