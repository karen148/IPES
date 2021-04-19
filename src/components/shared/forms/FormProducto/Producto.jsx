import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useSelector } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { useForm } from "hooks/useForm";

const Producto = () => {
  const { plazastrues, locatarios } = useSelector((state) => state.plaza);
  const [plaza, setPlaza] = useState("");
  const [locatario, setLocatario] = useState("");

  const [producto, handleProducto] = useForm({
    nombre: "",
    normal: "",
    rebajado: "",
    descripcion: "",
  });

  const { nombre, normal, rebajado, descripcion } = producto;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Ingresar la información del producto
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
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
                label="Plaza"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={locatarios?.map((option) => option?.nombre)}
            inputValue={locatario}
            onInputChange={(event, newInputValue) => {
              setLocatario(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                type="text"
                margin="normal"
                variant="outlined"
                label="Locatario"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            variant="outlined"
            type="text"
            value={nombre}
            name="nombre"
            onChange={handleProducto}
            fullWidth
            label="Nombre del producto"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="normal"
            variant="outlined"
            type="text"
            value={normal}
            name="normal"
            onChange={handleProducto}
            fullWidth
            label="Precio normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="normal"
            variant="outlined"
            type="text"
            value={rebajado}
            name="rebajado"
            onChange={handleProducto}
            fullWidth
            label="Precio de rebaja"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextareaAutosize
            aria-label="minimum height"
            variant="outlined"
            placeholder="Descripción del producto"
            value={descripcion}
            onChange={handleProducto}
            fullWidth
            style={{ width: "100%", height: " 100px" }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Producto;
