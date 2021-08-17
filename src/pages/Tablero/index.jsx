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
import RefreshIcon from "@material-ui/icons/Refresh";
import { getPlazasGanancias, getTrue } from "actions/plaza";
import {
  getTopProductos,
  getLocatariosMasVendidos,
  getLocatariosPlazas,
  getProductosMasVendidos,
} from "actions/balance";
import { data, pedido } from "./datos";
import { Autocomplete } from "@material-ui/lab";
import { IconButton } from "@material-ui/core";
import TooltipE from "components/shared/tooltip";

const Tablero = () => {
  const dispatch = useDispatch();
  const { rol, codigo } = useSelector((state) => state.auth);
  const { plazanombres } = useSelector((state) => state.plaza);
  const {
    TopLocatarios,
    TopLocatariosPlazas,
    TopProductos,
    TopProductosPlazas,
  } = useSelector((state) => state.balance);
  const [locatario, setLocatario] = useState([]);
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [plaza, setPlaza] = useState([]);
  const [datos, setDatos] = useState([]);
  const [datos1, setDatos1] = useState([]);
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    if (rol === "ADMIN_LOCATARIO") {
      dispatch(getLocatarioCedula(setLocatario, codigo));
    }
    if (plazanombres.length === 0) {
      dispatch(getPlazasGanancias());
      dispatch(getTopProductos());
      dispatch(getTrue());
      dispatch(getLocatariosPlazas());
    }
  }, [plazanombres]);

  useEffect(() => {
    if (rol === "ADMIN_LOCATARIO") {
      setOpen(true);
    }
  }, [locatario.email]);

  const Actualizar = () => {
    dispatch(UpdateLocatariosEmail(email, locatario.id, setMsg));
  };

  const Restaurar = () => {
    setMostrar(false);
    setPlaza([]);
  };

  const handleChange = () => {
    setMostrar(true);
    let data2 = [];
    let data3 = [];

    plaza.map((item) => {
      data2.push(data.filter((d) => item.id === d.id)[0]);
      data3.push(pedido.filter((p) => item.id === p.id)[0]);
      dispatch(getLocatariosMasVendidos(item.id));
      dispatch(getProductosMasVendidos(item.id));
    });
    setDatos(data2);
    setDatos1(data3);
  };
  useEffect(() => {
    if (plaza.length > 0) {
      handleChange();
    }
  }, [plaza]);

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
              <Grid item xs={11} md={11}>
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
              <Grid item xs={1} md={1}>
                <TooltipE title="Restaurar información">
                  <IconButton
                    color="secondary"
                    component="span"
                    onClick={Restaurar}
                  >
                    <RefreshIcon
                      style={{ fontSize: "35px", marginTop: "-5px" }}
                    />
                  </IconButton>
                </TooltipE>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <CardSaleReport
              datas={mostrar ? datos : data}
              titulo={"Informe de ganacias"}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CardSaleReport
              datas={mostrar ? datos1 : pedido}
              titulo={"Informe de pedidos"}
            />
          </Grid>
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
                      plaza.findIndex((pla) => pla.id === item?.id_plaza) !== -1
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
                      plaza.findIndex((pla) => pla.id === item?.id_plaza) !== -1
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
                  titulo={"Top de los productos más vendidos"}
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
        </Grid>
        {rol === "ADMIN_LOCATARIO" && (
          <Modal
            open={open}
            handleClose={() => setOpen(false)}
            title="Importante"
            tamaño="sm"
          >
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={12}>
                <p>
                  Por favor ingrese el correo electrónico, para que le
                  notifiquen los estados de los pedidos
                </p>
              </Grid>
              <Grid item xs={12} sm={12}>
                <label>Correo electrónico</label>
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
                  Actualizar información
                </Button>
              </Grid>
            </Grid>
          </Modal>
        )}
      </section>
    </ContainerDashboard>
  );
};

export default Tablero;
