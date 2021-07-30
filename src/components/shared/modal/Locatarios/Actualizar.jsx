import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ModalForm from "./../modalForm";
import CssBaseline from "@material-ui/core/CssBaseline";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Locatario from "components/shared/forms/FormCreateLocatarios/Locatario";
import Horarios from "components/shared/forms/FormCreateLocatarios/horarios";
import Imagen from "components/shared/forms/FormCreateLocatarios/Imagen";
import Plaza from "components/shared/forms/FormCreateLocatarios/Plaza";
import PropTypes from "prop-types";
import useStyles from "components/shared/forms/style";
import { UpdateLocatarios } from "actions/locatarios";
import { UpdateImagen } from "actions/locatarios";
import { UpdateLogo } from "actions/locatarios";
import { Img } from "actions/imagen";

const Actualizar = ({
  open,
  handleClose,
  idLocatario,
  loc1,
  ced1,
  nom1,
  // ape1,
  email1,
  telefonos1,
  plaza1,
  categorias1,
  horarios2,
  imagen2,
  logo2,
  numero_local,
  productos1,
  locatarios,
}) => {
  const { msg } = useSelector((state) => state.locatario);
  const { plazastrues, categorias } = useSelector((state) => state.plaza);
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

  const [horario_m1, setHorariom1] = useState([
    {
      name: "Todos los días",
      inicio: "",
      finalizar: "",
    },
  ]);

  const [cedula, setCedula] = useState("");
  const [local4, setLocalNombre] = useState("");
  const [numerolocal, setnumeroLocal] = useState([{ local1: "" }]);
  const [nombre, setNombre] = useState("");
  // const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefonos, setTelefonos] = useState([{ telefono: "" }]);
  const [alerta, setAlerta] = useState("Actualizar Locatario");

  const [plaza, setPlaza] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cat, setCat] = useState([]);

  console.log(productos1);
  useEffect(() => {
    const Actual = () => {
      if (ced1) {
        let horario = [];
        horarios2?.forEach((element) => {
          horario.push(JSON.parse(element.split("/")));
        });
        setHorariom1(horario);
        setCedula(ced1);
        setLocalNombre(loc1?.trim());
        console.log(setLocalNombre);
        console.log(loc1?.trim());
        setNombre(nom1);
        setEmail(email1);

        let telefonos2 = [];
        if (telefonos1) {
          if (telefonos1.length > 0) {
            for (let h = 0; h < telefonos1.length; h++) {
              telefonos2.push({ telefono: telefonos1[h] });
              setTelefonos(telefonos2);
            }
          } else {
            telefonos2.push({ telefeno: "" });
            setTelefonos(telefonos2);
          }
        }

        let numero = [];
        if (numero_local) {
          for (let h = 0; h < numero_local.length; h++) {
            numero.push({ local1: numero_local[h] });
          }
        }
        setnumeroLocal(numero);

        setPlaza(
          plazastrues?.length > 0 &&
            plazastrues?.filter((item) => item?.id === plaza1)[0]?.id
        );

        let data = [];
        if (categorias1 !== null && categorias1?.length > 0) {
          for (let index = 0; index < categorias1?.length; index++) {
            const element = categorias1[index];
            categorias?.map((item) => {
              if (item?.id === element) {
                data.push(item);
              }
            });
          }
        }
        setCat(data);

        Img(`LOCATARIO/img/${idLocatario}/${imagen2}`, setImg1, imagen2);
        Img(`LOCATARIO/logo/${idLocatario}/${logo2}`, setImg3, logo2);
      }
    };
    Actual();
  }, [
    loc1,
    ced1,
    // nom1,
    // ape1,
    // email1,
    // telefonos1,
    // plaza1,
    // categorias1,
    // horarios2,
    // imagen2,
    // logo2,
    // numero_local,
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

  console.log(cat);
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
          <Locatario
            si="si"
            cedula={cedula}
            setCedula={setCedula}
            local={local4}
            setLocal={setLocalNombre}
            numerolocal={numerolocal}
            setnumeroLocal={setnumeroLocal}
            nombre={nombre}
            setNombre={setNombre}
            // apellido={apellido}
            // setApellido={setApellido}
            telefonos={telefonos}
            setTelefonos={setTelefonos}
            email={email}
            setEmail={setEmail}
            locatarios={locatarios}
          />
        );
      case 1:
        return (
          <Plaza
            local={local4}
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
            local={local4}
            horario_m1={horario_m1}
            setHorariom1={setHorariom1}
          />
        );
      case 3:
        return (
          <Imagen
            local={local4}
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
  console.log(img1);
  const ActualizarLocatario = () => {
    dispatch(
      UpdateLocatarios(
        horario_m1,
        cedula,
        local4,
        numerolocal,
        nombre,
        // apellido,
        email,
        telefonos,
        plaza,
        cat,
        productos,
        id,
        idLocatario
      )
    );
    setAlerta(msg);
    setTimeout(() => {
      setAlerta("Actualizar Locatario");
    }, 3000);
  };
  console.log(imagen2);
  const ActualizarImagen = () => {
    dispatch(UpdateImagen(img, imagen2, idLocatario));
    console.log(imagen2);
    setAlerta(msg);
    setTimeout(() => {
      setAlerta("Actualizar Locatario");
    }, 3000);
  };

  const ActualizarLogo = () => {
    dispatch(UpdateLogo(img2, logo2, idLocatario));
    setAlerta(msg);
    setTimeout(() => {
      setAlerta("Actualizar Locatario");
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
                      {validarEmail(email) && (
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ color: "white" }}
                          onClick={ActualizarLocatario}
                          className={classes.button}
                        >
                          Actualizar información
                        </Button>
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

Actualizar.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  idLocatario: PropTypes.string,
  nom1: PropTypes.string,
  // ape1: PropTypes.string,
  loc1: PropTypes.string,
  ced1: PropTypes.string,
  email1: PropTypes.string,
  plaza1: PropTypes.string,
  imagen2: PropTypes.string,
  locali: PropTypes.string,
  categorias1: PropTypes.array,
  horarios2: PropTypes.array,
  telefonos1: PropTypes.array,
  logo2: PropTypes.string,
  numero_local: PropTypes.array,
  productos1: PropTypes.array,
  locatarios: PropTypes.array,
};

export default Actualizar;
