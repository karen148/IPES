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

const Plaza = ({
  si,
  plaza,
  setPlaza,
  direccion,
  setDireccion,
  localidad,
  setLocalidad,
  funcionario,
  setFuncionarios,
  telefonos,
  setTelefonos,
  email,
  setEmail,
}) => {
  const { plazastrues, funcionarios, plazas, localidades } = useSelector(
    (state) => state.plaza
  );

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
        Ingresar la información de la Plaza
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          {disabled ? (
            <label style={{ color: "red" }}>Nombre de la plaza*</label>
          ) : (
            <label>Nombre de la plaza*</label>
          )}
          {si === "no"
            ? plazastrues?.map((option) => {
                return (
                  option?.nombre === plaza && (
                    <>
                      <Alert severity="error" className={classes.alerta}>
                        La plaza de mercado ya existe
                      </Alert>
                      {setHabilitar(true)}
                    </>
                  )
                );
              })
            : setHabilitar(false)}
          {plazas?.map((option) => {
            return (
              option?.nombre === plaza &&
              option?.activo === false && (
                <Alert severity="error" className={classes.alerta}>
                  La plaza de mercado ya existe, pero esta en estado inactivo
                  por favor comunicarse con el personal de desarrollo para que
                  la activen.
                </Alert>
              )
            );
          })}
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={plazastrues?.map((option) => option?.nombre)}
            inputValue={plaza}
            onInputChange={(event, newInputValue) => {
              setPlaza(newInputValue);
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
          <label>Dirección*</label>
          <TextField
            margin="normal"
            variant="outlined"
            type="text"
            value={direccion}
            name="direccion"
            onChange={(e) => setDireccion(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <label>Localidad*</label>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={localidades?.map((option) => option?.label)}
            inputValue={localidad}
            onInputChange={(event, newInputValue) => {
              setLocalidad(newInputValue);
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
          <label>Funcionarios*</label>
          <Autocomplete
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            value={funcionario}
            onChange={(event, newValue) => {
              setFuncionarios(newValue);
            }}
            options={funcionarios}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                type="text"
                margin="normal"
              />
            )}
          />
        </Grid>
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

Plaza.propTypes = {
  si: PropTypes.string,
  plaza: PropTypes.string,
  setPlaza: PropTypes.func,
  direccion: PropTypes.string,
  setDireccion: PropTypes.func,
  localidad: PropTypes.string,
  setLocalidad: PropTypes.func,
  funcionario: PropTypes.array,
  setFuncionarios: PropTypes.func,
  telefonos: PropTypes.array,
  setTelefonos: PropTypes.func,
  email: PropTypes.string,
  setEmail: PropTypes.func,
};

export default Plaza;
