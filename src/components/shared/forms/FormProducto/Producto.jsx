import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import { useSelector } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PropTypes from "prop-types";
import Alert from "@material-ui/lab/Alert";

const Producto = ({
  rol,
  locatario,
  plaza,
  setPlaza,
  nombre,
  setNombre,
  sku,
  setSku,
  unidad,
  setUnidad,
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
      if (item.plaza) {
        for (let index = 0; index < item.plaza.length; index++) {
          const element = item.plaza[index];
          if (element === locatario?.plaza_id) {
            producto.push(item);
          }
        }
      }
    });
    setSku(plaza?.sku);
    if (!existe) {
      setPromocion(false);
      setRebaja(0);
    }
    if (!promocion) {
      setRebaja(0);
    }
  }
  console.log(rebaja);
  console.log(precio);
  console.log(uni);
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
              options={productos}
              getOptionLabel={(option) =>
                option?.nombre ? option?.nombre : ""
              }
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
            <Grid item xs={12} sm={12}>
              <label>Unidades</label>
              <TextField
                margin="normal"
                variant="outlined"
                type="text"
                value={plaza?.unidad}
                name="unidad"
                fullWidth
                disabled
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
                {precio < rebaja && (
                  <Grid item xs={12} sm={12}>
                    <Alert severity="warning">
                      El precio del producto debe ser mayor al precio con rebaja
                    </Alert>
                  </Grid>
                )}
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
            <Grid item xs={12}>
              <label>SKU</label>
              <TextField
                margin="normal"
                variant="outlined"
                type="text"
                value={plaza?.sku}
                name="sku"
                fullWidth
                disabled
              />
            </Grid>
          </>
        )}
        {rol === "SUPER_ADMIN" && (
          <>
            {sku && (
              <Grid item xs={12} sm={6}>
                <label>SKU</label>
                <TextField
                  margin="normal"
                  variant="outlined"
                  type="text"
                  value={sku}
                  name="sku"
                  disabled
                  onChange={(e) => setSku(e.target.value)}
                  fullWidth
                />
              </Grid>
            )}
            <Grid item xs={12} sm={12}>
              <label>Unidades</label>
              <TextField
                margin="normal"
                variant="outlined"
                type="text"
                value={unidad}
                name="unidad"
                onChange={(e) => setUnidad(e.target.value)}
                fullWidth
              />
            </Grid>
          </>
        )}
      </Grid>
    </React.Fragment>
  );
};

Producto.propTypes = {
  rol: PropTypes.string,
  locatario: PropTypes.array,
  plaza: PropTypes.array,
  setPlaza: PropTypes.func,
  nombre: PropTypes.string,
  setNombre: PropTypes.func,
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
