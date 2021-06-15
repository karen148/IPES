import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import { useSelector } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import PropTypes from "prop-types";

const Producto = ({
  locatario,
  plaza,
  setPlaza,
  nombre,
  setNombre,
  descripcion,
  setDescripion,
  sku,
  setSku,
  unidad,
  setUnidad,
  cantidad,
  setCantidad,
  existe,
  setExiste,
  promocion,
  setPromocion,
  precio,
  setPrecio,
  rebaja,
  setRebaja,
}) => {
  const { plazastrues } = useSelector((state) => state.plaza);
  const { productos } = useSelector((state) => state.producto);
  const { rol } = useSelector((state) => state.auth);
  const uni = [
    {
      value: "Libras",
      label: "Libras",
    },
    {
      value: "Kilo",
      label: "Kilo",
    },
    {
      value: "Pesa",
      label: "Pesa",
    },
    {
      value: "Unidad",
      label: "Unidad",
    },
    {
      value: "Metro",
      label: "Metro",
    },
    {
      value: "Centimetros",
      label: "Centimetros",
    },
  ];
  let producto = [];
  if (rol === "ADMIN_LOCATARIO") {
    productos.map((item) => {
      for (let index = 0; index < item.plaza.length; index++) {
        const element = item.plaza[index];
        if (element === locatario?.plaza_id) {
          producto.push(item);
        }
      }
    });
  }
  console.log(promocion);
  console.log(existe);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Ingresar la información del producto
      </Typography>
      <Grid container spacing={3}>
        {rol === "SUPER_ADMIN" ? (
          plazastrues.length !== 0 ? (
            <Grid item xs={12} sm={12}>
              <label>Plaza</label>
              <Autocomplete
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                options={plazastrues}
                getOptionLabel={(option) => option?.nombre}
                value={plaza}
                onChange={(event, newValue) => {
                  setPlaza(newValue);
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
          ) : (
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: "2%", marginTop: "10px" }}
            >
              No hay plazas registradas
            </Typography>
          )
        ) : (
          <Typography
            variant="subtitle1"
            gutterBottom
            style={{ marginLeft: "2%", marginTop: "10px" }}
          >
            {plazastrues.length !== 0
              ? `Productos de la plaza ${
                  plazastrues.filter((pla) => pla.id === locatario?.plaza_id)[0]
                    ?.nombre
                }`
              : "No hay plazas registradas"}
          </Typography>
        )}
        {rol === "SUPER_ADMIN" ? (
          <Grid item xs={12}>
            <label>Nombre del producto</label>
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
        ) : producto.length !== 0 ? (
          <Grid item xs={12} sm={12}>
            <label>Producto</label>
            <Autocomplete
              limitTags={2}
              id="auto-select"
              autoSelect
              options={producto}
              getOptionLabel={(option) => option?.nombre}
              value={plaza}
              onChange={(event, newValue) => {
                setPlaza(newValue);
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
        ) : (
          <Typography
            variant="subtitle1"
            gutterBottom
            style={{ marginLeft: "2%", marginTop: "10px" }}
          >
            No hay plazas registradas
          </Typography>
        )}
        {rol === "ADMIN_LOCATARIO" && (
          <>
            <Grid item xs={12} sm={6}>
              <label>Unidades</label>
              <Autocomplete
                limitTags={2}
                id="auto-select"
                autoSelect
                options={uni}
                name="unidad"
                getOptionLabel={(option) => option?.label}
                inputValue={unidad}
                onInputChange={(event, newInputValue) => {
                  setUnidad(newInputValue);
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
            <Grid item xs={12} sm={6}>
              <label>Cantidad por unidad</label>
              <TextField
                margin="normal"
                variant="outlined"
                type="text"
                value={cantidad}
                name="sku"
                onChange={(e) => setCantidad(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>Si existe el producto</label>
              <br></br>
              No
              <Switch
                checked={existe}
                onChange={(e) => setExiste(e.target.checked)}
                name="existe"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
              Si
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>Promoción</label>
              <br></br>
              No
              <Switch
                checked={promocion}
                onChange={(e) => setPromocion(e.target.checked)}
                name="promocion"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
              Si
            </Grid>
            {promocion ? (
              <>
                <Grid item xs={12} sm={6}>
                  <label>Precio</label>
                  <TextField
                    margin="normal"
                    variant="outlined"
                    type="number"
                    value={precio}
                    name="precio"
                    onChange={(e) => setPrecio(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label>Precio con rebaja</label>
                  <TextField
                    margin="normal"
                    variant="outlined"
                    type="number"
                    value={rebaja}
                    name="rebaja"
                    onChange={(e) => setRebaja(e.target.value)}
                    fullWidth
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} sm={12}>
                  <label>Precio</label>
                  <TextField
                    margin="normal"
                    variant="outlined"
                    type="number"
                    value={precio}
                    name="precio"
                    onChange={(e) => setPrecio(e.target.value)}
                    fullWidth
                  />
                </Grid>
              </>
            )}
          </>
        )}
        <Grid item xs={12}>
          <label>SKU</label>
          <TextField
            margin="normal"
            variant="outlined"
            type="text"
            value={sku}
            name="sku"
            onChange={(e) => setSku(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <label>Descripción del producto</label>
          <TextareaAutosize
            aria-label="minimum height"
            variant="outlined"
            value={descripcion}
            onChange={(e) => setDescripion(e.target.value)}
            fullWidth
            style={{ width: "100%", height: " 100px" }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Producto.propTypes = {
  locatario: PropTypes.array,
  plaza: PropTypes.array,
  setPlaza: PropTypes.func,
  nombre: PropTypes.string,
  setNombre: PropTypes.func,
  descripcion: PropTypes.string,
  setDescripion: PropTypes.func,
  sku: PropTypes.string,
  setSku: PropTypes.func,
  unidad: PropTypes.string,
  setUnidad: PropTypes.func,
  cantidad: PropTypes.number,
  setCantidad: PropTypes.func,
  existe: PropTypes.bool,
  setExiste: PropTypes.func,
  promocion: PropTypes.bool,
  setPromocion: PropTypes.func,
  precio: PropTypes.number,
  setPrecio: PropTypes.func,
  rebaja: PropTypes.number,
  setRebaja: PropTypes.func,
};

export default Producto;
