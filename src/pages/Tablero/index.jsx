import React, { useEffect, useState } from "react";
import ContainerDashboard from "./../../components/layaouts/ContainerDashboard";
import CardRecentOrders from "./../../components/shared/cards/CardRecentOrders";
import CardSaleReport from "./../../components/shared/cards/CardSaleReport";
import CardStatics from "./../../components/shared/cards/CardStatics";
import HeaderDashboard from "./../../components/shared/headers/HeaderDashboard";
import CardTopCountries from "./../../components/shared/cards/CardTopCountries";
import Alert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { getLocatarioCedula } from "actions/locatarios";
import Modal from "components/shared/modal";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { UpdateLocatariosEmail } from "actions/locatarios";
import { getPlazasGanancias } from "actions/plaza";
import { getProductosVendidos, getTopProductosVendidos } from "actions/balance";
import { getUltimosPedidos } from "actions/balance";
import { getClientes } from "actions/cliente";

const Tablero = () => {
  const dispatch = useDispatch();
  const { rol, codigo } = useSelector((state) => state.auth);
  const [locatario, setLocatario] = useState([]);
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [pedido, setPedidos] = useState([]);
  const [cliente, setCliente] = useState([]);

  useEffect(() => {
    if (rol === "ADMIN_LOCATARIO") {
      dispatch(getLocatarioCedula(setLocatario, codigo));
    }
    if (cliente.length === 0) {
      dispatch(getPlazasGanancias());
      dispatch(getProductosVendidos());
      dispatch(getTopProductosVendidos());
      dispatch(getUltimosPedidos(setPedidos));
      dispatch(getClientes(setCliente));
    }
  }, [cliente]);

  useEffect(() => {
    if (rol === "ADMIN_LOCATARIO") {
      setOpen(true);
    }
  }, [locatario.email === null]);

  const getDatos = () => {
    if (rol === "SUPER_ADMIN") {
      dispatch(getUltimosPedidos(setPedidos));
    } else {
      dispatch(getUltimosPedidos(setPedidos));
      // dispatch(getPedidosLocatarios(setPedidos, locatario.id));
    }
  };

  const Actualizar = () => {
    dispatch(UpdateLocatariosEmail(email, locatario.id, setMsg));
  };
  console.log(pedido);
  return (
    <ContainerDashboard>
      {/* <Provider store={toggleDrawerMenu} > */}
      <HeaderDashboard />
      <section className="ps-dashboard" id="homepage">
        <div className="ps-section__left">
          <div className="row">
            <div className="col-xl-12 col-12">
              <CardSaleReport />
            </div>
            {/* <div className="col-xl-4 col-12">
              <CardEarning />
            </div> */}
          </div>
          <CardRecentOrders
            pedidos={pedido}
            getDatos={getDatos}
            clientes={cliente}
          />
        </div>
        <div className="ps-section__right">
          <CardStatics />
          <CardTopCountries />
        </div>
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

      {/* </Provider> */}
    </ContainerDashboard>
  );
};

export default Tablero;
