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
import Plaza from "components/shared/forms/FormCreatePlaza/Plaza";
import Horarios from "components/shared/forms/FormCreatePlaza/horarios";
import Categoria from "components/shared/forms/FormCreatePlaza/categoria";
import Imagen from "components/shared/forms/FormCreatePlaza/Imagen";
import { useDispatch, useSelector } from "react-redux";
import { setPlazasMercado } from "actions/plaza";

const Crear = ({ open, handleClose }) => {
  const { msg, plazastrues } = useSelector((state) => state.plaza);
  const dispatch = useDispatch();

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ["Plaza", "Horarios", "Categoria", "Imagen"];

  const [cat, setCat] = useState([]);

  const [alerta, setAlerta] = useState(false);
  const [alerta1, setAlerta1] = useState(false);
  const [mensaje1, setMensaje1] = useState("");

  const [imglogo, setImgLogo] = useState("img");
  const [img, setImg] = useState(null);
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [img3, setImg3] = useState(null);

  const [horario_m1, setHorariom1] = useState([
    {
      name: "Todos los días",
      inicio: "",
      finalizar: "",
    },
  ]);

  const [plaza, setPlaza] = useState("");
  const [direccion, setDireccion] = useState("");
  const [localidad, setLocalidad] = useState([]);
  const [funcionario, setFuncionarios] = useState([]);
  const [telefonos, setTelefonos] = useState([{ telefono: "" }]);
  const [email, setEmail] = useState("");

  const validarEmail = (email1) => {
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(email1)) {
      return true;
    } else {
      return false;
    }
  };

  console.log(horario_m1);
  const verficarDatos = (plaza1) => {
    let plaz = plazastrues.filter((item) => item.nombre === plaza1)[0]?.nombre;
    if (plaza1 === plaz) {
      return false;
    } else {
      return true;
    }
  };

  const handleNext = () => {
    if (validarEmail(email)) {
      if (plaza && localidad && funcionario) {
        if (verficarDatos(plaza, email)) {
          setActiveStep(activeStep + 1);
        } else {
          setAlerta1(true);
          setMensaje1("La plaza ya existe");
          setTimeout(() => {
            setAlerta1(false);
          }, 3000);
        }
      } else {
        setAlerta1(true);
        setMensaje1("Falta datos en el formulario");
        setTimeout(() => {
          setAlerta1(false);
        }, 3600);
      }
    } else {
      setAlerta1(true);
      setMensaje1("El correo electrónico no es valido");
      setTimeout(() => {
        setAlerta1(false);
      }, 3600);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Plaza
            si="no"
            plaza={plaza}
            setPlaza={setPlaza}
            direccion={direccion}
            setDireccion={setDireccion}
            localidad={localidad}
            setLocalidad={setLocalidad}
            funcionario={funcionario}
            setFuncionarios={setFuncionarios}
            telefonos={telefonos}
            setTelefonos={setTelefonos}
            email={email}
            setEmail={setEmail}
          />
        );

      case 1:
        return (
          <Horarios
            plaza={plaza}
            horario_m1={horario_m1}
            setHorariom1={setHorariom1}
          />
        );

      case 2:
        return <Categoria plaza={plaza} cat={cat} setCat={setCat} />;

      case 3:
        return (
          <Imagen
            plaza={plaza}
            imglogo={imglogo}
            setImgLogo={setImgLogo}
            img={img}
            setImg={setImg}
            img1={img1}
            setImg1={setImg1}
            img2={img2}
            setImg2={setImg2}
            img3={img3}
            setImg3={setImg3}
          />
        );
      default:
        throw new Error("Error");
    }
  };

  const Registrar = () => {
    let horario = [];
    horario_m1.map((item) => {
      Array.prototype.push.apply(horario, [
        { name: item.name, inicio: item.inicio, finalizar: item.finalizar },
      ]);
    });
    let tele = [];
    telefonos.map((item) => {
      Array.prototype.push.apply(tele, [item.telefono]);
    });
    console.log(horario);
    console.log(tele);
    dispatch(
      setPlazasMercado(
        horario_m1,
        telefonos,
        cat,
        funcionario,
        localidad,
        plaza,
        email,
        direccion,
        img,
        img2
      )
    );
    setAlerta(true);
    setTimeout(() => {
      setAlerta(false);
    }, 3000);
  };

  const Limpiar = () => {
    setActiveStep(0);
    setImg(null);
    setImg1(null);
    setImg2(null);
    setImg3(null);
    setHorariom1([
      {
        name: "Todos los días",
        inicio: "",
        finalizar: "",
      },
    ]);
    setPlaza("");
    setDireccion("");
    setLocalidad("");
    setFuncionarios([]);
    setTelefonos([{ telefono: "" }]);
    setEmail("");
  };

  return (
    <ModalForm
      open={open}
      handleClose={handleClose}
      title="Crear plaza"
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
                      {alerta1 && (
                        <Alert severity="error" style={{ width: "100%" }}>
                          {mensaje1}
                        </Alert>
                      )}
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
