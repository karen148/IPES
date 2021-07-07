import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";

import ContainerDashboard from "../../components/layaouts/ContainerDashboard";
import HeaderDashboard from "./../../components/shared/headers/HeaderDashboard";

import AddIcon from "@material-ui/icons/Add";
import RefreshIcon from "@material-ui/icons/Refresh";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";

import TooltipE from "./../../components/shared/tooltip";
import useStyles from "./styles";
import { getPedidos } from "actions/pedidos";
import { getClientes } from "actions/cliente";
import TablesPedidos from "components/shared/tables/TablaPedidos";
import { getProducto } from "actions/producto";
import { getTrue } from "actions/plaza";
import Excel from "components/shared/Excel";
import { getPedidosLocatarios } from "actions/pedidos";
import { getLocatarioCedula } from "actions/locatarios";
import { getProductoLocatario } from "actions/producto";

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
  const { rol, codigo } = useSelector((state) => state.auth);
  const [locatario, setLocatario] = useState([]);
  const [pedidos1, setPedidos1] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [pedidos2, setPedidos2] = useState([]);
  const [pedidosnom, setPedidosNom] = useState("");
  const [mostrar, setMostrar] = useState(false);
  const [estado, setEstado] = useState("");
  const [pago, setPago] = useState("");
  const [pedidosnom1, setPedidosNom1] = useState("");
  const [pedidosnom2, setPedidosNom2] = useState("");

  const columns = [
    { label: "Pasarela de pagos", value: "pasarela" },
    { label: "Pedido", value: "conteo" },
    {
      label: "Cliente",
      value: function x(row) {
        let nombre = cliente.filter((clien) => clien.id === row.cliente)[0]
          ?.nombre;
        return nombre;
      },
    },
    {
      label: "Dirección",
      value: function x(row) {
        let nombre = cliente.filter((clien) => clien.id === row.cliente)[0]
          ?.direccion;
        return nombre;
      },
    },
    {
      label: "Teléfono",
      value: function x(row) {
        let nombre = cliente.filter((clien) => clien.id === row.cliente)[0]
          ?.telefono;
        return nombre;
      },
    },
    { label: "Fecha", value: "fecha" },
    {
      label: "Pago",
      value: function x(row) {
        return row.pagado === "0" ? "Pago" : "No pago";
      },
    },
    {
      label: "Estados",
      value: function x(row) {
        let estado = "";
        if (row.estado === "0") {
          estado = "Enviado";
        } else if (row.estado === "1") {
          estado = "En progreso";
        } else if (row.estado === "2") {
          estado = "Entregado";
        } else {
          estado = "Cancelado";
        }
        return estado;
      },
    },
    { label: "Total", value: "total" },
  ];
  const settings = {
    sheetName: "Pedidos IPES",
    fileName: "Pedidos-IPES",
  };

  useEffect(() => {
    dispatch(getLocatarioCedula(setLocatario, codigo));
    if (rol === "SUPER_ADMIN") {
      dispatch(getPedidos(setPedidos1));
    }
    dispatch(getClientes(setCliente));
    dispatch(getProducto());
    dispatch(getTrue());
  }, [dispatch]);

  useEffect(() => {
    if (locatario.id) {
      dispatch(getPedidosLocatarios(setPedidos1, locatario.id));
      dispatch(getProductoLocatario(locatario.id));
    }
  }, [dispatch, locatario.id]);

  const getDatos = () => {
    if (rol === "SUPER_ADMIN") {
      dispatch(getPedidos(setPedidos1));
    } else {
      dispatch(getPedidosLocatarios(setPedidos1, locatario.id));
    }
    setMostrar(false);
  };

  const Buscar = () => {
    setMostrar(true);
    if (pedidosnom.length === 1) {
      setMostrar(false);
    }
    let prueba1 = /^([A-ZÁÉÍÓÚ]+[\s]*)+$/.test(pedidosnom.trim());
    let prueba2 = /^([a-zñáéíóú]+[\s]*)+$/.test(pedidosnom.trim());
    let prueba3 = /^([0-9])*$/.test(pedidosnom.trim());
    console.log(prueba3);
    if (prueba1 || prueba2) {
      setPedidos2(
        pedidos1.filter((item) => {
          return item.cliente_dato.nombre
            .toLowerCase()
            .trim()
            .includes(pedidosnom.toLowerCase());
        })
      );
    }
  };
  useEffect(() => {
    if (pedidosnom.length > 0) {
      Buscar();
    }
  }, [pedidosnom]);

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

  const handleFecha = () => {
    setMostrar(true);
    setPedidos2(
      pedidos1.filter((item) => {
        if (item.fecha >= pedidosnom1) {
          if (item.fecha <= pedidosnom2) {
            return item;
          }
        }
      })
    );
  };
  useEffect(() => {
    if (pedidosnom1.length > 0) {
      handleFecha();
    }
  }, [pedidosnom1, pedidosnom2]);

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

  const Restaurar = () => {
    if (rol === "SUPER_ADMIN") {
      dispatch(getPedidos(setPedidos1));
    } else {
      dispatch(getPedidosLocatarios(setPedidos1, locatario.id));
    }
    setPedidosNom("");
    setEstado("");
    setPago("");
    setMostrar(false);
  };

  return (
    <ContainerDashboard title="Settings">
      <HeaderDashboard
        title="Pedidos"
        description={
          rol === "SUPER_ADMIN"
            ? "Información de los pedidos de las plazas"
            : "Información de los pedidos de las plazas"
        }
      />
      <section className="ps-items-listing">
        <div className="ps-section__actions">
          <a
            className="ps-btn success"
            onClick={() =>
              Excel(
                columns,
                rol === "SUPER_ADMIN"
                  ? mostrar
                    ? pedidos2
                    : pedidos1
                  : mostrar
                  ? pedidos2
                  : pedidos1,
                settings
              )
            }
          >
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
            <Grid item xs={12} sm={4}>
              <TextField
                margin="normal"
                type="text"
                name="cate"
                variant="outlined"
                fullWidth
                size="small"
                value={pedidosnom}
                onChange={(e) => setPedidosNom(e.target.value)}
                placeholder="Buscar"
                style={{ width: "100%" }}
                helperText="Buscar el nombre del cliente"
              />
              <span
                style={{
                  float: "right",
                  cursor: "pointer",
                  position: "relative",
                  margin: "-75px 10px 0 0",
                }}
              >
                <TooltipE title="Restaurar información">
                  <IconButton
                    color="primary"
                    component="span"
                    onClick={Restaurar}
                  >
                    <RefreshIcon
                      style={{ fontSize: "35px", marginTop: "-7px" }}
                    />
                  </IconButton>
                </TooltipE>
              </span>
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                style={{ marginTop: "10px" }}
                id="date"
                variant="outlined"
                type="date"
                size="small"
                fullWidth
                value={pedidosnom1}
                onChange={(e) => setPedidosNom1(e.target.value)}
                defaultValue="2021-06-10"
                InputLabelProps={{
                  shrink: true,
                }}
                helperText="Fecha 1"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                style={{ marginTop: "10px" }}
                id="date"
                variant="outlined"
                type="date"
                size="small"
                fullWidth
                value={pedidosnom2}
                onChange={(e) => setPedidosNom2(e.target.value)}
                defaultValue="2021-06-10"
                InputLabelProps={{
                  shrink: true,
                }}
                helperText="Fecha 2"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
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
            <Grid item xs={12} sm={2}>
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
            {pedidosnom1 > pedidosnom2 && (
              <Grid item xs={12} sm={12}>
                <Alert severity="warning">
                  Fecha 2 tiene que ser mayor que Fecha 1
                </Alert>
              </Grid>
            )}
          </Grid>
        </div>
        <div className="ps-section__content">
          {pedidosnom1 === "" && pedidosnom2 === "" ? (
            <TablesPedidos
              getDatos={getDatos}
              datos={
                rol === "SUPER_ADMIN"
                  ? mostrar
                    ? pedidos2
                    : pedidos1
                  : mostrar
                  ? pedidos2
                  : pedidos1
              }
              clientes={cliente}
            />
          ) : (
            pedidosnom1 < pedidosnom2 && (
              <TablesPedidos
                getDatos={getDatos}
                datos={
                  rol === "SUPER_ADMIN"
                    ? mostrar
                      ? pedidos2
                      : pedidos1
                    : mostrar
                    ? pedidos2
                    : pedidos1
                }
                clientes={cliente}
              />
            )
          )}
        </div>
        <div className="ps-section__footer"></div>
      </section>
    </ContainerDashboard>
  );
};
export default Pedidos;
