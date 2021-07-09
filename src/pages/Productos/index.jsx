import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ContainerDashboard from "../../components/layaouts/ContainerDashboard";
import TablaProductos from "./../../components/shared/tables/TablaProductos";
import HeaderDashboard from "./../../components/shared/headers/HeaderDashboard";

import { getTrue, getCategorias } from "./../../actions/plaza";
import { getProducto, getProductoLocatario } from "actions/producto";
import { getLocatarioCedula } from "actions/locatarios";

import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import IconButton from "@material-ui/core/IconButton";
import NotesIcon from "@material-ui/icons/Notes";

import TooltipE from "./../../components/shared/tooltip";
import useStyles from "./styles";
import Crear from "../../components/shared/modal/Productos/Crear";
import Archivo from "components/shared/modal/Productos/Archivo";
import { NoImg } from "actions/imagen";

const estados = [
  {
    value: "Inactivo",
    label: "Inactivo",
  },
  {
    value: "Activo",
    label: "Activo",
  },
];

const promocion = [
  {
    value: "No",
    label: "Productos sin promoción",
  },
  {
    value: "Sí",
    label: "Productos con promoción",
  },
];

const existe = [
  {
    value: "Sí hay",
    label: "Sí hay en el inventario",
  },
  {
    value: "No hay",
    label: "No hay en el inventario",
  },
];

const Productos = () => {
  const classes = useStyles();
  let data = [];

  const dispatch = useDispatch();
  const { plazastrues, categorias } = useSelector((state) => state.plaza);
  const { productos, prolocatarios } = useSelector((state) => state.producto);
  const { rol, codigo } = useSelector((state) => state.auth);

  const [currency1, setCurrency1] = React.useState("");
  const [currency3, setCurrency3] = React.useState("");
  const [currency4, setCurrency4] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [locatario, setLocatario] = useState([]);
  const [nomproducto, setNomProducto] = useState("");
  const [mostrar, setMostrar] = useState(false);
  const [pro, setPro] = useState([]);
  const [img, setImg] = useState([]);
  // const [pro1, setPro1] = useState([]);
  // const [pro2, setPro2] = useState([]);

  useEffect(() => {
    if (productos.length === 0) {
      dispatch(getLocatarioCedula(setLocatario, codigo));
      dispatch(getProducto());
      dispatch(getTrue());
      dispatch(getCategorias());
      dispatch(NoImg(setImg));
    }
  }, []);

  useEffect(() => {
    if (locatario.id) {
      dispatch(getProductoLocatario(locatario.id));
    }
  }, [dispatch, locatario.id]);

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

  const handleChange1 = (event) => {
    setCurrency1(event.target.value);
  };

  const handleChange3 = (event) => {
    setCurrency3(event.target.value);
  };

  const handleChange4 = (event) => {
    setCurrency4(event.target.value);
  };

  const handleInventario = () => {
    console.log(currency1);
    setMostrar(true);
    setPro(
      prolocatarios.filter((item) => {
        return item.stock.includes(currency1);
      })
    );
  };
  useEffect(() => {
    if (currency1.length > 0) {
      handleInventario();
    }
  }, [currency1]);

  const handlePromo = () => {
    setMostrar(true);
    setPro(
      prolocatarios.filter((item) => {
        return item.en_promocion.includes(currency3);
      })
    );
  };
  useEffect(() => {
    if (currency3.length > 0) {
      handlePromo();
    }
  }, [currency3]);

  const handleEstados = () => {
    setMostrar(true);
    setPro(
      prolocatarios.filter((item) => {
        return item.activo.includes(currency4);
      })
    );
  };
  useEffect(() => {
    if (currency4.length > 0) {
      handleEstados();
    }
  }, [currency4]);

  const getDatos = () => {
    setMostrar(false);
    if (rol === "SUPER_ADMIN") {
      dispatch(getProducto());
    } else {
      dispatch(getProductoLocatario(locatario.id));
    }
  };

  const Filtros = () => {
    setMostrar(true);
    if (rol === "SUPER_ADMIN") {
      let data2 = [];
      let data3 = [];
      if (currency1 !== "" && currency3 === "" && currency4 === "") {
        data2 = productos.map((item) => {
          if (item?.plaza !== null && item?.plaza) {
            for (let index = 0; index < item?.plaza.length; index++) {
              const element = item?.plaza[index];
              if (element === currency1) {
                return item;
              }
            }
          }
        });
        console.log(data2);
        setPro(
          data2.filter((item) => {
            return item !== undefined;
          })
        );
      } else if (currency1 === "" && currency3 !== "" && currency4 === "") {
        data2 = productos.map((item) => {
          console.log(item.categorias);
          if (item?.categorias !== null && item?.categorias.length > 0) {
            for (let index = 0; index < item?.categorias.length; index++) {
              const element = item?.categorias[index];
              if (element === currency3) {
                return item;
              }
            }
          }
        });
        console.log(data2);
        setPro(
          data2.filter((item) => {
            return item !== undefined;
          })
        );
      } else if (currency1 === "" && currency3 === "" && currency4 !== "") {
        data2 = productos.filter((item) => item.activo === currency4);
        setPro(data2);
      } else {
        console.log("hola");
        data2 = productos.map((item) => {
          if (item?.plaza !== null && item?.plaza.length > 0) {
            for (let index = 0; index < item?.plaza.length; index++) {
              const element = item?.plaza[index];
              if (element === currency1) {
                if (item?.categorias !== null && item?.categorias.length > 0) {
                  for (
                    let index = 0;
                    index < item?.categorias.length;
                    index++
                  ) {
                    const element = item?.categorias[index];
                    if (element === currency3) {
                      return item;
                    }
                  }
                }
              }
            }
          }
        });
        data3 = data2?.filter((item) => item?.activo === currency4);
        setPro(
          data3.filter((item) => {
            return item !== undefined;
          })
        );
      }
    }
  };

  console.log(currency4);
  const RestaurarLista = () => {
    getDatos();
    setCurrency1("");
    setCurrency3("");
    setCurrency4("");
  };

  const Buscar = () => {
    setMostrar(true);
    if (rol === "SUPER_ADMIN") {
      let data = [];
      data = productos.filter((item) => item.nombre === nomproducto);
      setPro(data);
      console.log(data);
    } else {
      let data = [];
      data = prolocatarios.filter(
        (item) => item.producto_id === nomproducto.id
      );
      setPro(data);
    }
  };

  if (rol === "ADMIN_LOCATARIO") {
    prolocatarios?.map((item) => {
      productos?.map((pro) => {
        if (pro?.id === item?.producto_id) {
          data.push(pro);
        }
      });
    });
  }
  console.log(nomproducto);
  return (
    <ContainerDashboard title="Settings">
      <HeaderDashboard
        title="Productos"
        description="Información de los productos de las plazas"
      />
      <section className="ps-items-listing">
        <div className="ps-section__actions">
          {rol === "SUPER_ADMIN" ? (
            <>
              <a className="ps-btn success" onClick={handleClickOpen}>
                <AddIcon />
                Nuevo Producto
              </a>
              <a className="ps-btn success" onClick={handleClickOpen1}>
                <AddIcon />
                Subir archivo
              </a>
            </>
          ) : (
            <a className="ps-btn success" onClick={handleClickOpen}>
              <AddIcon />
              Agregar Producto
            </a>
          )}
        </div>
        <div className="ps-section__header">
          <div className="ps-section__filter ps-form--filter">
            <div className="ps-form__left ">
              {rol === "SUPER_ADMIN" ? (
                <>
                  <div className={"form-group" + " " + classes.root}>
                    <TextField
                      id="filled-select-currency"
                      select
                      label="Plazas"
                      value={currency1}
                      onChange={handleChange1}
                      fullWidth
                      className={classes.margin}
                      style={{ marginRight: "20px" }}
                    >
                      {plazastrues.map(
                        (option) =>
                          option && (
                            <MenuItem key={option?.id} value={option?.id}>
                              {option?.nombre}
                            </MenuItem>
                          )
                      )}
                    </TextField>
                  </div>
                  <div className="form-group">
                    <TextField
                      id="filled-select-currency"
                      select
                      label="Categorias"
                      value={currency3}
                      onChange={handleChange3}
                      fullWidth
                      style={{ marginRight: "20px" }}
                      className={classes.margin}
                    >
                      {categorias.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <div className="form-group">
                    <TextField
                      id="filled-select-currency"
                      select
                      label="Estados"
                      value={currency4}
                      onChange={handleChange4}
                      fullWidth
                      style={{ marginRight: "20px" }}
                      className={classes.margin}
                    >
                      {estados.map((option) => (
                        <MenuItem key={option.value} value={option.label}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <div className="ps-form__right">
                    <TooltipE title="Filtrar">
                      <IconButton
                        color="primary"
                        component="span"
                        onClick={Filtros}
                      >
                        <NotesIcon
                          style={{
                            fontSize: "35px",
                            marginTop: "-5px",
                            marginLeft: "-10px",
                          }}
                        />
                      </IconButton>
                    </TooltipE>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <TextField
                      id="filled-select-currency"
                      select
                      label="Inventario"
                      value={currency1}
                      onChange={(e) => setCurrency1(e.target.value)}
                      fullWidth
                      style={{ marginRight: "20px" }}
                      className={classes.margin}
                    >
                      {existe.map((option) => (
                        <MenuItem key={option.label} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <div className="form-group">
                    <TextField
                      id="filled-select-currency"
                      select
                      label="Promociones"
                      value={currency3}
                      onChange={(e) => setCurrency3(e.target.value)}
                      fullWidth
                      style={{ marginRight: "20px" }}
                      className={classes.margin}
                    >
                      {promocion.map((option) => (
                        <MenuItem key={option.label} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <div className="form-group">
                    <TextField
                      id="filled-select-currency"
                      select
                      label="Estados"
                      value={currency4}
                      onChange={handleChange4}
                      fullWidth
                      style={{ marginRight: "20px" }}
                      className={classes.margin}
                    >
                      {estados.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </>
              )}
            </div>

            <div className="ps-form__right">
              <TooltipE title="Restaurar información">
                <IconButton
                  color="secondary"
                  component="span"
                  onClick={RestaurarLista}
                >
                  <RefreshIcon
                    style={{ fontSize: "35px", marginTop: "-5px" }}
                  />
                </IconButton>
              </TooltipE>
            </div>
          </div>
          <div className="ps-section__search">
            {rol === "SUPER_ADMIN" ? (
              <div className={"form-group" + " " + classes.root}>
                <Autocomplete
                  id="free-solo-demo"
                  freeSolo
                  options={productos.map((option) => option?.nombre)}
                  inputValue={nomproducto}
                  onInputChange={(event, newInputValue) => {
                    setNomProducto(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="normal"
                      type="text"
                      id="standard-basic"
                      style={{ width: "300px", marginTop: "5px" }}
                      placeholder="Producto"
                    />
                  )}
                />
              </div>
            ) : (
              <div className={"form-group" + " " + classes.root}>
                <Autocomplete
                  id="free-solo-demo"
                  freeSolo
                  options={data}
                  getOptionLabel={(option) => option.nombre}
                  value={nomproducto}
                  onChange={(event, newValue) => {
                    setNomProducto(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="normal"
                      type="text"
                      id="standard-basic"
                      style={{ width: "300px", marginTop: "5px" }}
                      placeholder="Producto"
                    />
                  )}
                />
              </div>
            )}

            <TooltipE title="Buscar">
              <IconButton color="primary" component="span" onClick={Buscar}>
                <SearchIcon style={{ fontSize: "35px", marginTop: "-15px" }} />
              </IconButton>
            </TooltipE>
          </div>
        </div>
        <div className="ps-section__content">
          <TablaProductos
            getDatos={getDatos}
            rol={rol}
            locatario={locatario}
            img={img}
            datos={
              rol === "SUPER_ADMIN"
                ? mostrar
                  ? pro
                  : productos
                : mostrar
                ? pro
                : prolocatarios
            }
          />
        </div>
        <div className="ps-section__footer"></div>
      </section>
      <Crear
        key="2015"
        open={open}
        handleClose={handleClose}
        locatario={locatario}
        rol={rol}
      />
      <Archivo open={open1} handleClose={handleClose1} />
    </ContainerDashboard>
  );
};
export default Productos;
