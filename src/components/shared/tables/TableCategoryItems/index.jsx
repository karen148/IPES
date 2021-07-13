import React, { useState } from "react";
// import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import TooltipE from "./../../tooltip";
import Modal from "./../../modal";
import _Eliminar from "./../../modal/Eliminar.jsx";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { DeleteCategoria } from "actions/categoria";
import _Actualizar from "components/shared/modal/Categoria/Actualizar";
import useStyles from "../style";
import { Img } from "actions/imagen";

const TableCategoryItems = ({ datos, getDatos }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState("");
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [idp, setIdp] = useState(0);
  const [idp1, setIdp1] = useState(0);
  const [idp2, setIdp2] = useState(0);
  const [categoria, setCategoria] = useState([]);

  /*INFORMACIÓN*/
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /*ELIMINAR*/
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
    getDatos();
  };

  const Eliminar = () => {
    dispatch(DeleteCategoria(idp2));
  };

  /*ACTUALIZAR*/
  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
    getDatos();
  };

  const datoActualizar = (idL) => {
    setCategoria(datos.filter((item) => item.id === idL));
  };
  console.log(img);
  const tableItems = datos.map((item, index) => {
    if (item.activo === true) {
      return (
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>
            <Button
              color="secondary"
              onClick={() => {
                handleClickOpen();
                setIdp(item.id);
                dispatch(
                  Img(`CATEGORIAS/${item.id}/${item.icono}`, setImg, item.icono)
                );
              }}
            >
              <b>{item.nombre}</b>
            </Button>
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
                    color="default"
                    component="span"
                    key={cat.name}
                    onClick={
                      cat.name === "Editar"
                        ? () => {
                            handleClickOpen1();
                            setIdp1(cat.id);
                            datoActualizar(cat.id);
                          }
                        : () => {
                            handleClickOpen2();
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
      <table className="table ps-table text-center">
        <thead>
          <tr>
            <th>Icono</th>
            <th>Nombre de la categoría</th>
            <th>Creado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{tableItems}</tbody>
      </table>
      <Modal open={open} handleClose={handleClose} title="" tamaño="xs">
        {datos.map((item) => {
          if (item !== undefined && item.id === idp) {
            return (
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item sm={12} xs={12} style={{ textAlign: "center" }}>
                  <img
                    src={img}
                    alt=""
                    width="100px"
                    height="100px"
                    style={{ marginTop: "10px" }}
                  />
                </Grid>
                <Grid item sm={12} xs={12} style={{ textAlign: "center" }}>
                  <p className={classes.text} style={{ marginTop: "5px" }}>
                    <b className={classes.text1}>Nombre: </b> {item.nombre} |{" "}
                    <b className={classes.text1}> Slug:</b> {item.slug}
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <Divider variant="middle" style={{ marginTop: "5px" }} />
                  <h4
                    className={classes.text2}
                    style={{ textAlign: "center", marginTop: "10px" }}
                  >
                    <b>Descripción: </b>
                  </h4>
                  <p>{item.descripcion}</p>
                </Grid>
              </Grid>
            );
          }
        })}
      </Modal>
      <_Eliminar
        open={open2}
        handleClose={handleClose2}
        eliminar={Eliminar}
        titulo3="Desea eliminar"
        titulo2="la categoría"
        titulo={datos.map((item) => {
          return item !== undefined && item.id === idp2 && item.nombre;
        })}
      />
      <_Actualizar
        open={open1}
        handleClose={handleClose1}
        idCategoria={idp1}
        nombre={categoria.length !== 0 ? categoria[0].nombre : ""}
        slug={categoria.length !== 0 ? categoria[0].slug : ""}
        img={categoria.length !== 0 ? categoria[0].icono : ""}
        descripcion={categoria.length !== 0 ? categoria[0].descripcion : ""}
      />
    </div>
  );
};

TableCategoryItems.propTypes = {
  datos: PropTypes.array,
  getDatos: PropTypes.func,
};

export default TableCategoryItems;
