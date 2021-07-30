import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCantidades } from "../../../../actions/plaza";
import {
  DeleteLocatario,
  getLocatarioId,
  getLocatarioCedula,
} from "actions/locatarios";
import { Img } from "actions/imagen";
import { getProductoLocatario } from "actions/producto";

//Material
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import * as locales from "@material-ui/core/locale";
import Button from "@material-ui/core/Button";

//Componentes
import TooltipE from "./../../tooltip";
import Modal from "./../../modal";
import _Eliminar from "./../../modal/Eliminar.jsx";
import _Actualizar from "./../../modal/Locatarios/Actualizar";
import Crear from "components/shared/modal/Productos/Crear";
import TablaProducto from "../TablaProductos";

//Style
import useStyles from "../style";
import PropTypes from "prop-types";
import ModalLocatario from "components/shared/modal/ModalLocatario";
import ModalCategorias from "components/shared/modal/ModalCategoria";

const TablaLocatarios = ({ datos, getLocali, noimg }) => {
  const { plazastrues, categorias, localidades } = useSelector(
    (state) => state.plaza
  );
  const { prolocatarios, msg } = useSelector((state) => state.producto);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [telefono1, setTelefono1] = useState([]);
  const [horario1, setHorario1] = useState([]);
  const [local3, setLocal3] = useState([]);
  const [locatario, setLocatario] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [open6, setOpen6] = React.useState(false);
  const [opent, setOpent] = React.useState(false);
  const [locatario2, setLocatario2] = useState([]);
  const [idp, setIdp] = useState(0);
  const [idp1, setIdp1] = useState(0);
  const [idp2, setIdp2] = useState(0);
  const [idp3, setIdp3] = useState(0);
  const [idp4, setIdp4] = useState(0);
  const [idp5, setIdp5] = useState(0);

  const columns = [
    { id: "id", label: "ID", width: "30px" },
    { id: "número", label: "Nombre del local", width: "200px" },
    { id: "locatario", label: "Locatario", width: "200px" },
    { id: "local", label: "Local" },
    { id: "estado", label: "Estado" },
    { id: "categorias", label: "Categorías" },
    { id: "acciones", label: "Acciones", width: "200px" },
  ];

  useEffect(() => {
    dispatch(getCantidades());
  }, [dispatch]);

  useEffect(() => {
    if (locatario?.id) {
      DatosLocatario();
    }
  }, [locatario]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = (id) => {
    setOpen(true);
    dispatch(getLocatarioId(setLocatario, id));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
    getLocali();
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClickOpen5 = (id) => {
    setOpen5(true);
    setIdp4(id);
  };

  const handleClose2 = () => {
    setOpen2(false);
    getLocali();
  };

  const handleClose4 = () => {
    setOpen4(false);
    getDatosPro();
  };

  const handleClickOpen6 = (id) => {
    setOpen6(true);
    setIdp5(id);
  };

  const handleClose6 = () => {
    setOpen6(false);
    getLocali();
  };

  const datoActualizar = (idL) => {
    setLocal3(datos?.filter((item) => item?.id === idL));
  };

  const Eliminar = () => {
    dispatch(DeleteLocatario(idp2));
  };

  const getDatosPro = () => {
    dispatch(getProductoLocatario(idp3));
  };

  const DatosLocatario = () => {
    var telefonoss = [];
    var horarios = [];
    console.log(locatario);
    dispatch(
      Img(
        `LOCATARIOS/img/${locatario.id}/${locatario.img}`,
        setImg1,
        locatario.img
      )
    );
    dispatch(
      Img(
        `LOCATARIOS/logo/${locatario.id}/${locatario.logo}`,
        setImg2,
        locatario.logo
      )
    );
    if (locatario.telefonos) {
      if (locatario.telefonos.length > 0) {
        for (let i = 0; i <= locatario?.telefonos.length; i++) {
          const element = locatario?.telefonos[i];
          if (element) {
            console.log(element);
            telefonoss.push({ telefono: element });
            setTelefono1(telefonoss);
          }
        }
      } else {
        telefonoss.push({ telefono: "El locatario no tiene telefonos" });
        setTelefono1(telefonoss);
      }
    } else {
      telefonoss.push({ telefono: "El locatario no tiene telefonos" });
      setTelefono1(telefonoss);
    }

    if (locatario.horarios.length > 0) {
      let horario = [];
      locatario.horarios.forEach((element) => {
        horario.push(JSON.parse(element.split("/")));
      });
      setHorario1(horario);
    } else {
      horarios.push("No tiene horario");
      setHorario1(horarios);
    }
  };

  console.log(idp);
  console.log(noimg);
  console.log(idp3);
  console.log(prolocatarios);
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead color="#DE9E12">
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={3}
                  className={classes.encabezado}
                >
                  Plaza:{" "}
                  {
                    plazastrues.filter((item) => item.id === datos[0]?.plaza)[0]
                      ?.nombre
                  }
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={4}
                  className={classes.encabezado}
                >
                  Localidad:{" "}
                  {
                    localidades.filter(
                      (loc) =>
                        loc.id ===
                        plazastrues.filter(
                          (item) => item.id === datos[0]?.plaza
                        )[0]?.localidad_id
                    )[0]?.label
                  }
                </TableCell>
              </TableRow>
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
                .map((item) => {
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
                        ? plazastrues.filter((pla) => pla?.id === item.plaza)[0]
                            ?.localidad_id
                        : "-"
                    );
                    return (
                      <>
                        <TableRow key={`${item.id}`}>
                          <TableCell align="center">{item.conteo}</TableCell>
                          <TableCell align="center">
                            {item.local ? (
                              <Button
                                color="secondary"
                                key={`${item.local}`}
                                onClick={() => {
                                  handleClickOpen(item.id);
                                  setIdp(item.id);
                                }}
                              >
                                <b style={{ fontSize: "14px" }}>{item.local}</b>
                              </Button>
                            ) : (
                              <h5 className={classes.error}>---</h5>
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {" "}
                            <p style={{ fontSize: "14px" }}>
                              {item.nombre ? (
                                item.nombre.toUpperCase()
                              ) : (
                                <h5 className={classes.error}>---</h5>
                              )}
                            </p>
                          </TableCell>
                          <TableCell align="center">
                            {item.numero_local ? (
                              item.numero_local.length === 1 ? (
                                item.numero_local
                              ) : (
                                <Button
                                  color="primary"
                                  variant="contained"
                                  style={{ color: "white" }}
                                  onClick={() => handleClickOpen5(item.id)}
                                >
                                  NÚMEROS
                                </Button>
                              )
                            ) : (
                              <h5 className={classes.error}>---</h5>
                            )}
                          </TableCell>
                          <TableCell key={`${item.activo}`} align="center">
                            {item.activo}
                          </TableCell>
                          <TableCell
                            key={`${item.activo}${item.local}`}
                            style={{ width: "180px" }}
                            align="center"
                          >
                            <Button
                              color="primary"
                              variant="contained"
                              style={{ color: "white", fontSize: "13px" }}
                              onClick={() => handleClickOpen6(item.id)}
                            >
                              Ver categorías
                            </Button>
                          </TableCell>
                          <TableCell align="center">
                            {item?.acciones.map((cat) => {
                              return (
                                <TooltipE title={cat.name} key={cat.name}>
                                  <IconButton
                                    component="span"
                                    key={cat.name}
                                    size="small"
                                    className={classes.iconos}
                                    onClick={
                                      cat.name === "Editar"
                                        ? () => {
                                            handleClickOpen2();
                                            setIdp1(cat.id);
                                            datoActualizar(cat.id);
                                          }
                                        : cat.name === "Eliminar"
                                        ? () => {
                                            handleClickOpen1();
                                            setIdp2(cat.id);
                                          }
                                        : () => {
                                            setOpent(!opent);
                                            setIdp3(cat.id);
                                            dispatch(
                                              getProductoLocatario(cat.id)
                                            );
                                            dispatch(
                                              getLocatarioCedula(
                                                setLocatario2,
                                                item.cedula
                                              )
                                            );
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
                        <TableRow>
                          <TableCell
                            style={{ paddingBottom: 0, paddingTop: 0 }}
                            colSpan={7}
                          >
                            <Collapse
                              in={item.id === idp3 && opent}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                              >
                                <Grid item xs={12} md={12}>
                                  <Box
                                    margin={1}
                                    borderColor="#DE9E12"
                                    borderRight={0}
                                    borderLeft={0}
                                    border={2}
                                    padding={2}
                                  >
                                    <a
                                      className="ps-btn success2"
                                      color="#450016"
                                      onClick={() => setOpen4(true)}
                                    >
                                      <AddIcon />
                                      Agregar Producto
                                    </a>
                                    {msg === "error" ? (
                                      <h3
                                        style={{
                                          textAlign: "center",
                                          color: "#FF2D42",
                                        }}
                                      >
                                        El locatario no tiene productos
                                      </h3>
                                    ) : (
                                      <>
                                        <Typography
                                          variant="h6"
                                          gutterBottom
                                          component="div"
                                          style={{
                                            textAlign: "center",
                                            fontWeight: "bold",
                                            color: "#450016",
                                          }}
                                        >
                                          Productos del local
                                        </Typography>
                                        <TablaProducto
                                          datos={prolocatarios}
                                          rol={"ADMIN_LOCATARIO"}
                                          getDatos={getDatosPro}
                                          locatario={locatario2}
                                        />
                                      </>
                                    )}
                                  </Box>
                                </Grid>
                              </Grid>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </>
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
          title={
            locatario.nombre_local
              ? locatario.nombre_local
              : "EL LOCAL NO TIENE NOMBRE"
          }
          tamaño="sm"
        >
          {locatario && (
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={12}>
                <img src={img1} alt="" id="myimg" width="100%" height="150px" />
                <p style={{ textAlign: "center" }}>
                  <i>Banner</i>
                </p>
                <Divider variant="middle" />
                <br></br>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
                    <img src={img2} alt="" width="150px" height="150px" />
                    <p style={{ textAlign: "center" }}>
                      <i>Logo</i>
                    </p>
                  </Grid>
                  <Grid item xs={12} sm={8} style={{ textAlign: "center" }}>
                    <h4>Locatario</h4>
                    {locatario.nombre}
                    <br></br>
                    <h4>Cédula</h4>
                    <p>{locatario.cedula}</p>
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
                    <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
                      <h4>Teléfonos</h4>
                      {telefono1.map((item) => {
                        return <p key={item?.telefono}> {item?.telefono}</p>;
                      })}
                      <h4>Correo electrónico</h4>
                      <p>{locatario.email}</p>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
                      <h4>Horarios</h4>
                      {horario1.map((h, i) => {
                        return (
                          <p key={i + 1}>
                            {h.name}: {h.inicio} - {h.finalizar}
                          </p>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Modal>
        <Crear
          key="2015"
          open={open4}
          handleClose={handleClose4}
          locatario={locatario2}
          rol="ADMIN_LOCATARIO"
        />
        <_Eliminar
          open={open1}
          handleClose={handleClose1}
          eliminar={Eliminar}
          titulo3="Cambiar de estado"
          titulo2="el locatario"
          titulo={datos.filter((item) => item?.id === idp2)[0]?.nombre}
        />
        <_Actualizar
          open={open2}
          handleClose={handleClose2}
          idLocatario={idp1}
          loc1={local3?.length > 0 && local3[0]?.local}
          ced1={local3?.length > 0 && local3[0]?.cedula}
          nom1={local3?.length > 0 && local3[0]?.nombre}
          ape1={local3?.length > 0 && local3[0]?.apellido}
          email1={local3?.length > 0 && local3[0]?.email}
          telefonos1={local3?.length > 0 && local3[0]?.telefonos}
          plaza1={local3?.length > 0 && local3[0]?.plaza}
          categorias1={local3?.length > 0 && local3[0]?.categorias}
          horarios2={local3?.length > 0 && local3[0]?.horarios}
          imagen2={local3?.length > 0 && local3[0]?.img}
          logo2={local3?.length > 0 && local3[0]?.logo}
          numero_local={local3?.length > 0 && local3[0]?.numero_local}
          productos1={local3?.length > 0 && local3[0]?.productos}
          locatarios={datos}
        />
        <ModalLocatario
          open={open5}
          handleClose={() => setOpen5(false)}
          locatario={datos.filter((item) => item.id === idp4)[0]?.nombre}
          datos={datos.filter((item) => item.id === idp4)}
        />
        <ModalCategorias
          open={open6}
          handleClose={handleClose6}
          titulo={
            "LISTADO DE CATEGORÍAS DEL LOCATARIO " +
            datos.filter((item) => item.id === idp5)[0]?.nombre
          }
          mensaje={"El locatario no tiene categorías asignadas"}
          datos={datos.filter((item) => item.id === idp5)}
        />
      </Grid>
    </Grid>
  );
};

TablaLocatarios.propTypes = {
  datos: PropTypes.array,
  getLocali: PropTypes.func,
  noimg: PropTypes.string,
};

export default TablaLocatarios;
