import React, { useState } from "react";

import IconButton from "@material-ui/core/IconButton";
import TooltipE from "./../../tooltip";
import Modal from "./../../modal";
// import _Eliminar from "./../../modal/Eliminar.jsx";
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
import useStyles from "../style";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import * as locales from "@material-ui/core/locale";
import { useDispatch, useSelector } from "react-redux";
import { getLocatarioId } from "actions/locatarios";
import Formatear from "components/shared/formatoNumero/Formatear_numeros";
import Actualizar from "components/shared/modal/Pedidos/Actualizar";
import { getProductoLocatario } from "actions/producto";

const TablesPedidos = ({ datos, getDatos, clientes }) => {
  const classes = useStyles();

  const { productos, prolocatarios } = useSelector((state) => state.producto);
  const { plazastrues } = useSelector((state) => state.plaza);
  const { rol } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [mostrar, setMostrar] = useState(false);
  const [locatario, setLocatario] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [idp, setIdp] = useState(0);
  const [idp2, setIdp2] = useState(0);

  const columns = [
    { id: "id", label: "ID Pasarela de pagos" },
    { id: "pedidos", label: "Pedido" },
    { id: "nombre", label: "Nombre" },
    { id: "fecha", label: "Fecha" },
    // { id: "pago", label: "Pago" },
    { id: "estados", label: "Estados" },
    { id: "total", label: "Total", width: "600px" },
    { id: "acciones", label: "Acciones" },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = (locatarios) => {
    setOpen(true);
    dispatch(getLocatarioId(setLocatario, locatarios));
    dispatch(getProductoLocatario(locatarios));
    console.log(locatarios);
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

  console.log(prolocatarios);
  console.log(datos);
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead color="#DE9E12">
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{ minWidth: column.minWidth }}
                    className={classes.encabezado}
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
                      var date = new Date(item.fecha);
                      var options = {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      };
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
                            {item.cliente_dato.nombre ? (
                              <Button
                                color="secondary"
                                key={`${item.cliente}`}
                                onClick={() => {
                                  handleClickOpen(item.locatario);
                                  setIdp(item.id);
                                }}
                              >
                                <b>{item.cliente_dato.nombre}</b>
                              </Button>
                            ) : (
                              <h5 className={classes.error}>---</h5>
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {item.fecha === null ? (
                              <p>No hay fecha</p>
                            ) : (
                              date.toLocaleDateString("es-CO", options)
                            )}
                          </TableCell>
                          {/* <TableCell align="center">
                            {item.pagado === "0" ? "Pago" : "No pago"}
                          </TableCell> */}
                          <TableCell align="center">{estado}</TableCell>
                          <TableCell align="center">
                            {Formatear(item.total)}
                          </TableCell>
                          <TableCell align="center">
                            {item?.acciones.map((cat) => {
                              return (
                                <TooltipE title={cat.name} key={cat.name}>
                                  <IconButton
                                    color="default"
                                    component="span"
                                    key={cat.name}
                                    className={classes.iconos}
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
          title="Informaci??n del pedido"
          tama??o="sm"
        >
          {datos.length > 0 &&
            datos.map((item) => {
              if (item !== undefined && item.id === idp) {
                let producto = [];
                let proloc = [];
                let cliente = clientes.filter(
                  (clien) => clien.id === item.cliente
                )[0];
                let plaza = plazastrues?.filter(
                  (plaza) => plaza.id === item.plaza
                )[0];
                for (let index = 0; index < item.productos.length; index++) {
                  const element = item.productos[index];
                  prolocatarios?.map((item) => {
                    if (item.id === element) {
                      proloc.push(item);
                    }
                  });
                }
                for (let index = 0; index < item.productos.length; index++) {
                  const element = item.productos[index];
                  productos?.map((item) => {
                    if (item.id === element) {
                      producto.push(item);
                    }
                  });
                }
                console.log(producto);
                return (
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    {rol === "SUPER_ADMIN" ? (
                      <>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          style={{ textAlign: "center" }}
                        >
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
                              {proloc.map((pro) => {
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
                                          marginBottom: "2px",
                                          marginTop: "0px",
                                        }}
                                      >
                                        {
                                          productos?.filter(
                                            (it) => it.id === pro.producto_id
                                          )[0]?.nombre
                                        }
                                      </p>
                                      {pro.sku}
                                      {pro.en_promocion === "S??" ? (
                                        <p>
                                          Promoci??n: $
                                          {Formatear(pro.precio_rebajado)}
                                        </p>
                                      ) : (
                                        <p
                                          style={{
                                            marginBottom: "2px",
                                            marginTop: "0px",
                                          }}
                                        >
                                          Precio: ${Formatear(pro.precio)}
                                        </p>
                                      )}
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
                              style={{
                                marginTop: "15px",
                                marginBottom: "15px",
                              }}
                            />
                          </Grid>
                        )}
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          style={{ textAlign: "center" }}
                        >
                          <Box
                            bgcolor="total.main"
                            color="primary.contrastText"
                            p={1}
                            style={{ color: "white", fontSize: "16px" }}
                            borderRadius={16}
                          >
                            Total a pagar: $ {Formatear(item.total)}
                          </Box>
                          <Divider
                            variant="middle"
                            style={{ marginTop: "15px", marginBottom: "15px" }}
                          />
                        </Grid>
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
                          >
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              style={{ textAlign: "center" }}
                            >
                              <Box
                                borderColor="total.main"
                                p={2}
                                borderRight={2}
                              >
                                <br></br>
                                <h4>Datos del cliente</h4>
                                <p style={{ fontSize: "16px" }}>
                                  <b>Cliente:</b> {cliente?.nombre}
                                </p>
                                <p style={{ fontSize: "16px" }}>
                                  <b>Tel??fono:</b> {cliente?.telefono}
                                </p>
                                <p style={{ fontSize: "16px" }}>
                                  <b>Direcci??n:</b> {cliente?.direccion}
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
                                <p
                                  key={locatario.id}
                                  style={{ fontSize: "14px" }}
                                >
                                  <p style={{ fontSize: "16px" }}>
                                    <b>Nombre: </b> {locatario.nombre}
                                  </p>
                                  <p style={{ fontSize: "16px" }}>
                                    <b>Local:</b> {locatario.nombre_local}
                                  </p>
                                </p>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                      </>
                    ) : (
                      <>
                        {" "}
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          style={{ textAlign: "center" }}
                        >
                          <Box
                            bgcolor="total.main"
                            color="primary.contrastText"
                            p={1}
                            style={{ color: "white", fontSize: "16px" }}
                            borderRadius={16}
                          >
                            Total a pagar: $ {Formatear(item.total)}
                          </Box>
                          <Divider
                            variant="middle"
                            style={{ marginTop: "15px", marginBottom: "15px" }}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          style={{ textAlign: "center" }}
                        >
                          <h4>Listado de productos</h4>
                        </Grid>
                        <Grid
                          container
                          direction="row"
                          justify="center"
                          alignItems="center"
                          spacing={2}
                        >
                          {proloc.map((pro) => {
                            console.log(pro);
                            console.log(productos.filter((it) => it.id));
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
                                      marginBottom: "2px",
                                      marginTop: "0px",
                                    }}
                                  >
                                    {
                                      productos.filter(
                                        (it) => it.id === pro.producto_id
                                      )[0]?.nombre
                                    }
                                  </p>
                                  {pro.sku}
                                  {pro.en_promocion === "S??" ? (
                                    <p>
                                      Promoci??n: $
                                      {Formatear(pro.precio_rebajado)}
                                    </p>
                                  ) : (
                                    <p
                                      style={{
                                        marginBottom: "2px",
                                        marginTop: "0px",
                                      }}
                                    >
                                      Precio: ${Formatear(pro.precio)}
                                    </p>
                                  )}
                                </Box>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </>
                    )}
                  </Grid>
                );
              }
            })}
        </Modal>
        <Actualizar
          open={open1}
          handleClose={handleClose1}
          estado={datos?.filter((item) => item.id === idp2)[0]?.estado}
          id={idp2}
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
