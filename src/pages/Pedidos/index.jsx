import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import ContainerDashboard from "../../components/layaouts/ContainerDashboard";
import HeaderDashboard from "./../../components/shared/headers/HeaderDashboard";

import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
// import Autocomplete from "@material-ui/lab/Autocomplete";
import IconButton from "@material-ui/core/IconButton";

import TooltipE from "./../../components/shared/tooltip";
import useStyles from "./styles";
import { getPedidos } from "actions/pedidos";
import { getClientes } from "actions/cliente";
import TablesPedidos from "components/shared/tables/TablaPedidos";
import { getProducto } from "actions/producto";
import { getTrue } from "actions/plaza";

const Pedidos = () => {
  const dispatch = useDispatch();
  const estados = [
    {
      value: "0",
      label: "Enviado",
    },
    {
      value: "1",
      label: "En progreso",
    },
    {
      value: "2",
      label: "Entregado",
    },
    {
      value: "3",
      label: "Cancelado",
    },
  ];
  const pagos = [
    {
      value: "1",
      label: "No pago",
    },
    {
      value: "0",
      label: "Pago",
    },
  ];
  const classes = useStyles();

  // const [nomproducto, setNomProducto] = useState("");
  const [pedidos1, setPedidos1] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [pedidos2, setPedidos2] = useState([]);
  const [pedidosnom, setPedidosNom] = useState("");
  const [mostrar, setMostrar] = useState(false);
  const [estado, setEstado] = useState("");
  const [pago, setPago] = useState("");

  useEffect(() => {
    dispatch(getPedidos(setPedidos1));
    setMostrar(false);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getClientes(setCliente));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducto());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTrue());
  }, [dispatch]);

  const getDatos = () => {
    dispatch(getPedidos(setPedidos1));
    setMostrar(false);
  };

  const Buscar = () => {
    setMostrar(true);
    let prueba1 = /^([A-ZÁÉÍÓÚ]+[\s]*)+$/.test(pedidosnom.trim());
    let prueba2 = /^([a-zñáéíóú]+[\s]*)+$/.test(pedidosnom.trim());
    let fecha = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(
      pedidosnom
    );
    console.log(pedidos2);
    console.log(fecha);
    console.log(prueba1 + " - " + prueba2);
    if (prueba1 || prueba2) {
      setPedidos2(
        pedidos1.filter((item) => {
          return (
            item.cliente ===
            cliente.filter((clien) => {
              return clien.nombre
                .toLowerCase()
                .trim()
                .includes(pedidosnom.toLowerCase());
            })[0]?.id
          );
          // .toLowerCase()
          // .trim()
          // .includes(pedidosnom.toLowerCase());
        })
      );
      console.log(
        cliente.filter((clien) => {
          return clien.nombre.trim() === pedidosnom.trim();
        })
      );
    } else if (fecha) {
      console.log(pedidos2);
      console.log(
        pedidos1.map((item) => {
          console.log(item.fecha + " - " + pedidosnom);
        })
      );
      setPedidos2(
        pedidos1.filter((item) => {
          return item.fecha === pedidosnom;
        })
      );
    }
  };

  const handleEstado = () => {
    setMostrar(true);
    console.log(estado);
    console.log("aqui");
    setPedidos2(
      pedidos1.filter((item) => {
        return item.estado.trim().includes(estado.toString());
      })
    );
  };
  useEffect(() => {
    if (estado.length > 0) {
      handleEstado();
    }
  }, [estado]);

  const handlePago = () => {
    setMostrar(true);
    console.log(pago);
    let data = [];
    pedidos1.map((item) => {
      if (item.pagado === pago) {
        data.push(item);
      }
    });
    setPedidos2(data);
    console.log(data);
  };
  useEffect(() => {
    if (pago.length > 0) {
      handlePago();
    }
  }, [pago]);

  console.log(pago);
  console.log(cliente);
  console.log(pedidosnom);

  const Restaurar = () => {
    dispatch(getPedidos(setPedidos1));
    setPedidosNom("");
    setEstado("");
    setPago("");
    setMostrar(false);
  };

  const ExportarPedido = async () => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(process.env.REACT_APP_URL_API + "pedidos/downladXLSX", config)
      .then((response) => {
        console.log(response);
        window.open(
          process.env.REACT_APP_URL_API + "pedidos/downladXLSX",
          "_self"
        );
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };

  return (
    <ContainerDashboard title="Settings">
      <HeaderDashboard
        title="Pedidos"
        description="Información de los pedidos de las plazas"
      />
      <section className="ps-items-listing">
        <div className="ps-section__actions">
          <a className="ps-btn success" onClick={ExportarPedido}>
            <AddIcon />
            Exportar datos
          </a>
        </div>
        <div style={{ marginBottom: "30px" }}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                type="text"
                name="cate"
                variant="outlined"
                fullWidth
                value={pedidosnom}
                onChange={(e) => setPedidosNom(e.target.value)}
                placeholder="Buscar"
                style={{ width: "100%" }}
              />
              <span
                style={{
                  float: "right",
                  cursor: "pointer",
                  position: "relative",
                  margin: "-75px 10px 0 0",
                }}
              >
                <TooltipE title="Buscar información">
                  <IconButton color="primary" component="span" onClick={Buscar}>
                    <SearchIcon
                      style={{ fontSize: "35px", marginTop: "10px" }}
                    />
                  </IconButton>
                </TooltipE>
                <TooltipE title="Restaurar información">
                  <IconButton
                    color="primary"
                    component="span"
                    onClick={Restaurar}
                  >
                    <RefreshIcon
                      style={{ fontSize: "35px", marginTop: "10px" }}
                    />
                  </IconButton>
                </TooltipE>
              </span>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="outlined-select-currency-native"
                select
                variant="outlined"
                value={estado}
                size="small"
                onChange={(e) => setEstado(e.target.value)}
                fullWidth
                className={classes.margin}
                helperText="Estado del pedido"
              >
                {estados.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="outlined-select-currency-native"
                select
                variant="outlined"
                value={pago}
                size="small"
                onChange={(e) => setPago(e.target.value)}
                fullWidth
                className={classes.margin}
                helperText="Pago"
              >
                {pagos.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </div>
        <div className="ps-section__content">
          <TablesPedidos
            getDatos={getDatos}
            datos={mostrar ? pedidos2 : pedidos1}
            clientes={cliente}
          />
        </div>
        <div className="ps-section__footer"></div>
      </section>
    </ContainerDashboard>
  );
};
export default Pedidos;
