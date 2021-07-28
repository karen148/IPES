import React, { useState } from "react";
import firebase from "firebase";
import { DeleteProducto } from "actions/producto";
import { useDispatch, useSelector } from "react-redux";
import { DeleteProductoLoc } from "actions/producto";

//Material
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import * as locales from "@material-ui/core/locale";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

//Componentes
import TooltipE from "./../../tooltip";
import Modal from "./../../modal";
import _Eliminar from "./../../modal/Eliminar.jsx";
import ActualizarLoc from "../../modal/Productos/ActualizarLoc";
import Actualizar from "components/shared/modal/Productos/Actualizar";
import Formatear from "components/shared/formatoNumero/Formatear_numeros";
import useStyles from "../style";
import PropTypes from "prop-types";
import ModalPlazas from "components/shared/modal/ModalPlazas";

const TablaProducto = ({ getDatos, datos, rol, locatario, img }) => {
  const dispatch = useDispatch();
  const { categorias } = useSelector((state) => state.plaza);
  const { productos, prolocatarios } = useSelector((state) => state.producto);

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [img1, setImg1] = useState(img);
  const [producto, setProducto] = useState([]);
  const [proloc, setProLoc] = useState([]);
  const [idp, setIdp] = useState(0);
  const [idp1, setIdp1] = useState(0);
  const [idp2, setIdp2] = useState(0);
  const [idp3, setIdp3] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const columns1 = [
    { id: "id", label: "ID", width: "30px" },
    { id: "nombre", label: "Nombre del producto", width: "200px" },
    { id: "unidad", label: "Unidad", width: "200px" },
    { id: "estado", label: "Estado" },
    { id: "plaza", label: "Plaza" },
    { id: "categorías", label: "Categorías" },
    { id: "fechas", label: "Fechas" },
    { id: "acciones", label: "Acciones", width: "200px" },
  ];

  const columns2 = [
    { id: "id", label: "ID" },
    { id: "nombre", label: "Nombre del producto" },
    { id: "sku", label: "SKU" },
    { id: "estado", label: "Estado" },
    { id: "precio", label: "Precio" },
    { id: "promocion", label: "En promoción" },
    { id: "inventario", label: "Inventario" },
    { id: "fecha", label: "Fechas" },
    { id: "acciones", label: "Acciones" },
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

  const handleClose1 = () => {
    setOpen1(false);
    getDatos();
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
    getDatos();
  };

  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClickOpen4 = (id) => {
    setOpen4(true);
    setIdp3(id);
  };

  const handleClose3 = () => {
    setOpen3(false);
    getDatos();
  };

  const Eliminar = () => {
    if (rol === "SUPER_ADMIN") {
      dispatch(DeleteProducto(idp2));
    } else {
      dispatch(DeleteProductoLoc(idp2));
    }
    getDatos();
  };

  const _Actualizar = (id) => {
    setProducto(productos.filter((item) => item.id === id)[0]);
  };

  const _ActualizarLoc = (id) => {
    setProLoc(prolocatarios.filter((item) => item.id === id)[0]);
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead color="#DE9E12">
              <TableRow>
                {rol === "SUPER_ADMIN"
                  ? columns1.map((column) => (
                      <TableCell
                        key={column.id}
                        align="center"
                        style={{ minWidth: column.width }}
                        className={classes.encabezado}
                      >
                        {column.label}
                      </TableCell>
                    ))
                  : columns2.map((column) => (
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
                  if (rol === "SUPER_ADMIN") {
                    let CateAc = [];
                    var date = new Date(item.fecha);
                    var options = {
                      weekday: "long",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    };
                    if (
                      item?.categorias !== null &&
                      item?.categorias.length > 0
                    ) {
                      for (
                        let index = 0;
                        index < item?.categorias.length;
                        index++
                      ) {
                        const element = item?.categorias[index];
                        categorias?.map((item) => {
                          if (item?.id === element) {
                            CateAc.push(item);
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
                        <TableCell align="center">{item.unidad}</TableCell>
                        <TableCell align="center">{item.activo}</TableCell>
                        <TableCell align="center">
                          <Button
                            color="primary"
                            variant="contained"
                            style={{ color: "white", fontSize: "13px" }}
                            onClick={() => handleClickOpen4(item.id)}
                          >
                            Ver plazas
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          {CateAc?.map((item) => {
                            return <p key={item.id}>{item.label}</p>;
                          })}
                        </TableCell>
                        <TableCell align="center">
                          {item.fecha ? (
                            <p>No hay fecha</p>
                          ) : (
                            date.toLocaleDateString("es-CO", options)
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {item.acciones.map((cat) => {
                            return (
                              <TooltipE title={cat.name} key={cat.name}>
                                <IconButton
                                  component="span"
                                  key={cat.name}
                                  className={classes.iconos}
                                  onClick={
                                    cat.name === "Editar"
                                      ? () => {
                                          handleClickOpen3();
                                          setIdp1(cat.id);
                                          _Actualizar(cat.id);
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
                  } else {
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
                            productos.filter(
                              (pro) => pro.id === item.producto_id
                            )[0]?.sku
                          }
                        </TableCell>
                        <TableCell align="center">{item.activo}</TableCell>
                        <TableCell align="center">
                          <b>$ </b>
                          {Formatear(item.precio)}
                        </TableCell>
                        <TableCell align="center">
                          {item.en_promocion}
                        </TableCell>
                        <TableCell align="center">{item.stock}</TableCell>
                        <TableCell align="center">
                          {item.fecha ? (
                            <p>No hay fecha</p>
                          ) : (
                            date?.toLocaleDateString("es-CO", options)
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {item.acciones.map((cat) => {
                            return (
                              <TooltipE title={cat.name} key={cat.name}>
                                <IconButton
                                  component="span"
                                  key={cat.name}
                                  className={classes.iconos}
                                  onClick={
                                    cat.name === "Editar"
                                      ? () => {
                                          handleClickOpen2();
                                          setIdp1(cat.id);
                                          _ActualizarLoc(cat.id);
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
          title={datos
            ?.filter((item) => item?.id === idp)[0]
            ?.nombre?.toUpperCase()}
          tamaño="xs"
        >
          {rol === "SUPER_ADMIN"
            ? datos?.map((item) => {
                if (open && idp === item.id) {
                  if (item.imagen_principal) {
                    var desertRef1 = firebase
                      .storage()
                      .ref()
                      .child(
                        `PRODUCTO/imagen_principal/${idp}/${item.imagen_principal}`
                      );
                    desertRef1.getDownloadURL().then(function (url) {
                      setImg1(url);
                      // var img = document.getElementById(
                      //   `imagen_principal${item.imagen_principal}`
                      // );
                      // console.log(url);
                      // if (url) {
                      //   img.src = url;
                      // }
                    });
                  }
                  if (item.imagen_1) {
                    var desertRef3 = firebase
                      .storage()
                      .ref()
                      .child(`PRODUCTO/imagen_1/${idp}/${item.imagen_1}`);
                    desertRef3.getDownloadURL().then(function (url) {
                      var img = document.getElementById(
                        `imagen_1${item.imagen_1}`
                      );
                      console.log(url);
                      if (url) {
                        img.src = url;
                      }
                    });
                  }
                  if (item.imagen_2) {
                    var desertRef5 = firebase
                      .storage()
                      .ref()
                      .child(`PRODUCTO/imagen_2/${idp}/${item.imagen_2}`);
                    desertRef5.getDownloadURL().then(function (url) {
                      var img = document.getElementById(
                        `imagen_2${item.imagen_2}`
                      );
                      console.log(url);
                      if (url) {
                        img.src = url;
                      }
                    });
                  }
                  if (item !== undefined && item?.id === idp) {
                    return (
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          style={{ textAlign: "center" }}
                        >
                          <img
                            src={img1 ? img1 : img}
                            id={`imagen_principal${item.imagen_principal}`}
                            alt=""
                            width="150px"
                            height="150px"
                          />
                          <p style={{ textAlign: "center" }}>
                            <i>Imagen principal</i>
                          </p>
                          <Divider variant="middle" />
                        </Grid>
                        {item.imagen_1 || item.imagen_2 ? (
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            style={{ textAlign: "center" }}
                          >
                            <br></br>
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
                                <img
                                  src={img}
                                  id={`imagen_1${item.imagen_1}`}
                                  alt=""
                                  width="150px"
                                  height="150px"
                                />
                                <p style={{ textAlign: "center" }}>
                                  <i>Imagen 1°</i>
                                </p>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={6}
                                style={{ textAlign: "center" }}
                              >
                                <img
                                  src={img}
                                  alt=""
                                  id={`imagen_2${item.imagen_2}`}
                                  width="150px"
                                  height="150px"
                                />
                                <p style={{ textAlign: "center" }}>
                                  <i>Imagen 2°</i>
                                </p>
                              </Grid>
                            </Grid>
                            <Divider variant="middle" />
                            <br></br>
                          </Grid>
                        ) : (
                          <p>El producto no tiene imagenes en la galería</p>
                        )}
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
                            <h5>UNIDAD</h5>
                            <p>
                              {item.unidad
                                ? item.unidad
                                : "El producto no tiene unidades"}
                            </p>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            style={{ textAlign: "center" }}
                          >
                            <h5>SKU</h5>
                            <p>
                              {item.sku ? item.sku : "El producto no tiene sku"}
                            </p>
                          </Grid>
                          <Divider variant="middle" />
                        </Grid>
                      </Grid>
                    );
                  }
                }
              })
            : datos?.map((item) => {
                if (item !== undefined && item?.id === idp) {
                  return (
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        style={{ textAlign: "center" }}
                      >
                        <h3 style={{ color: "#E9B029" }}>
                          {
                            productos.filter(
                              (pro) => pro.id === item.producto_id
                            )[0]?.nombre
                          }
                          : $ {item.precio ? Formatear(item.precio) : ""}
                        </h3>
                        <Divider variant="middle" />
                        <br></br>
                      </Grid>
                      <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
                        <h5>SKU</h5>
                        <p>
                          {
                            productos.filter(
                              (pro) => pro.id === item.producto_id
                            )[0]?.sku
                          }
                        </p>
                        <Divider variant="middle" />
                      </Grid>
                      <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
                        <h5>UNIDAD</h5>
                        <p>
                          {
                            productos.filter(
                              (pro) => pro.id === item.producto_id
                            )[0]?.unidad
                          }
                        </p>
                        <Divider variant="middle" />
                        <br></br>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        style={{ textAlign: "center" }}
                      >
                        <h5>PRECIO DE LA PROMOCIÓN: </h5>
                        <p style={{ color: "#E9B029", fontSize: "16px" }}>
                          $ {Formatear(item.precio_rebajado)}
                        </p>
                        <Divider variant="middle" />
                        <br></br>
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
          titulo1="Desea desactivar"
          titulo3="Eliminar producto"
          titulo2="el producto"
          titulo={
            rol === "SUPER_ADMIN"
              ? datos.filter((item) => item.id === idp2)[0]?.nombre
              : productos.filter(
                  (pro) =>
                    pro.id ===
                    datos.filter((item) => item.id === idp2)[0]?.producto_id
                )[0]?.nombre
          }
        />
        <Actualizar
          open={open3}
          handleClose={handleClose3}
          rol={rol}
          idProducto={idp1}
          nombrepro={producto?.nombre}
          plazapro={producto?.plaza}
          categorias1={producto?.categorias}
          sku1={producto?.sku}
          unidad1={producto?.unidad}
          imagen_principal={producto?.imagen_principal}
          imagen1={producto?.imagen_1}
          imagen2={producto?.imagen_2}
        />
        <ActualizarLoc
          open={open2}
          handleClose={handleClose2}
          rol="ADMIN_LOCATARIO"
          locatario={locatario}
          idPro={idp1}
          idProducto={proloc?.producto_id}
          stock={proloc?.stock === "Sí hay" ? true : false}
          en_promocion={proloc?.en_promocion === "Sí" ? true : false}
          descripcion1={proloc?.descripcion}
          cantidad_unidad={proloc?.cantidad_unidad}
          precio_rebajado={proloc?.precio_rebajado}
          precio1={proloc?.precio}
        />
        <ModalPlazas
          open={open4}
          handleClose={() => setOpen4(false)}
          titulo={
            "LISTADO DE PLAZAS DEL PRODUCTO " +
            datos.filter((item) => item.id === idp3)[0]?.nombre
          }
          mensaje={"No hay plazas asignadas para el producto"}
          datos={datos.filter((item) => item.id === idp3)}
        />
      </Grid>
    </Grid>
  );
};

TablaProducto.propTypes = {
  datos: PropTypes.array,
  getDatos: PropTypes.func,
  rol: PropTypes.string,
  locatario: PropTypes.object,
  img: PropTypes.string,
};

export default TablaProducto;
