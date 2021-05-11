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
import Locatario from "components/shared/forms/FormCreateLocatarios/Locatario";
import Horarios from "components/shared/forms/FormCreateLocatarios/horarios";
import Imagen from "components/shared/forms/FormCreateLocatarios/Imagen";
import Plaza from "components/shared/forms/FormCreateLocatarios/Plaza";
import { useDispatch, useSelector } from "react-redux";
import { setLocatarios } from "actions/locatarios";

const Crear = ({ open, handleClose, locatarios }) => {
  const { msg } = useSelector((state) => state.locatario);
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ["Locatario", "Plaza", "Horarios", "Imagen"];

  const [imglogo, setImgLogo] = useState("img");
  const [img, setImg] = useState(null);
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [img3, setImg3] = useState(null);

  const [horario_m1, setHorariom1] = useState("");
  const [horario_m2, setHorariom2] = useState("");
  const [horario_lm1, setHorariolm1] = useState("");
  const [horario_lm2, setHorariolm2] = useState("");
  const [horario_mm1, setHorariomm1] = useState("");
  const [horario_mm2, setHorariomm2] = useState("");
  const [horario_jm1, setHorariojm1] = useState("");
  const [horario_jm2, setHorariojm2] = useState("");
  const [horario_vm1, setHorariovm1] = useState("");
  const [horario_vm2, setHorariovm2] = useState("");
  const [horario_sm1, setHorariosm1] = useState("");
  const [horario_sm2, setHorariosm2] = useState("");
  const [horario_dm1, setHorariodm1] = useState("");
  const [horario_dm2, setHorariodm2] = useState("");

  const [cedula, setCedula] = useState("");
  const [local, setLocal] = useState("");
  const [numerolocal, setnumeroLocal] = useState([{ local1: "" }]);
  const [nombre, setNombre] = useState("");
  // const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefonos, setTelefonos] = useState([{ telefono: "" }]);
  const [mensaje, setMensaje] = useState("");
  const [alerta1, setAlerta1] = useState(false);
  const [alerta, setAlerta] = useState(false);

  const [plaza, setPlaza] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cat, setCat] = useState([]);

  const validarEmail = (email) => {
    if (email === "") {
      return true;
    } else if (
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(email)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const verficarDatos = (cedula, email) => {
    let ced = locatarios.filter((item) => item.cedula === cedula)[0]?.cedula;
    let correo = locatarios.filter((item) => item.cedula === email)[0]?.email;
    if (ced === cedula || correo === email) {
      return false;
    } else {
      return true;
    }
  };

  const handleNext = () => {
    if (validarEmail(email)) {
      if (local && cedula && nombre) {
        if (verficarDatos(cedula, email)) {
          setActiveStep(activeStep + 1);
        } else {
          setAlerta1(true);
          setMensaje("El usuario ya existe");
          setTimeout(() => {
            setAlerta1(false);
          }, 3000);
        }
      } else {
        setAlerta1(true);
        setMensaje("Faltan datos en el formulario");
        setTimeout(() => {
          setAlerta1(false);
        }, 3000);
      }
    } else {
      setAlerta1(true);
      setMensaje("El correo electrónico no es valido");
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
          <Locatario
            si="no"
            cedula={cedula}
            setCedula={setCedula}
            local={local}
            setLocal={setLocal}
            numerolocal={numerolocal}
            setnumeroLocal={setnumeroLocal}
            nombre={nombre}
            setNombre={setNombre}
            telefonos={telefonos}
            setTelefonos={setTelefonos}
            email={email}
            setEmail={setEmail}
          />
        );
      case 1:
        return (
          <Plaza
            local={local}
            cat={cat}
            setCat={setCat}
            plaza={plaza}
            setPlaza={setPlaza}
            productos={productos}
            setProductos={setProductos}
          />
        );
      case 2:
        return (
          <Horarios
            local={local}
            horario_m1={horario_m1}
            setHorariom1={setHorariom1}
            horario_m2={horario_m2}
            setHorariom2={setHorariom2}
            horario_lm1={horario_lm1}
            setHorariolm1={setHorariolm1}
            horario_lm2={horario_lm2}
            setHorariolm2={setHorariolm2}
            horario_mm1={horario_mm1}
            setHorariomm1={setHorariomm1}
            horario_mm2={horario_mm2}
            setHorariomm2={setHorariomm2}
            horario_jm1={horario_jm1}
            setHorariojm1={setHorariojm1}
            horario_jm2={horario_jm2}
            setHorariojm2={setHorariojm2}
            horario_vm1={horario_vm1}
            setHorariovm1={setHorariovm1}
            horario_vm2={horario_vm2}
            setHorariovm2={setHorariovm2}
            horario_sm1={horario_sm1}
            setHorariosm1={setHorariosm1}
            horario_sm2={horario_sm2}
            setHorariosm2={setHorariosm2}
            horario_dm1={horario_dm1}
            setHorariodm1={setHorariodm1}
            horario_dm2={horario_dm2}
            setHorariodm2={setHorariodm2}
          />
        );
      case 3:
        return (
          <Imagen
            local={local}
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
    dispatch(
      setLocatarios(
        horario_m1,
        horario_m2,
        horario_lm1,
        horario_lm2,
        horario_mm1,
        horario_mm2,
        horario_jm1,
        horario_jm2,
        horario_vm1,
        horario_vm2,
        horario_sm1,
        horario_sm2,
        horario_dm1,
        horario_dm2,
        img,
        img2,
        cedula,
        local,
        numerolocal,
        nombre,
        // apellido,
        email,
        telefonos,
        plaza,
        cat,
        productos,
        id
      )
    );
    setAlerta(true);
    setTimeout(() => {
      setAlerta(false);
    }, 3000);
  };

  const Limpiar = () => {
    setImg(null);
    setImg1(null);
    setImg2(null);
    setImg3(null);
    setHorariom1("");
    setHorariom2("");
    setHorariolm1("");
    setHorariolm2("");
    setHorariomm1("");
    setHorariomm2("");
    setHorariojm1("");
    setHorariojm2("");
    setHorariovm1("");
    setHorariovm2("");
    setHorariosm1("");
    setHorariosm2("");
    setHorariodm1("");
    setHorariodm2("");
    setPlaza("");
    setTelefonos([{ telefono: "" }]);
    setEmail("");
  };
  return (
    <ModalForm
      open={open}
      handleClose={handleClose}
      title="Crear Locatario"
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
                          style={{ marginBottom: "10px" }}
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
                    </>
                  ) : (
                    <>
                      {alerta1 && (
                        <Alert severity="error" style={{ width: "100%" }}>
                          {mensaje}
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
  locatarios: PropTypes.array,
};

export default Crear;
