import React, { useState } from "react";
// import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import TooltipE from "./../../tooltip";
import Modal from "./../../modal";
import _Eliminar from "./../../modal/Eliminar.jsx";
import ActualizarLoc from "../../modal/Productos/ActualizarLoc";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { DeleteProducto } from "actions/producto";
import { useDispatch, useSelector } from "react-redux";
import { DeleteProductoLoc } from "actions/producto";
import Actualizar from "components/shared/modal/Productos/Actualizar";
import Formatear from "components/shared/formatoNumero/Formatear_numeros";
import useStyles from "../style";
import firebase from "firebase";

const TablaProducto = ({ getDatos, datos, rol, locatario }) => {
  const dispatch = useDispatch();
  const { plazastrues, categorias } = useSelector((state) => state.plaza);
  const { productos, prolocatarios } = useSelector((state) => state.producto);

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [producto, setProducto] = useState([]);
  const [proloc, setProLoc] = useState([]);
  const [idp, setIdp] = useState(0);
  const [idp1, setIdp1] = useState(0);
  const [idp2, setIdp2] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    getDatos();
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
  console.log(proloc);
  const tableItems = datos?.map((item, index) => {
    if (rol === "SUPER_ADMIN") {
      let plazaAc = [];
      let CateAc = [];
      if (item?.plaza !== null && item?.plaza.length > 0) {
        for (let index = 0; index < item?.plaza.length; index++) {
          const element = item?.plaza[index];
          plazastrues?.map((item) => {
            if (item?.id === element) {
              plazaAc.push(item);
            }
          });
        }
      }
      console.log(item);
      if (item?.categorias !== null && item?.categorias.length > 0) {
        for (let index = 0; index < item?.categorias.length; index++) {
          const element = item?.categorias[index];
          categorias?.map((item) => {
            if (item?.id === element) {
              CateAc.push(item);
            }
          });
        }
      }
      return (
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>
            <Button
              color="secondary"
              onClick={() => {
                handleClickOpen();
                setIdp(item.id);
              }}
            >
              <b>{item.nombre}</b>
            </Button>
          </td>
          <td>{item.sku}</td>
          <td>{item.activo}</td>
          <td>
            {plazaAc?.map((item) => {
              return <p key={item.id}>{item?.nombre}</p>;
            })}
          </td>
          <td>
            {CateAc?.map((item) => {
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
          </td>
          <td>
            {item.fecha === null ? (
              <p>No hay fecha</p>
            ) : (
              item.fecha.slice(0, 10)
            )}
          </td>
          <td>
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
          </td>
        </tr>
      );
    } else {
      return (
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>
            <Button
              color="secondary"
              onClick={() => {
                handleClickOpen();
                setIdp(item.id);
              }}
            >
              <b>
                {
                  productos.filter((pro) => pro.id === item.producto_id)[0]
                    ?.nombre
                }
              </b>
            </Button>
          </td>
          <td>
            {productos.filter((pro) => pro.id === item.producto_id)[0]?.sku}
          </td>
          <td>{item.activo}</td>
          <td>
            <b>$ </b>
            {Formatear(item.precio)}
          </td>
          <td>{item.en_promocion}</td>
          <td>{item.stock}</td>
          <td>
            {item.fecha === null ? (
              <p>No hay fecha</p>
            ) : (
              item.fecha.slice(0, 10)
            )}
          </td>
          <td>
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
          </td>
        </tr>
      );
    }
  });

  return (
    <div className="table-responsive">
      <table className="table ps-table" style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del producto</th>
            <th>SKU</th>
            <th>Estado</th>
            {rol === "SUPER_ADMIN" ? (
              <>
                <th>Plaza</th>
                <th>Categorías</th>{" "}
              </>
            ) : (
              <>
                <th>Precio</th>
                <th>En promoción</th>
                <th>Inventario</th>
              </>
            )}
            <th>Fechas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{tableItems}</tbody>
      </table>
      <Modal
        open={open}
        handleClose={handleClose}
        title={datos?.filter((item) => item?.id === idp)[0]?.nombre}
        tamaño="xs"
      >
        {rol === "SUPER_ADMIN"
          ? datos?.map((item) => {
              if (open && idp === item.id) {
                let plazasP = [];
                if (item.plaza.length > 0) {
                  for (let index = 0; index < item.plaza.length; index++) {
                    const element = item.plaza[index];
                    plazastrues.map((pla) => {
                      if (pla.id === element) {
                        plazasP.push(pla);
                      }
                    });
                  }
                }
                if (item.imagen_principal) {
                  var desertRef1 = firebase
                    .storage()
                    .ref()
                    .child(
                      `PRODUCTO/imagen_principal/${idp}/${item.imagen_principal}`
                    );
                  desertRef1.getDownloadURL().then(function (url) {
                    var img = document.getElementById(
                      `imagen_principal${item.imagen_principal}`
                    );
                    console.log(url);
                    if (url) {
                      img.src = url;
                    }
                  });
                } else {
                  var desertRef2 = firebase
                    .storage()
                    .ref()
                    .child(`no-photo.svg`);
                  desertRef2.getDownloadURL().then(function (url) {
                    var img = document.getElementById(
                      `imagen_principal${item.imagen_principal}`
                    );
                    console.log(url);
                    if (url) {
                      img.src = url;
                    }
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
                } else {
                  var desertRef4 = firebase
                    .storage()
                    .ref()
                    .child(`no-photo.svg`);
                  desertRef4.getDownloadURL().then(function (url) {
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
                } else {
                  var desertRef6 = firebase
                    .storage()
                    .ref()
                    .child(`no-photo.svg`);
                  desertRef6.getDownloadURL().then(function (url) {
                    var img = document.getElementById(
                      `imagen_2${item.imagen_2}`
                    );
                    console.log(url);
                    if (url) {
                      img.src = url;
                    }
                  });
                }
                console.log(plazasP);
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
                          src={""}
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
                                src={""}
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
                                src={""}
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
                          <h5>PLAZAS</h5>
                          {plazasP.map((item) => {
                            return <p key={item.id}>{item.nombre}</p>;
                          })}
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
                          <h5>UNIDAD</h5>
                          <p>
                            {item.unidad
                              ? item.unidad
                              : "El producto no tiene unidades"}
                          </p>
                        </Grid>
                        <Divider variant="middle" />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        style={{ textAlign: "center" }}
                      >
                        <h5>DESCRIPCIÓN</h5>
                        <p>
                          {item.descripcion
                            ? item.descripcion
                            : "El producto no tiene escripción"}
                        </p>
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
                    <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
                      <h3 style={{ color: "#E9B029" }}>
                        {
                          productos.filter(
                            (pro) => pro.id === item.producto_id
                          )[0]?.nombre
                        }
                        : $ {Formatear(item.precio)}
                      </h3>
                      <Divider variant="middle" />
                      <br></br>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
                      <h5>SKU</h5>
                      <p>{item.sku ? item.sku : "El producto no tiene sku"}</p>
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
                    <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
                      <h5>CANTIDAD POR UNIDAD: </h5>
                      {item.cantidad_unidad}
                      <Divider variant="middle" />
                      <br></br>
                    </Grid>
                    <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
                      <h5>PRECIO DE LA PROMOCIÓN: </h5>
                      <p style={{ color: "#E9B029", fontSize: "16px" }}>
                        $ {Formatear(item.precio_rebajado)}
                      </p>
                      <Divider variant="middle" />
                      <br></br>
                    </Grid>
                    <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
                      <h5>DESCRIPCIÓN</h5>
                      <p>
                        {item.descripcion
                          ? item.descripcion
                          : "El producto no tiene escripción"}
                      </p>
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
            ? datos.filter((item) => {
                item.id === idp2;
              })[0]?.nombre
            : productos.filter(
                (pro) =>
                  pro.id ===
                  datos.filter((item) => {
                    item.id === idp2;
                  })[0]?.producto_id
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
    </div>
  );
};

TablaProducto.propTypes = {
  datos: PropTypes.array,
  getDatos: PropTypes.func,
  rol: PropTypes.string,
  locatario: PropTypes.object,
};

export default TablaProducto;
