import React, { useState } from "react";
// import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import TooltipE from "./../../tooltip";
import Modal from "./../../modal";
import _Eliminar from "./../../modal/Eliminar.jsx";
import _Actualizar from "./../../modal/Productos/Actualizar";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { DeleteProducto } from "actions/producto";
import { useDispatch, useSelector } from "react-redux";

const TablaProducto = ({ getDatos, datos }) => {
  const { plazastrues, categorias } = useSelector((state) => state.plaza);
  const { productos } = useSelector((state) => state.producto);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [producto, setProducto] = useState(false);
  const [idp, setIdp] = useState(0);
  const [idp1, setIdp1] = useState(0);
  const [idp2, setIdp2] = useState(0);

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

  const Eliminar = () => {
    dispatch(DeleteProducto(idp2));
    getDatos();
  };

  const Actualizar = (id) => {
    setProducto(productos.filter((item) => item.id === id)[0]);
  };

  const tableItems = datos?.map((item, index) => {
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
          {item.fecha === null ? <p>No hay fecha</p> : item.fecha.slice(0, 10)}
        </td>
        <td>
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
                          Actualizar(cat.id);
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
            <th>Plaza</th>
            <th>Categorías</th>
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
        {datos?.map((item) => {
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
          console.log(plazasP);
          if (item !== undefined && item?.id === idp) {
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
                      `uploads/retorna/PRODUCTOS/${item.imagen_principal}`
                    }
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
                  <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
                    <br></br>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
                        <img
                          src={
                            process.env.REACT_APP_URL_API +
                            `uploads/retorna/PRODUCTOS/${item.imagen_1}`
                          }
                          alt=""
                          width="150px"
                          height="150px"
                        />
                        <p style={{ textAlign: "center" }}>
                          <i>Imagen 1°</i>
                        </p>
                      </Grid>
                      <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
                        <img
                          src={
                            process.env.REACT_APP_URL_API +
                            `uploads/retorna/PRODUCTOS/${item.imagen_2}`
                          }
                          alt=""
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
                  <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
                    <h5>PLAZAS</h5>
                    {plazasP.map((item) => {
                      return <p key={item.id}>{item.nombre}</p>;
                    })}
                  </Grid>
                  <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
                    <h5>SKU</h5>
                    <p>{item.sku ? item.sku : "El producto no tiene sku"}</p>
                  </Grid>
                  <Divider variant="middle" />
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
        titulo3="Eliminar producto"
        titulo2="el producto"
        titulo={
          datos.filter((item) => {
            item.id === idp2;
          })[0]?.nombre
        }
      />
      <_Actualizar
        open={open2}
        handleClose={handleClose2}
        idProducto={idp1}
        nombrepro={producto?.nombre}
        plazapro={producto?.plaza}
        categorias1={producto?.categorias}
        sku1={producto?.sku}
        descripcion1={producto?.descripcion}
        imagen_principal={producto?.imagen_principal}
        imagen1={producto?.imagen_1}
        imagen2={producto?.imagen_2}
      />
    </div>
  );
};

TablaProducto.propTypes = {
  datos: PropTypes.array,
  getDatos: PropTypes.func,
};

export default TablaProducto;
