import React, { Fragment, useState } from "react";
// import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import TooltipE from "./../../tooltip";
import Modal from "./../../modal";
import _Eliminar from "./../../modal/Eliminar.jsx";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { DeleteCategoria } from "actions/categoria";
import _Actualizar from "components/shared/modal/Categoria/Actualizar";

const TableCategoryItems = ({ datos, get }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [idp, setIdp] = useState(0);
  const [idp1, setIdp1] = useState(0);
  const [idp2, setIdp2] = useState(0);
  const [categoria, setCategoria] = useState([]);

  /*INFORMACIÓN*/
  const handleClickOpen = () => {
    setOpen(true);
    get;
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
  };

  const datoActualizar = (idL) => {
    setCategoria(datos.filter((item) => item.id === idL));
  };

  const tableItems = datos.map((item, index) => {
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
      <Modal
        open={open}
        handleClose={handleClose}
        title={datos.map((item) => {
          return item !== undefined && item.id === idp2 && item.nombre;
        })}
        tamaño="xs"
      >
        {datos.map((item) => {
          if (item !== undefined && item.id === idp) {
            return (
              <Fragment>
                <p>{item.nombre}</p>
              </Fragment>
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
        img={categoria.length !== 0 ? categoria[0].img : ""}
        descripcion={categoria.length !== 0 ? categoria[0].descripcion : ""}
      />
    </div>
  );
};

TableCategoryItems.propTypes = {
  datos: PropTypes.array,
  get: PropTypes.func,
};

export default TableCategoryItems;
