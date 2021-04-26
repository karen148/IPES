import React, { Fragment, useState } from "react";
// import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import TooltipE from "./../../tooltip";
import Modal from "./../../modal";
import _Eliminar from "./../../modal/Eliminar.jsx";
import _Actualizar from "./../../modal/Productos/Actualizar";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { DeleteProducto } from "actions/producto";
import { useDispatch, useSelector } from "react-redux";

const TablaProducto = ({ getDatos, datos }) => {
  const { plazastrues, categorias } = useSelector((state) => state.plaza);
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
  };

  const Actualizar = (id) => {
    setProducto(producto.filter((item) => item.id === id));
  };

  const tableItems = datos?.map((item, index) => {
    let plazaAc = [];
    let CateAc = [];
    if (item?.plaza !== null && item?.plaza.length > 0) {
      for (let index = 0; index < item?.plaza.length; index++) {
        const element = item?.plaza[index];
        plazastrues?.map((item) => {
          if (item?.id === element) {
            plazaAc.push(element);
          }
        });
      }
    }
    if (item?.categorias !== null && item?.categorias.length > 0) {
      for (let index = 0; index < item?.categorias.length; index++) {
        const element = item?.categorias[index];
        categorias?.map((item) => {
          if (item?.id === element) {
            CateAc.push(element);
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
            return item?.nombre;
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
        title={datos?.map((item) => {
          return item !== undefined && item?.id === idp && item?.nombre;
        })}
        tamaño="xs"
      >
        {datos?.map((item) => {
          if (item !== undefined && item?.id === idp) {
            return (
              <Fragment>
                <p>{item?.nombre}</p>
              </Fragment>
            );
          }
        })}
      </Modal>
      <_Eliminar
        open={open1}
        handleClose={handleClose1}
        eliminar={Eliminar}
        titulo3="Eliminar plaza"
        titulo2="la plaza"
        titulo={datos.map((item) => {
          return item !== undefined && item.id === idp2 && item.nombre;
        })}
      />
      <_Actualizar
        open={open2}
        handleClose={handleClose2}
        idProducto={idp1}
        nombrepro={producto?.nombre}
        plazapro={producto?.plaza}
        categorias={producto?.categorias}
        sku={producto?.sku}
        // direccion1={plaza.direccion}
        // email1={plaza.email}
        // imagen={plaza.img}
        // logo1={plaza.logo}
        // locali={plaza.localidad_nombre}
        // funcio2={plaza.admin_id}
        // cat1={plaza.categorias_nombres}
        // horarios1={plaza.horarios}
        // telefonos1={plaza.telefonos}
      />
    </div>
  );
};

TablaProducto.propTypes = {
  datos: PropTypes.array,
  getDatos: PropTypes.func,
};

export default TablaProducto;
