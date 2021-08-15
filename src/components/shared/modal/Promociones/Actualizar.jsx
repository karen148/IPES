import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Img } from "actions/imagen";
import { UpdatePromocion, UpdateImagen } from "actions/promociones";

import Promociones from "components/shared/forms/FormPromociones/Promociones";
import Imagen from "components/shared/forms/FormPromociones/Imagen";

import ModalForm from "./../modalForm";
import CssBaseline from "@material-ui/core/CssBaseline";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import useStyles from "components/shared/forms/style";

const Actualizar = ({
  open,
  handleClose,
  id,
  plaza1,
  productos1,
  categorias1,
  imagen1,
}) => {
  const { categorias, plazastrues } = useSelector((state) => state.plaza);
  const { productos } = useSelector((state) => state.producto);
  const dispatch = useDispatch();

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [msg1, setMsg1] = useState({ tipo: "", msg: "" });

  const steps = ["Promoción", "Imagen"];

  const [plaza, setPlaza] = useState([]);
  const [producto, setProducto] = useState([]);
  const [categorias2, setCategorias] = useState([]);

  const [img, setImg] = useState(null);
  const [img1, setImg1] = useState(null);

  useEffect(() => {
    const Actual = () => {
      if (id) {
        let plaza = [];
        let producto = [];
        let categoria = [];
        for (let index = 0; index < plaza1.length; index++) {
          const element = plaza1[index];
          plazastrues.map((pla) => {
            if (element === pla.id) {
              plaza.push(pla);
            }
          });
        }
        setPlaza(plaza);
        for (let index = 0; index < productos1.length; index++) {
          const element = productos1[index];
          productos.map((pro) => {
            if (element === pro.id) {
              producto.push(pro);
            }
          });
        }
        setProducto(producto);
        for (let index = 0; index < categorias1.length; index++) {
          const element = categorias1[index];
          categorias.map((pro) => {
            if (element === pro.id) {
              categoria.push(pro);
            }
          });
        }
        setCategorias(categoria);
        Img(`PROMOCIONES/img/${id}/${imagen1}`, setImg1, imagen1);
      }
    };
    Actual();
  }, [id]);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
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
            categoria={categorias2}
            setCategorias={setCategorias}
          />
        );
      case 1:
        return <Imagen setImg={setImg} img1={img1} setImg1={setImg1} />;
      default:
        throw new Error("Error");
    }
  }

  const ActualizarPromocion = () => {
    dispatch(UpdatePromocion(id, plaza, producto, categorias2, setMsg1));
    setTimeout(() => {
      setMsg1({ tipo: "", msg: "Actualizar Locatario" });
    }, 3000);
  };

  const ActualizarImagen = () => {
    dispatch(UpdateImagen(img, imagen1, id, setMsg1));
  };

  const Limpiar = () => {
    setActiveStep(0);
  };

  return (
    <ModalForm
      open={open}
      handleClose={handleClose}
      title={msg1.msg}
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
                  {msg1.msg}
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
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ color: "white" }}
                        onClick={ActualizarPromocion}
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
  id: PropTypes.string,
  plaza1: PropTypes.array,
  productos1: PropTypes.array,
  categorias1: PropTypes.array,
  imagen1: PropTypes.string,
};

export default Actualizar;
