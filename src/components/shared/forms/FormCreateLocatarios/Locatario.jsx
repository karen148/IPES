import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useSelector } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcCallIcon from "@material-ui/icons/AddIcCall";
// import classes from "*.module.css";
import PropTypes from "prop-types";
import useStyles from "../style";

const Locatario = ({
  si,
  cedula,
  setCedula,
  local,
  setLocal,
  nombre,
  setNombre,
  apellido,
  setApellido,
  telefonos,
  setTelefonos,
  email,
  setEmail,
}) => {
  const { locatarios } = useSelector((state) => state.locatario);

  const [disabled, setHabilitar] = useState(false);
  console.log(disabled);
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

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Ingresar la información del Locatario
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          {disabled ? (
            <label style={{ color: "red" }}>Nombre del establecimiento*</label>
          ) : (
            <label>Nombre del establecimiento*</label>
          )}
          {si === "no"
            ? locatarios?.map((option) => {
                return (
                  option?.local === local && (
                    <>
                      <Alert severity="error" className={classes.alerta}>
                        El establecimiento ya existe
                      </Alert>
                      {setHabilitar(true)}
                    </>
                  )
                );
              })
            : setHabilitar(false)}
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            disabled={disabled}
            options={locatarios?.map((option) => option?.local)}
            inputValue={local}
            onInputChange={(event, newInputValue) => {
              setLocal(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                type="text"
                margin="normal"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          {disabled ? (
            <label style={{ color: "red" }}>Cédula*</label>
          ) : (
            <label>Cédula*</label>
          )}
          {si === "no"
            ? locatarios?.map((option) => {
                return (
                  option?.cedula === cedula && (
                    <>
                      <Alert severity="error" className={classes.alerta}>
                        El locatario ya esxiste
                      </Alert>
                      {setHabilitar(true)}
                    </>
                  )
                );
              })
            : setHabilitar(false)}
          <TextField
            margin="normal"
            variant="outlined"
            type="text"
            value={cedula}
            name="cedula"
            disabled={disabled}
            onChange={(e) => setCedula(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {disabled ? (
            <label style={{ color: "red" }}>Nombre*</label>
          ) : (
            <label>Nombre*</label>
          )}
          <TextField
            margin="normal"
            variant="outlined"
            type="text"
            value={nombre}
            name="nombre"
            disabled={disabled}
            onChange={(e) => setNombre(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {disabled ? (
            <label style={{ color: "red" }}>Apellido*</label>
          ) : (
            <label>Apellido*</label>
          )}
          <TextField
            margin="normal"
            variant="outlined"
            type="text"
            value={apellido}
            disabled={disabled}
            name="apellido"
            onChange={(e) => setApellido(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          {disabled ? (
            <label style={{ color: "red" }}>Teléfonos</label>
          ) : (
            <label>Teléfonos</label>
          )}
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
                    disabled={disabled}
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
          {disabled ? (
            <label style={{ color: "red" }}>Correo electrónico*</label>
          ) : (
            <label>Correo electrónico*</label>
          )}
          {si === "no"
            ? locatarios?.map((option) => {
                return (
                  option?.email === email && (
                    <>
                      <Alert severity="error" className={classes.alerta}>
                        El correo electrónico ya existe
                      </Alert>
                      {setHabilitar(true)}
                    </>
                  )
                );
              })
            : setHabilitar(false)}
          <TextField
            margin="normal"
            variant="outlined"
            type="text"
            value={email}
            disabled={disabled}
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
  nombre: PropTypes.string,
  setNombre: PropTypes.func,
  apellido: PropTypes.string,
  setApellido: PropTypes.func,
  telefonos: PropTypes.array,
  setTelefonos: PropTypes.func,
  email: PropTypes.string,
  setEmail: PropTypes.func,
};

export default Locatario;
