import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import firebase from "firebase";

//Material
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import * as locales from "@material-ui/core/locale";
import Box from "@material-ui/core/Box";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

//Componentes
import TooltipE from "./../../tooltip";
import Modal from "./../../modal";
import _Eliminar from "./../../modal/Eliminar.jsx";
import _Actualizar from "../../modal/Plaza/Actualizar.jsx";

import useStyles from "../style";
import ModalCategorias from "components/shared/modal/ModalCategoria";
/**
 * @function
 * @name TablaPlazas
 * @description En la tabla plaza se muestra la información importante
 * de las plazas con acciones de editar e eliminar
 * @param {Array} datos Array que contiene toda la información de las plazas
 * @param {Function} getPlaza Función que llama el endpoint de la plaza para
 * actualizar la información
 * @returns
 */
const TablaPlazas = ({ datos, getPlaza }) => {
  const { funcionarios, cantidades, categorias, localidades } = useSelector(
    (state) => state.plaza
  );
  const classes = useStyles();
  const [plazas, setPlaza] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [idp, setIdp] = useState(0);
  const [idp1, setIdp1] = useState(0);
  const [idp2, setIdp2] = useState(0);
  const [idp3, setIdp3] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  /**
   * @constant columns
   * @description Es el encabeza que conforma la tabla
   */
  const columns = [
    { id: "id", label: "ID", width: "30px" },
    { id: "nombre", label: "Nombre de la plaza", width: "200px" },
    { id: "localidad", label: "Localidad", width: "200px" },
    { id: "locatarios_inscritos", label: "Locatarios inscritos" },
    { id: "categorias", label: "Categorías" },
    { id: "fecha", label: "Fecha actualizada" },
    { id: "acciones", label: "Acciones", width: "200px" },
  ];

  /**
   * @function
   * @name handleChangePage
   * @description Permite cambiar de pagina dentro de la tabla
   * @param {*} event
   * @param {*} newPage
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /**
   * @function
   * @name handleChangeRowsPerPage
   * @description Cambiar la cantidad de elementos que desea ver en la tabla
   * @param {Number} event
   */
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

  const handleClickOpen3 = (id) => {
    setOpen3(true);
    setIdp3(id);
  };

  const handleClose1 = () => {
    setOpen1(false);
    getPlaza();
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
    getPlaza();
  };

  const Eliminar = () => {
    let config1 = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .put(
        process.env.REACT_APP_URL_API + "plazas/delete/" + idp2,
        {
          activo: false,
        },
        config1
      )
      .then((response) => {
        if (response.status) {
          handleClose1();
        }
      })
      .catch((e) => {
        console.log("ERROR", e);
      });
  };

  const getPla = async (idP) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(process.env.REACT_APP_URL_API + `plazas/find/${idP}`, config)
      .then((response) => {
        let data = response.data.plaza;
        console.log(data);
        setPlaza(data);
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };

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
                    style={{ minWidth: column.width }}
                    className={classes.encabezado}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {datos
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => {
                  // console.log(plazasTableRowues.length ? plazasTableRowues.filter(pla => pla.id === item.plaza)[0].localidad_nombre : '-' );
                  if (item !== undefined) {
                    if (item.activo === true) {
                      let data = [];
                      if (
                        item?.categorias !== null &&
                        item?.categorias.length > 0
                      ) {
                        for (let i = 0; i <= item?.categorias.length; i++) {
                          const element = item?.categorias[i];
                          categorias.map((item) => {
                            if (item.id === element) {
                              data.push({
                                icono: item.icono,
                                id: item.id,
                                name: item.label,
                              });
                            }
                          });
                        }
                      }
                      return (
                        <TableRow key={item.id}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">
                            <Button
                              color="secondary"
                              onClick={() => {
                                handleClickOpen();
                                setIdp(item.id);
                              }}
                            >
                              <b>{item.nombre}</b>
                            </Button>
                          </TableCell>
                          <TableCell align="center">
                            {
                              localidades.filter(
                                (local) => local.id === item.localidad
                              )[0]?.label
                            }
                          </TableCell>
                          <TableCell align="center">
                            {cantidades.map((can) => {
                              return item.id === can.id && can.total;
                            })}
                          </TableCell>
                          <TableCell style={{ width: "180px" }} align="center">
                            <Button
                              color="primary"
                              variant="contained"
                              style={{ color: "white", fontSize: "13px" }}
                              onClick={() => handleClickOpen3(item.id)}
                            >
                              Ver categorías
                            </Button>
                          </TableCell>
                          <TableCell align="center">
                            {item.fecha === null ? (
                              <p>No hay fecha</p>
                            ) : (
                              item.fecha.slice(0, 10)
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {item.acciones.map((cat) => {
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
                                            getPla(cat.id);
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
                          </TableCell>
                        </TableRow>
                      );
                    }
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
          title={datos.map((item) => {
            return item !== undefined && item.id === idp && item.nombre;
          })}
          tamaño="sm"
        >
          {datos.map((item) => {
            if (open) {
              let funcionarioss = [];
              let telefonos = [];
              let horarios = [];
              if (item?.usuario !== null && item?.usuario.length > 0) {
                for (let i = 0; i <= item?.usuario.length; i++) {
                  const element = item?.usuario[i];
                  funcionarios.map((item) => {
                    if (item.id === element) {
                      funcionarioss.push(item);
                    }
                  });
                }
              }
              if (item?.telefonos !== null && item?.telefonos.length > 0) {
                for (let i = 0; i <= item?.telefonos.length; i++) {
                  const element = item?.telefonos[i];
                  telefonos.push({ telefono: element });
                }
              }
              if (item?.horarios !== null && item?.horarios.length > 0) {
                for (let i = 0; i <= item?.horarios.length; i++) {
                  horarios.push(item?.horarios[i]);
                }
              }
              if (item !== undefined && item.id === idp) {
                if (item.img) {
                  var deserTableRowef1 = firebase
                    .storage()
                    .ref()
                    .child(`PLAZA/img/${idp}/${item.img}`);
                  deserTableRowef1.getDownloadURL().then(function (url) {
                    var img = document.getElementById(
                      `img${item.id}${item.img}`
                    );
                    img.src = url !== null ? url : "";
                  });
                } else if (!item.img) {
                  var deserTableRowef2 = firebase
                    .storage()
                    .ref()
                    .child(`no-photo.svg`);
                  deserTableRowef2.getDownloadURL().then(function (url) {
                    var img = document.getElementById(
                      `img${item.id}${item.img}`
                    );
                    img.src = url !== null ? url : "";
                  });
                }
                if (item.logo) {
                  var deserTableRowef3 = firebase
                    .storage()
                    .ref()
                    .child(`PLAZA/logo/${idp}/${item.logo}`);
                  deserTableRowef3.getDownloadURL().then(function (url) {
                    var img = document.getElementById(
                      `logo${item.id}${item.logo}`
                    );
                    img.src = url !== null ? url : "";
                  });
                } else if (!item.logo) {
                  var deserTableRowef4 = firebase
                    .storage()
                    .ref()
                    .child(`no-photo.svg`);
                  deserTableRowef4.getDownloadURL().then(function (url) {
                    var img = document.getElementById(
                      `logo${item.id}${item.logo}`
                    );
                    img.src = url !== null ? url : "";
                  });
                }
                return (
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={12} sm={12}>
                      <img
                        src={""}
                        id={`img${item.id}${item.img}`}
                        alt=""
                        width="100%"
                        height="150px"
                      />
                      <p style={{ textAlign: "center" }}>
                        <i>Banner</i>
                      </p>
                      <Divider variant="middle" />
                    </Grid>
                    {/* <Grid
                      item
                      xs={12}
                      sm={4}
                      style={{ textAlign: "center", position: "relative" }}
                    >
                      <img
                        src={""}
                        id={`logo${item.id}${item.logo}`}
                        alt=""
                        width="140px"
                      />
                    </Grid> */}
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
                          <Box
                            bgcolor="primary.main"
                            style={{ borderRadius: "15px", marginTop: "10px" }}
                          >
                            <img
                              src={""}
                              id={`logo${item.id}${item.logo}`}
                              alt=""
                              width="150px"
                              height="150px"
                            />
                          </Box>
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
                          <h4>Funcionarios</h4>
                          {funcionarioss.map((item) => {
                            return (
                              <p key={item.id} style={{ marginBottom: "-5px" }}>
                                {item.label}
                              </p>
                            );
                          })}
                          <br></br>
                          <h4>Dirección</h4>
                          <p>{item.direccion}</p>
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
                            {telefonos.map((item) => {
                              return (
                                <p key={item?.telefono}> {item?.telefono}</p>
                              );
                            })}
                            <h4>Correo elecTableRowónico</h4>
                            <p>{item.email}</p>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            style={{ textAlign: "center" }}
                          >
                            <h4>Horarios</h4>
                            {horarios[1] === "-" ? (
                              <>
                                <p>Lunes: {horarios[0]}</p>
                                <p>Martes: {horarios[0]}</p>
                                <p>Miercoles: {horarios[0]}</p>
                                <p>Jueves: {horarios[0]}</p>
                                <p>Viernes: {horarios[0]}</p>
                                <p>Sabado: {horarios[0]}</p>
                                <p>Domingo: {horarios[0]}</p>
                              </>
                            ) : (
                              <>
                                <p>Lunes: {horarios[0]}</p>
                                <p>Martes: {horarios[1]}</p>
                                <p>Miercoles: {horarios[2]}</p>
                                <p>Jueves: {horarios[3]}</p>
                                <p>Viernes: {horarios[4]}</p>
                                <p>Sabado: {horarios[5]}</p>
                                <p>Domingo: {horarios[6]}</p>
                              </>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              }
            }
          })}
        </Modal>
        <ModalCategorias
          open={open3}
          handleClose={() => setOpen3(false)}
          plaza={datos.filter((item) => item.id === idp3)[0]?.nombre}
          datos={datos.filter((item) => item.id === idp3)}
        />
        <_Eliminar
          open={open1}
          handleClose={handleClose1}
          eliminar={Eliminar}
          titulo3="Desactivar plaza"
          titulo2="de la plaza"
          titulo1="Desea cambiar el estado a inactivo"
          titulo={datos.map((item) => {
            return item !== undefined && item.id === idp2 && item.nombre;
          })}
        />
        <_Actualizar
          open={open2}
          handleClose={handleClose2}
          idPlaza={idp1}
          nombre1={plazas.nombre}
          direccion1={plazas.direccion}
          email1={plazas.email}
          imagen={plazas.img}
          logo1={plazas.logo}
          locali={plazas.localidad_id}
          funcio2={plazas.admin_id}
          cat1={plazas.categorias_id}
          horarios1={plazas.horarios}
          telefonos1={plazas.telefonos}
        />
      </Grid>
    </Grid>
  );
};

TablaPlazas.propTypes = {
  datos: PropTypes.array,
  getPlaza: PropTypes.func,
};

export default TablaPlazas;
