import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcCallIcon from "@material-ui/icons/AddIcCall";
import StoreIcon from "@material-ui/icons/Store";
// import classes from "*.module.css";
import PropTypes from "prop-types";
import useStyles from "../style";

const Locatario = ({
  si,
  cedula,
  setCedula,
  local,
  setLocal,
  numerolocal,
  setnumeroLocal,
  nombre,
  setNombre,
  telefonos,
  setTelefonos,
  email,
  setEmail,
  locatarios,
}) => {
  const classes = useStyles();

  //agregar un telefono
  const handleAddTel = () => {
    setTelefonos([...telefonos, { telefono: "" }]);
  };

  //evento para modificar input
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...telefonos];
    list[index][name] = value;
    setTelefonos(list);
  };

  // evento para remover un hijo
  const handleRemoveClick = (index) => {
    const list = [...telefonos];
    list.splice(index, 1);
    setTelefonos(list);
  };

  //agregar el numero del local
  const handleAddLocal = () => {
    setnumeroLocal([...numerolocal, { local1: "" }]);
  };

  //evento para modificar input
  const handleInputChangeLocal = (e, index) => {
    const { name, value } = e.target;
    const list = [...numerolocal];
    list[index][name] = value;
    setnumeroLocal(list);
  };

  // evento para remover un hijo
  const handleRemoveClickLocal = (index) => {
    const list = [...numerolocal];
    list.splice(index, 1);
    setnumeroLocal(list);
  };

  // let actual = locatarios.filter((item) => item.local !== "");
  // console.log(actual);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Ingresar la información del Locatario
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <label>Nombre del establecimiento*</label>
          <TextField
            margin="normal"
            variant="outlined"
            type="text"
            value={local}
            name="local"
            onChange={(e) => setLocal(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <label>Número del local</label>
          {numerolocal.map((x, i) => {
            return (
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                key={i + 1}
              >
                <Grid item xs={8} sm={8}>
                  <TextField
                    margin="normal"
                    variant="outlined"
                    type="number"
                    value={x.local1}
                    name="local1"
                    onChange={(e) => handleInputChangeLocal(e, i)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4} sm={4} style={{ textAlign: "center" }}>
                  {numerolocal.length !== 1 && (
                    <IconButton
                      onClick={() => handleRemoveClickLocal(i)}
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                  {numerolocal.length - 1 === i && (
                    <IconButton
                      onClick={handleAddLocal}
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <StoreIcon />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        <Grid item xs={12} sm={12}>
          <label>Cédula*</label>
          {si === "no"
            ? locatarios?.map((option) => {
                return (
                  option?.cedula === cedula && (
                    <>
                      <Alert severity="error" className={classes.alerta}>
                        El locatario ya esxiste
                      </Alert>
                    </>
                  )
                );
              })
            : ""}
          <TextField
            margin="normal"
            variant="outlined"
            type="text"
            value={cedula}
            name="cedula"
            onChange={(e) => setCedula(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <label>Nombre Completo*</label>
          <TextField
            margin="normal"
            variant="outlined"
            type="text"
            value={nombre}
            name="nombre"
            onChange={(e) => setNombre(e.target.value)}
            fullWidth
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <label>Apellido*</label>
          <TextField
            margin="normal"
            variant="outlined"
            type="text"
            value={apellido}
            name="apellido"
            onChange={(e) => setApellido(e.target.value)}
            fullWidth
          />
        </Grid> */}
        <Grid item xs={12} sm={12}>
          <label>Teléfonos</label>
          {telefonos.map((x, i) => {
            return (
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                key={i + 1}
              >
                <Grid item xs={8} sm={8}>
                  <TextField
                    margin="normal"
                    variant="outlined"
                    type="text"
                    value={x.telefono}
                    name="telefono"
                    onChange={(e) => handleInputChange(e, i)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4} sm={4} style={{ textAlign: "center" }}>
                  {telefonos.length !== 1 && (
                    <IconButton
                      onClick={() => handleRemoveClick(i)}
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                  {telefonos.length - 1 === i && (
                    <IconButton
                      onClick={handleAddTel}
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <AddIcCallIcon />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        <Grid item xs={12} sm={12}>
          <label>Correo electrónico*</label>
          {si === "no"
            ? locatarios?.map((option) => {
                return (
                  option?.email === email && (
                    <>
                      <Alert severity="error" className={classes.alerta}>
                        El correo electrónico ya existe
                      </Alert>
                    </>
                  )
                );
              })
            : ""}
          <TextField
            margin="normal"
            variant="outlined"
            type="text"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Locatario.propTypes = {
  si: PropTypes.string,
  cedula: PropTypes.string,
  setCedula: PropTypes.func,
  local: PropTypes.string,
  setLocal: PropTypes.func,
  numerolocal: PropTypes.array,
  setnumeroLocal: PropTypes.func,
  nombre: PropTypes.string,
  setNombre: PropTypes.func,
  telefonos: PropTypes.array,
  setTelefonos: PropTypes.func,
  email: PropTypes.string,
  setEmail: PropTypes.func,
  locatarios: PropTypes.array,
};

export default Locatario;
