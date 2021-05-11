import React, { useState } from "react";
// import IconButton from "@material-ui/core/IconButton";
// import TooltipE from "./../../tooltip";
// import Modal from "./../../modal";
// import _Eliminar from "./../../modal/Eliminar.jsx";
// import Button from "@material-ui/core/Button";
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
// import Divider from "@material-ui/core/Divider";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import * as locales from "@material-ui/core/locale";

const TablesPedidos = ({ datos, getDatos }) => {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [local3, setLocal3] = useState([]);
  // const [open, setOpen] = React.useState(false);
  // const [open1, setOpen1] = React.useState(false);
  // const [open2, setOpen2] = React.useState(false);
  // const [idp, setIdp] = useState(0);
  // const [idp1, setIdp1] = useState(0);
  // const [idp2, setIdp2] = useState(0);

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

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleClickOpen1 = () => {
  //   setOpen1(true);
  // };

  // const handleClose1 = () => {
  //   setOpen1(false);
  //   getLocali();
  // };

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

  // const Eliminar = () => {
  //   dispatch(DeleteLocatario(idp2));
  // };
  console.log(getDatos);
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
                      let data = [];
                      if (item?.categorias) {
                        if (item?.categorias.length > 0) {
                          for (let i = 0; i <= item?.categorias.length; i++) {
                            const element = item?.categorias[i];
                            categorias.map((item) => {
                              if (item.id === element) {
                                data.push(item);
                              }
                            });
                          }
                        }
                      }
                      console.log(
                        plazastrues.length
                          ? plazastrues.filter(
                              (pla) => pla?.id === item.plaza
                            )[0]?.localidad_id
                          : "-"
                      );
                      return (
                        <TableRow key={`${item.id}`}>
                          <TableCell align="center">{item.conteo}</TableCell>
                          <TableCell align="center">
                            <Button
                              color="secondary"
                              key={`${item.local}`}
                              // onClick={() => {
                              //   handleClickOpen();
                              //   setIdp(item.id);
                              // }}
                            >
                              <b>{item.local}</b>
                            </Button>
                          </TableCell>
                          <TableCell align="center">{item.nombre}</TableCell>
                          <TableCell key={`${item.activo}`} align="center">
                            {item.activo}
                          </TableCell>
                          <TableCell
                            key={`${item.activo}${item.local}`}
                            style={{ width: "180px" }}
                            align="center"
                          >
                            {data.map((item) => {
                              return (
                                <TooltipE title={item.label} key={item.id}>
                                  <img
                                    src={
                                      process.env.REACT_APP_URL_API +
                                      `uploads/retorna/CATEGORIA/${item.icono}`
                                    }
                                    alt=""
                                    width="30px"
                                    height="30px"
                                    style={{ marginRight: "5px" }}
                                  />
                                </TooltipE>
                              );
                            })}
                          </TableCell>
                          {/* <TableCell align="center">
                            {item?.acciones.map((cat) => {
                              return (
                                <TooltipE title={cat.name} key={cat.name}>
                                  <IconButton
                                    color="default"
                                    component="span"
                                    key={cat.name}
                                    onClick={
                                      cat.name === "Editar"
                                        ? () => {
                                            handleClickOpen2();
                                            setIdp1(cat.id);
                                            datoActualizar(cat.id);
                                          }
                                        : () => {
                                            handleClickOpen1();
                                            setIdp2(cat.id);
                                          }
                                    }
                                  >
                                    {cat.icon}
                                  </IconButton>
                                </TooltipE>
                              );
                            })}
                          </TableCell> */}
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
        {/* <Modal
          open={open}
          handleClose={handleClose}
          title="No hay datos"
          tamaño="sm"
        > */}
        {/* {datos.length > 0 &&
            datos.map((item) => {
              let telefonoss = [];
              if (item?.telefonos) {
                if (item?.telefonos.length > 0) {
                  console.log("aquiiii");
                  for (let i = 0; i <= item?.telefonos.length; i++) {
                    const element = item?.telefonos[i];
                    console.log(item?.telefonos[i]);
                    telefonoss.push({ telefono: element });
                  }
                }
              } else {
                telefonoss.push({
                  telefono: "El locatario no tiene telefonos",
                });
              }
              if (item !== undefined && item.id === idp) {
                return (
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={12} sm={12}>
                      <img
                        src={
                          process.env.REACT_APP_URL_API +
                          `uploads/retorna/LOCATARIO/${item.img}`
                        }
                        alt=""
                        width="100%"
                        height="150px"
                      />
                      <p style={{ textAlign: "center" }}>
                        <i>Banner</i>
                      </p>
                      <Divider variant="middle" />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          style={{ textAlign: "center" }}
                        >
                          <img
                            src={
                              process.env.REACT_APP_URL_API +
                              `uploads/retorna/LOCATARIO/${item.logo}`
                            }
                            alt=""
                            width="150px"
                            height="150px"
                          />
                          <p style={{ textAlign: "center" }}>
                            <i>Logo</i>
                          </p>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={8}
                          style={{ textAlign: "center" }}
                        >
                          <h4>Locatario</h4>
                          {item.nombre}
                          <br></br>
                          <h4>Cédula</h4>
                          <p>{item.cedula}</p>
                        </Grid>
                      </Grid>
                      <Divider variant="middle" />
                      <br></br>
                      <Grid item xs={12} sm={12}>
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
                            <h4>Teléfonos</h4>
                            {telefonoss.map((item) => {
                              return (
                                <p key={item?.telefono}> {item?.telefono}</p>
                              );
                            })}
                            <h4>Correo electrónico</h4>
                            <p>{item.email}</p>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              }
            })} */}
        {/* </Modal> */}
        {/* <_Eliminar
          open={open1}
          handleClose={handleClose1}
          eliminar={Eliminar}
          titulo3="Cambiar de estado"
          titulo2="el locatario"
          titulo={
            datos.filter((item) => {
              item?.id === idp2;
            })[0]?.nombre
          }
        /> */}
      </Grid>
    </Grid>
  );
};

TablesClientes.propTypes = {
  datos: PropTypes.array,
  getDatos: PropTypes.func,
};

export default TablesPedidos;
