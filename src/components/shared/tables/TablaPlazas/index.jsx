import React, { useState, useEffect } from "react";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TooltipE from "./../../tooltip";
import Modal from "./../../modal";
import _Eliminar from "./../../modal/Eliminar.jsx";
import _Actualizar from "../../modal/Plaza/Actualizar.jsx";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { getCantidades, getPlaz } from "../../../../actions/plaza";
import PropTypes from "prop-types";

const TablaPlazas = ({ datos, getPlaza }) => {
  const dispatch = useDispatch();
  const { funcionarios, cantidades, categorias } = useSelector(
    (state) => state.plaza
  );
  const [plazas, setPlaza] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [idp, setIdp] = useState(0);
  const [idp1, setIdp1] = useState(0);
  const [idp2, setIdp2] = useState(0);

  useEffect(() => {
    dispatch(getPlaz());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCantidades());
  }, [dispatch]);

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

  const tableItems = datos.map((item, index) => {
    if (item !== undefined) {
      if (item.activo === true) {
        let data = [];
        if (item?.categorias !== null && item?.categorias.length > 0) {
          for (let i = 0; i <= item?.categorias.length; i++) {
            const element = item?.categorias[i];
            categorias.map((item) => {
              if (item.label === element) {
                data.push(item);
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
            <td>{item.localidad}</td>
            <td>
              {cantidades.map((can) => {
                return item.id === can.id && can.total;
              })}
            </td>
            <td style={{ width: "180px" }}>
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
            </td>
          </tr>
        );
      }
    }
  });
  console.log(plazas);
  return (
    <div className="table-responsive">
      <table className="table ps-table" style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre de la plaza</th>
            <th>Localidad</th>
            <th>Locatarios inscritos</th>
            <th>Categorías</th>
            <th>Fecha actualizada</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{tableItems}</tbody>
      </table>
      <Modal
        open={open}
        handleClose={handleClose}
        title={datos.map((item) => {
          return item !== undefined && item.id === idp && item.nombre;
        })}
        tamaño="sm"
      >
        {datos.map((item) => {
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
          console.log(horarios[2]);
          console.log(horarios[1] === "-" ? "una hora" : "HORAS");
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
                      `uploads/retorna/PLAZA/${item.img}`
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
                    <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
                      <img
                        src={
                          process.env.REACT_APP_URL_API +
                          `uploads/retorna/PLAZA/${item.logo}`
                        }
                        alt=""
                        width="150px"
                        height="150px"
                      />
                      <p style={{ textAlign: "center" }}>
                        <i>Logo</i>
                      </p>
                    </Grid>
                    <Grid item xs={12} sm={8} style={{ textAlign: "center" }}>
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
                      <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
                        <h4>Teléfonos</h4>
                        {telefonos.map((item) => {
                          return <p key={item?.telefono}> {item?.telefono}</p>;
                        })}
                        <h4>Correo electrónico</h4>
                        <p>{item.email}</p>
                      </Grid>
                      <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
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
        idPlaza={idp1}
        nombre1={plazas.nombre}
        direccion1={plazas.direccion}
        email1={plazas.email}
        imagen={plazas.img}
        logo1={plazas.logo}
        locali={plazas.localidad_nombre}
        funcio2={plazas.admin_id}
        cat1={plazas.categorias_nombres}
        horarios1={plazas.horarios}
        telefonos1={plazas.telefonos}
      />
    </div>
  );
};

TablaPlazas.propTypes = {
  datos: PropTypes.array,
  getPlaza: PropTypes.func,
};

export default TablaPlazas;
