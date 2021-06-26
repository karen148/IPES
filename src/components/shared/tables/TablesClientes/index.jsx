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
import Alert from "@material-ui/lab/Alert";
import useStyles from "../style";
import Divider from "@material-ui/core/Divider";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import * as locales from "@material-ui/core/locale";
import { useDispatch, useSelector } from "react-redux";
import { DeleteCliente, UpdateImagen } from "actions/cliente";

const TablesClientes = ({ datos, getDatos }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { msg } = useSelector((state) => state.cliente);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const [idp, setIdp] = useState(0);
  const [idp2, setIdp2] = useState(0);
  const [mostrar, setMostrar] = useState(false);
  const [alerta, setAlerta] = useState(false);
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);

  const columns = [
    { id: "id", label: "ID" },
    { id: "nombre", label: "Nombre" },
    { id: "telefono", label: "Teléfono" },
    { id: "direccion", label: "Dirección" },
    { id: "total", label: "Total Ordenes" },
    { id: "estado", label: "Estado" },
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

  const handleImg = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event[0]);
    reader.onload = function () {
      setImg1(event[0]);
      setImg2(reader.result);
    };

    reader.onerror = function () {
      console.log(reader.error);
    };
  };

  const Eliminar = () => {
    dispatch(DeleteCliente(idp2));
    getDatos();
  };

  const Actualizar = () => {
    dispatch(UpdateImagen(img1, idp));
    getDatos();
    setAlerta(true);
    setTimeout(() => {
      setAlerta(false);
      setMostrar(false);
      getDatos();
    }, 4000);
  };
  console.log(datos.filter((item) => item.id === idp2)[0]?.nombre);
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
                    return (
                      <TableRow key={`${item.id}`}>
                        <TableCell align="center">{item.conteo}</TableCell>
                        <TableCell align="center">
                          <Button
                            color="secondary"
                            key={`${item.nombre}`}
                            onClick={() => {
                              handleClickOpen();
                              setIdp(item.id);
                            }}
                          >
                            <b>{item.nombre}</b>
                          </Button>
                        </TableCell>
                        <TableCell align="center">{item.telefono}</TableCell>
                        <TableCell align="center">{item.direccion}</TableCell>
                        <TableCell align="center">
                          <p>0</p>
                        </TableCell>
                        <TableCell align="center">
                          {item.activo ? "Activo" : "Inactivo"}
                        </TableCell>
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
          title="Información del cliente"
          tamaño="sm"
        >
          {datos.length > 0 &&
            datos.map((item) => {
              if (item.id === idp) {
                return (
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
                      <img
                        src={
                          process.env.REACT_APP_URL_API +
                          `uploads/retorna/CLIENTES/${item.img}`
                        }
                        alt=""
                        width="150px"
                        height="150px"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
                      <Button
                        color="secondary"
                        key={item.id}
                        onClick={() => setMostrar(true)}
                      >
                        Editar imagen
                      </Button>
                      <Divider variant="middle" />
                      <br></br>
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
                        >
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            style={{ textAlign: "center" }}
                          >
                            <label>
                              {" "}
                              Por favor verifique que el <b>logo</b> tenga los
                              siguientes formatos: 'png', 'jpg', 'JPG', 'jpeg',
                              'gif''
                            </label>
                            <br></br>
                            <input
                              className="form-control mb-1"
                              type="file"
                              placeholder=""
                              style={{ paddingTop: "10px" }}
                              accept=".png,.jpg,.JPG,.jpeg,.gif"
                              onChange={(e) => handleImg(e.target.files)}
                            />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            style={{ textAlign: "center" }}
                          >
                            <img
                              src={img2}
                              alt=""
                              width="150px"
                              height="150px"
                            />
                          </Grid>
                          {img1 && (
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              style={{ textAlign: "center" }}
                            >
                              <br></br>
                              {alerta && (
                                <Alert
                                  severity="success"
                                  style={{ marginBottom: "10px" }}
                                >
                                  {msg}
                                </Alert>
                              )}
                              <Button color="primary" onClick={Actualizar}>
                                Actualizar imagen
                              </Button>
                            </Grid>
                          )}
                        </Grid>
                        <Divider variant="middle" />
                      </Grid>
                    )}
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
                          <h4>Nombre</h4>
                          {item.nombre}
                          <br></br>
                          <p>CC: {item.cedula}</p>
                          <h4>Correo electrónico</h4>
                          <p style={{ fontSize: "16px" }}>{item.email}</p>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          style={{ textAlign: "center" }}
                        >
                          <h4>Telefono</h4>
                          <p style={{ fontSize: "16px" }}>{item.telefono}</p>
                          <h4>Diección</h4>
                          <p style={{ fontSize: "16px" }}>{item.direccion}</p>
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
          titulo3="Cambiar de estado"
          titulo2="del cliente"
          titulo1="Desea cambiar el estado a inactivo"
          titulo={datos.filter((item) => item.id === idp2)[0]?.nombre}
        />
      </Grid>
    </Grid>
  );
};

TablesClientes.propTypes = {
  datos: PropTypes.array,
  getDatos: PropTypes.func,
};

export default TablesClientes;
