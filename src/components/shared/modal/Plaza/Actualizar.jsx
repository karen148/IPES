import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ModalForm from "./../modalForm";
import CssBaseline from "@material-ui/core/CssBaseline";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import useStyles from "components/shared/forms/style";
import Plaza from "components/shared/forms/FormCreatePlaza/Plaza";
import Horarios from "components/shared/forms/FormCreatePlaza/horarios";
import Categoria from "components/shared/forms/FormCreatePlaza/categoria";
import Imagen from "components/shared/forms/FormCreatePlaza/Imagen";
import { UpdatePlazasMercado, UpdateBanner, UpdateLogo } from "actions/plaza";
import { Img } from "actions/imagen";

const Actualizar = ({
  open,
  handleClose,
  idPlaza,
  nombre1,
  direccion1,
  email1,
  imagen,
  locali,
  funcio2,
  cat1,
  horarios1,
  telefonos1,
  logo1,
}) => {
  const { funcionarios, msg, localidades, categorias } = useSelector(
    (state) => state.plaza
  );
  const dispatch = useDispatch();

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ["Plaza", "Horarios", "Categoria", "Imagen"];

  const [cat, setCat] = useState([]);

  const [alerta, setAlerta] = useState("Actualizar plaza");

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

  const [plaza, setPlaza] = useState("");
  const [direccion, setDireccion] = useState("");
  const [localidad, setLocalidad] = useState([]);
  const [funcionario, setFuncionarios] = useState([]);
  const [telefonos, setTelefonos] = useState([{ telefono: "" }]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (nombre1) {
      let semana = [];
      if (horarios1) {
        for (let h = 0; h < horarios1.length; h++) {
          semana.push(horarios1[h].split("-", 2));
        }
      }
      if (semana.length) {
        setHorariom1(semana[0][0]);
        setHorariom2(semana[0][1]);
        setHorariolm1(semana[1][0]);
        setHorariolm2(semana[1][1]);
        if (semana.length > 2) {
          setHorariomm1(semana[2][0]);
          setHorariomm2(semana[2][1]);
          setHorariojm1(semana[3][0]);
          setHorariojm2(semana[3][1]);
          if (semana.length > 3) {
            setHorariovm1(semana[4][0]);
            setHorariovm2(semana[4][1]);
            setHorariosm1(semana[5][0]);
            setHorariosm2(semana[5][1]);
            setHorariodm1(semana[6][0]);
            setHorariodm2(semana[6][1]);
          }
        }
      } else {
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
      }

      let telefonos1 = [];
      if (telefonos1) {
        if (telefonos1.length > 0) {
          for (let h = 0; h < telefonos1.length; h++) {
            telefonos1.push({ telefono: telefonos1[h] });
          }
        } else {
          telefonos1.push({ telefeno: "" });
          setTelefonos(telefonos1);
        }
      }

      let categorias1 = [];
      if (cat1) {
        for (let i = 0; i < cat1.length; i++) {
          const element = cat1[i];
          console.log(cat1[i]);
          categorias.map((item) => {
            if (item.id === element) {
              categorias1.push(item);
            }
          });
        }
      }
      console.log(categorias1);
      console.log(cat1);
      let admin = [];
      if (funcio2 !== null && funcio2.length > 0) {
        for (let i = 0; i <= funcio2.length; i++) {
          const element = funcio2[i];
          funcionarios.map((item) => {
            if (item.id === element) {
              admin.push(item);
            }
          });
        }
      }
      setFuncionarios(admin);
      setPlaza(nombre1);
      setDireccion(direccion1);
      setEmail(email1);

      Img(`PLAZAS/img/${idPlaza}/${imagen}`, setImg1, imagen);
      Img(`PLAZAS/logo/${idPlaza}/${logo1}`, setImg3, logo1);
      setLocalidad(localidades.filter((item) => item.id === locali)[0]);

      setTelefonos(telefonos1);
      setCat(categorias1);
    }
  }, [
    nombre1,
    direccion1,
    email1,
    imagen,
    locali,
    funcio2,
    cat1,
    horarios1,
    telefonos1,
    logo1,
  ]);

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

  const handleNext = () => {
    if (validarEmail(email)) {
      setActiveStep(activeStep + 1);
    } else {
      setAlerta("El correo electrónico no es valido");
      setTimeout(() => {
        setAlerta("Actualizar plaza");
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
            si="si"
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

  const ActualizarLogo = () => {
    dispatch(UpdateLogo(img2, logo1, idPlaza));
    setAlerta(msg);
    setTimeout(() => {
      setAlerta("Actualizar plaza");
    }, 3000);
  };

  const ActualizarImagen = () => {
    dispatch(UpdateBanner(img, imagen, idPlaza));
    setAlerta(msg);
    setTimeout(() => {
      setAlerta("Actualizar plaza");
    }, 3000);
  };

  const ActualizarPlaza = () => {
    dispatch(
      UpdatePlazasMercado(
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
        telefonos,
        cat,
        funcionario,
        localidad,
        plaza,
        email,
        direccion,
        idPlaza
      )
    );
    setAlerta(msg);
    setTimeout(() => {
      setAlerta("Actualizar plaza");
    }, 3000);
  };

  const Limpiar = () => {
    setActiveStep(0);
    setImg2(null);
    setImg(null);
  };
  console.log(img2);
  console.log(img);
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
                      {img && (
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ color: "white" }}
                          onClick={ActualizarImagen}
                          className={classes.button}
                        >
                          Actualizar Imagen
                        </Button>
                      )}
                      {img2 && (
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ color: "white" }}
                          onClick={ActualizarLogo}
                          className={classes.button}
                        >
                          Actualizar Logo
                        </Button>
                      )}
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ color: "white" }}
                        onClick={ActualizarPlaza}
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
  idPlaza: PropTypes.number,
  nombre1: PropTypes.string,
  direccion1: PropTypes.string,
  email1: PropTypes.string,
  imagen: PropTypes.string,
  locali: PropTypes.string,
  funcio2: PropTypes.string,
  cat1: PropTypes.array,
  horarios1: PropTypes.array,
  telefonos1: PropTypes.array,
  logo1: PropTypes.string,
};

export default Actualizar;
