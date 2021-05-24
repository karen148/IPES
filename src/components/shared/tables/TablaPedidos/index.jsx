import React, { useState } from "react";

import IconButton from "@material-ui/core/IconButton";
import TooltipE from "./../../tooltip";
import Modal from "./../../modal";
import _Eliminar from "./../../modal/Eliminar.jsx";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles.jsx";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import * as locales from "@material-ui/core/locale";
import { DeletePedido } from "actions/pedidos.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getLocatarioPlaza } from "actions/locatarios";

const TablesPedidos = ({ datos, getDatos, clientes }) => {
  const classes = useStyles();

  const { productos } = useSelector((state) => state.producto);
  const { plazastrues } = useSelector((state) => state.plaza);

  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [mostrar, setMostrar] = useState(false);
  const [locatario, setLocatario] = useState([]);
  // const [local3, setLocal3] = useState([]) ;
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  // const [open2, setOpen2] = React.useState(false);
  const [idp, setIdp] = useState(0);
  // const [idp1, setIdp1] = useState(0);
  const [idp2, setIdp2] = useState(0);

  const columns = [
    { id: "id", label: "ID Pasarela de pagos" },
    { id: "pedidos", label: "Pedido" },
    { id: "nombre", label: "Nombre" },
    { id: "fecha", label: "Fecha" },
    { id: "pago", label: "Pago" },
    { id: "estados", label: "Estados" },
    { id: "total", label: "Total" },
    { id: "acciones", label: "Acciones" },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
    getDatos();
  };

  // const handleClickOpen2 = () => {
  //   setOpen2(true);
  // };

  // const handleClose2 = () => {
  //   setOpen2(false);
  //   getLocali();
  // };

  // const datoActualizar = (idL) => {
  //   setLocal3(datos?.filter((item) => item?.id === idL));
  // };

  const Eliminar = () => {
    dispatch(DeletePedido(idp2));
    getDatos();
  };
  console.log(datos);
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {datos.length > 0 &&
                datos
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => {
                    // console.log(plazastrues.length ? plazastrues.filter(pla => pla.id === item.plaza)[0].localidad_nombre : '-' );
                    if (item) {
                      let estado = "";

                      if (item.estado === "0") {
                        estado = "Enviado";
                      } else if (item.estado === "1") {
                        estado = "En progreso";
                      } else if (item.estado === "2") {
                        estado = "Entregado";
                      } else {
                        estado = "Cancelado";
                      }

                      return (
                        <TableRow key={`${item.id}`}>
                          <TableCell align="center">{item.pasarela}</TableCell>
                          <TableCell align="center">{item.conteo}</TableCell>
                          <TableCell align="center">
                            <Button
                              color="secondary"
                              key={`${item.cliente}`}
                              onClick={() => {
                                handleClickOpen();
                                setIdp(item.id);
                                dispatch(
                                  getLocatarioPlaza(setLocatario, item.plaza)
                                );
                              }}
                            >
                              <b>
                                {
                                  clientes.filter(
                                    (clien) => clien.id === item.cliente
                                  )[0]?.nombre
                                }
                              </b>
                            </Button>
                          </TableCell>
                          <TableCell align="center">
                            {item.fecha === null ? (
                              <p>No hay fecha</p>
                            ) : (
                              item.fecha
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {item.pagado === "0" ? "Pago" : "No pago"}
                          </TableCell>
                          <TableCell align="center">{estado}</TableCell>
                          <TableCell align="center">{item.total}</TableCell>
                          <TableCell align="center">
                            {item?.acciones.map((cat) => {
                              return (
                                <TooltipE title={cat.name} key={cat.name}>
                                  <IconButton
                                    color="default"
                                    component="span"
                                    key={cat.name}
                                    onClick={() => {
                                      handleClickOpen1();
                                      setIdp2(cat.id);
                                    }}
                                  >
                                    {cat.icon}
                                  </IconButton>
                                </TooltipE>
                              );
                            })}
                          </TableCell>
                        </TableRow>
                      );
                    }
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <ThemeProvider
          theme={(outerTheme) => createMuiTheme(outerTheme, locales["esES"])}
        >
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={datos.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </ThemeProvider>
        <Modal
          open={open}
          handleClose={handleClose}
          title="Información del pedido"
          tamaño="sm"
        >
          {datos.length > 0 &&
            datos.map((item) => {
              if (item !== undefined && item.id === idp) {
                let producto = [];
                let locatarios = [];
                let cliente = clientes.filter(
                  (clien) => clien.id === item.cliente
                )[0];
                let plaza = plazastrues?.filter(
                  (plaza) => plaza.id === item.plaza
                )[0];
                for (let index = 0; index < item.productos.length; index++) {
                  const element = item.productos[index];
                  productos.map((item) => {
                    if (item.id === element) {
                      producto.push(item);
                    }
                  });
                }
                console.log(producto);
                for (let index = 0; index < item.locatario.length; index++) {
                  const element = item.locatario[index];
                  locatario.map((item) => {
                    if (item.id === element) {
                      locatarios.push(item);
                    }
                  });
                }
                return (
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => setMostrar(true)}
                        style={{ color: "white" }}
                      >
                        Ver productos
                      </Button>
                      <Divider
                        variant="middle"
                        style={{ marginTop: "15px", marginBottom: "15px" }}
                      />
                    </Grid>
                    {mostrar && (
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        style={{ textAlign: "center" }}
                      >
                        <Grid
                          container
                          direction="row"
                          justify="center"
                          alignItems="center"
                          spacing={2}
                        >
                          {producto.map((pro) => {
                            return (
                              <Grid
                                item
                                key={pro.id}
                                xs={12}
                                sm={4}
                                style={{ textAlign: "center" }}
                              >
                                <Box
                                  borderColor="primary.main"
                                  m={2}
                                  border={2}
                                  style={{
                                    marginBottom: "15px",
                                  }}
                                  borderRadius={10}
                                >
                                  <p
                                    style={{
                                      marginBottom: "5px",
                                      marginTop: "10px",
                                    }}
                                  >
                                    {pro.nombre}
                                  </p>
                                  {pro.sku}
                                  <p>precio: $</p>
                                </Box>
                              </Grid>
                            );
                          })}
                        </Grid>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => setMostrar(false)}
                          style={{ color: "white" }}
                        >
                          Cerrar
                        </Button>
                        <Divider
                          variant="middle"
                          style={{ marginTop: "15px", marginBottom: "15px" }}
                        />
                      </Grid>
                    )}
                    <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
                      <Box
                        bgcolor="total.main"
                        color="primary.contrastText"
                        p={1}
                        style={{ color: "white", fontSize: "16px" }}
                        borderRadius={16}
                      >
                        Total a pagar: $ {item.total}
                      </Box>
                      <Divider
                        variant="middle"
                        style={{ marginTop: "15px", marginBottom: "15px" }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          style={{ textAlign: "center" }}
                        >
                          <Box borderColor="total.main" p={2} borderRight={2}>
                            <br></br>
                            <h4>Datos del cliente</h4>
                            <p style={{ fontSize: "16px" }}>
                              <b>Cliente:</b> {cliente?.nombre}
                            </p>
                            <p style={{ fontSize: "16px" }}>
                              <b>Teléfono:</b> {cliente?.telefono}
                            </p>
                            <p style={{ fontSize: "16px" }}>
                              <b>Dirección:</b> {cliente?.direccion}
                            </p>
                            <p style={{ fontSize: "16px" }}>
                              <b>Plaza:</b> {plaza?.nombre}
                            </p>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          style={{ textAlign: "center" }}
                        >
                          <Box style={{ paddingLeft: "10px" }}>
                            <h4>Datos de los locatarios</h4>
                            {locatarios.map((loc) => {
                              return (
                                <p key={loc.id} style={{ fontSize: "14px" }}>
                                  {loc.nombre} - Local: {loc.local}
                                </p>
                              );
                            })}
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              }
            })}
        </Modal>
        <_Eliminar
          open={open1}
          handleClose={handleClose1}
          eliminar={Eliminar}
          titulo3="Cancelar pedido"
          titulo1="Desea cancelar"
          titulo2="el pedido"
          titulo={datos.filter((item) => item.id === idp2)[0]?.id}
        />
      </Grid>
    </Grid>
  );
};

TablesPedidos.propTypes = {
  datos: PropTypes.array,
  getDatos: PropTypes.func,
  clientes: PropTypes.array,
};

export default TablesPedidos;
