import React, { useEffect, useState } from "react";
import ContainerDashboard from "./../../components/layaouts/ContainerDashboard";
import CardSaleReport from "./../../components/shared/cards/CardSaleReport";
import HeaderDashboard from "./../../components/shared/headers/HeaderDashboard";
import CardTopCountries from "./../../components/shared/cards/CardTopCountries";
import Alert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { getLocatarioCedula, UpdateLocatariosEmail } from "actions/locatarios";
import Modal from "components/shared/modal";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { getPlazasGanancias, getTrue } from "actions/plaza";
import {
  getTopProductos,
  getLocatariosMasVendidos,
  getLocatariosPlazas,
  getProductosMasVendidos,
  getDomiciliosPlaza,
  getGananciasPlaza,
  getTopProductosLocatarios,
  getGananciaLocatario,
  getDomiciliosLocatario,
} from "actions/balance";
import { Autocomplete } from "@material-ui/lab";

const Tablero = () => {
  const dispatch = useDispatch();
  const { rol, codigo } = useSelector((state) => state.auth);
  const { plazanombres } = useSelector((state) => state.plaza);
  const {
    TopLocatarios,
    TopLocatariosPlazas,
    TopProductos,
    TopProductosPlazas,
    Ganancias,
    Domicilios,
  } = useSelector((state) => state.balance);
  const [locatario, setLocatario] = useState([]);
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [fecha1, setFecha1] = useState("");
  const [fecha2, setFecha2] = useState("");
  const [plaza, setPlaza] = useState([]);
  const [datos, setDatos] = useState([]);
  const [datos1, setDatos1] = useState([]);
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    if (rol === "ADMIN_LOCATARIO") {
      dispatch(getLocatarioCedula(setLocatario, codigo));
    } else if (rol === "SUPER_ADMIN") {
      dispatch(getPlazasGanancias());
      dispatch(getTopProductos());
      dispatch(getTrue());
      dispatch(getLocatariosPlazas());
    }
  }, [dispatch]);

  useEffect(() => {
    if (rol === "ADMIN_LOCATARIO") {
      setOpen(true);
      dispatch(getTopProductosLocatarios(locatario.id));
    }
  }, [locatario.email]);

  const Actualizar = () => {
    dispatch(UpdateLocatariosEmail(email, locatario.id, setMsg));
  };

  const handleChange = () => {
    setMostrar(true);
    let data2 = [];
    let data3 = [];

    plaza.map((item) => {
      data2.push(Ganancias.filter((d) => item.id === d.id)[0]);
      data3.push(Domicilios.filter((p) => item.id === p.id)[0]);
      dispatch(getLocatariosMasVendidos(item.id));
      dispatch(getProductosMasVendidos(item.id));
    });
    setDatos(data2);
    setDatos1(data3);
  };
  useEffect(() => {
    if (plaza.length > 0) {
      handleChange();
    } else if (plaza.length === 0) {
      setMostrar(false);
    }
  }, [plaza]);

  const handleData = () => {
    if (fecha1 < fecha2) {
      if (rol === "SUPER_ADMIN") {
        dispatch(getDomiciliosPlaza(fecha1, fecha2));
        dispatch(getGananciasPlaza(fecha1, fecha2));
      } else if (rol === "ADMIN_LOCATARIO") {
        dispatch(getGananciaLocatario(fecha1, fecha2, locatario.id));
        dispatch(getDomiciliosLocatario(fecha1, fecha2, locatario.id));
      }
    }
  };
  useEffect(() => {
    handleData();
  }, [fecha1, fecha2]);

  console.log(Domicilios);

  return (
    <ContainerDashboard>
      <HeaderDashboard />
      <section className="ps-dashboard" id="homepage">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} md={12}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              {rol === "SUPER_ADMIN" && (
                <Grid item xs={12} md={12}>
                  <Autocomplete
                    multiple
                    limitTags={4}
                    id="multiple-limit-tags"
                    value={plaza}
                    onChange={(event, newValue) => {
                      setPlaza(newValue);
                    }}
                    options={plazanombres}
                    getOptionLabel={(option) =>
                      option?.nombre ? option?.nombre : ""
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Plazas"
                      />
                    )}
                  />
                </Grid>
              )}
              <Grid item xs={12} md={6}>
                <TextField
                  style={{ marginTop: "10px" }}
                  id="date"
                  variant="outlined"
                  type="date"
                  size="small"
                  fullWidth
                  value={fecha1}
                  onChange={(e) => setFecha1(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  helperText="Fecha de inicio"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  style={{ marginTop: "10px" }}
                  id="date"
                  variant="outlined"
                  type="date"
                  size="small"
                  fullWidth
                  value={fecha2}
                  onChange={(e) => setFecha2(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  helperText="Fecha final"
                />
              </Grid>
            </Grid>
          </Grid>
          {fecha1 > fecha2 && (
            <Grid item xs={12} sm={12}>
              <Alert severity="warning">
                La fecha final tiene que ser mayor que la fecha de inicio
              </Alert>
            </Grid>
          )}
          {rol === "SUPER_ADMIN" && (
            <>
              {Ganancias.length > 0 && Domicilios.length > 0 ? (
                <>
                  <Grid item xs={12} md={12}>
                    <CardSaleReport
                      datas={mostrar ? datos : Ganancias}
                      titulo={"Informe de ganacias"}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <CardSaleReport
                      datas={mostrar ? datos1 : Domicilios}
                      titulo={"Informe de pedidos"}
                    />
                  </Grid>
                </>
              ) : (
                <Grid item xs={12} md={12}>
                  <h3 style={{ textAlign: "center" }}>
                    Para ver la informaci??n de las graficas por favor selecciona
                    un rango de fecha
                  </h3>
                </Grid>
              )}
              {mostrar ? (
                <>
                  <Grid item xs={12} md={12}>
                    <h2>Top de productos</h2>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      {TopProductosPlazas.map((item, index) => {
                        if (
                          plaza.findIndex(
                            (pla) => pla.id === item?.id_plaza
                          ) !== -1
                        ) {
                          return (
                            <Grid item xs={12} md={4} key={index + 1}>
                              <CardTopCountries
                                titulo={
                                  "Plaza " +
                                  plaza.filter(
                                    (pla) => pla.id === item?.id_plaza
                                  )[0]?.nombre
                                }
                                dato={item?.productos}
                              />
                            </Grid>
                          );
                        }
                      })}
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <h2>Top de locatarios</h2>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      {TopLocatariosPlazas?.map((item, index) => {
                        if (
                          plaza.findIndex(
                            (pla) => pla.id === item?.id_plaza
                          ) !== -1
                        ) {
                          return (
                            <Grid item xs={12} md={4} key={index + 1}>
                              <CardTopCountries
                                titulo={
                                  "Plaza " +
                                  plaza.filter(
                                    (pla) => pla.id === item?.id_plaza
                                  )[0]?.nombre
                                }
                                dato={item?.locatarios}
                              />
                            </Grid>
                          );
                        }
                      })}
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={6} md={6}>
                    <CardTopCountries
                      titulo={"Top de los productos m??s vendidos"}
                      dato={TopProductos}
                    />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <CardTopCountries
                      titulo={"Top de los locatarios que mas venden"}
                      dato={TopLocatarios}
                    />
                  </Grid>
                </>
              )}
            </>
          )}
        </Grid>
        {rol === "ADMIN_LOCATARIO" && (
          <>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              {Ganancias.length > 0 && Domicilios.length > 0 ? (
                <>
                  <Grid item xs={12} md={12}>
                    <CardSaleReport
                      datas={Ganancias}
                      titulo={"Informe de ganacias"}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <CardSaleReport
                      datas={Domicilios}
                      titulo={"Informe de pedidos"}
                    />
                  </Grid>
                </>
              ) : (
                <Grid item xs={12} md={12}>
                  <h3 style={{ textAlign: "center" }}>
                    Para ver la informaci??n de las graficas por favor selecciona
                    un rango de fecha
                  </h3>
                </Grid>
              )}
              <Grid item xs={12} md={4}>
                <CardTopCountries
                  titulo={"Top de los productos m??s vendidos"}
                  dato={TopProductos}
                />
              </Grid>
            </Grid>
            <Modal
              open={open}
              handleClose={() => setOpen(false)}
              title="Importante"
              tama??o="sm"
            >
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={12}>
                  <p>
                    Por favor ingrese el correo electr??nico, para que le
                    notifiquen los estados de los pedidos
                  </p>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <label>Correo electr??nico</label>
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
                <Grid item xs={12} sm={12}>
                  {msg && <Alert severity="success">{msg}</Alert>}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ color: "white" }}
                    onClick={Actualizar}
                  >
                    Actualizar informaci??n
                  </Button>
                </Grid>
              </Grid>
            </Modal>
          </>
        )}
      </section>
    </ContainerDashboard>
  );
};

export default Tablero;
