import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateCategoria } from "actions/categoria";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

const Categoria = ({ idCategoria, nombre, slug, descripcion }) => {
  const dispatch = useDispatch();

  const { msg } = useSelector((state) => state.categoria);

  const [nombre1, setNombre1] = useState("");
  const [alerta, setAlerta] = useState(false);
  const [slug1, setSlug1] = useState("");
  const [descripcion1, setDescripcion1] = useState("");

  useEffect(() => {
    if (nombre) {
      setNombre1(nombre);
      setSlug1(slug);
      setDescripcion1(descripcion);
    }
  }, [nombre, slug, descripcion]);

  const ActualizarCategoria = () => {
    dispatch(UpdateCategoria(nombre1, slug1, descripcion1, idCategoria));
    setAlerta(true);
    setTimeout(() => {
      setAlerta(false);
    }, 3000);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Actualizar información de la categoría
      </Typography>
      <br></br>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={6} sm={6}>
          <label>Nombre de la categoría</label>
          <TextField
            id="outlined-size-normal"
            margin="normal"
            type="text"
            variant="outlined"
            value={nombre1}
            name="nombre"
            onChange={(e) => setNombre1(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <label>Slug</label>
          <TextField
            id="outlined-size-normal"
            margin="normal"
            type="text"
            variant="outlined"
            value={slug1}
            name="slug"
            onChange={(e) => setSlug1(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <label>Descripción de la categoría</label>
          <TextareaAutosize
            id="outlined-size-normal"
            aria-label="minimum height"
            variant="outlined"
            value={descripcion1}
            onChange={(e) => setDescripcion1(e.target.value)}
            fullWidth
            style={{ width: "100%", height: " 100px" }}
          />
        </Grid>
        <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
          {alerta && (
            <Alert severity="success" style={{ marginBottom: "10px" }}>
              {msg}
            </Alert>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={ActualizarCategoria}
            style={{ color: "white" }}
          >
            Actualizar
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Categoria.propTypes = {
  idCategoria: PropTypes.number,
  nombre: PropTypes.string,
  slug: PropTypes.string,
  descripcion: PropTypes.string,
};

export default Categoria;
