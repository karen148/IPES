import React, { useEffect, useState } from "react";
import axios from "axios";

import ContainerDashboard from "../../components/layaouts/ContainerDashboard";
import TablaProductos from "./../../components/shared/tables/TablaProductos";
import HeaderDashboard from "./../../components/shared/headers/HeaderDashboard";

import {
  getPlaz,
  getTrue,
  getLocalidades,
  getCategorias,
} from "./../../actions/plaza";
import { getLocatario } from "../../actions/locatarios";

import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import IconButton from "@material-ui/core/IconButton";
import NotesIcon from "@material-ui/icons/Notes";

import TooltipE from "./../../components/shared/tooltip";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import Crear from "../../components/shared/modal/Productos/Crear";

const estados = [
  {
    value: "Inactivo",
    label: "Inactivo",
  },
  {
    value: "Activo",
    label: "Activo",
  },
  {
    value: "Stock",
    label: "Stock",
  },
  {
    value: "Sin Stock",
    label: "Sin Stock",
  },
];

const Productos = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { plazastrues, categorias } = useSelector((state) => state.plaza);
  const { locatarios } = useSelector((state) => state.locatario);

  const [currency1, setCurrency1] = React.useState("");
  const [currency2, setCurrency2] = React.useState("");
  const [currency3, setCurrency3] = React.useState("");
  const [currency4, setCurrency4] = React.useState("");

  const [locatario1, setLocatarios1] = useState([]);
  const [locatario2, setLocatarios2] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [nomplaza1, setNomplaza1] = useState("");

  useEffect(() => {
    dispatch(getLocatario());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPlaz());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTrue());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLocalidades());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategorias());
  }, [dispatch]);

  console.log(locatario1);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    getLocatarioss();
  };

  const handleChange1 = (event) => {
    setCurrency1(event.target.value);
  };

  const handleChange2 = (event) => {
    setCurrency2(event.target.value);
  };

  const handleChange3 = (event) => {
    setCurrency3(event.target.value);
  };

  const handleChange4 = (event) => {
    setCurrency4(event.target.value);
  };

  const getLocatarioss = async () => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(process.env.REACT_APP_URL_API + "locatarios/getAll", config)
      .then((response) => {
        let data = response.data.locatarios;
        let locatarios = data.map((item) => ({
          id: item.id,
          usuario: item.admin_id,
          plaza: item.plaza_id,
          nombre: item.nombre,
          apellido: item.apellido,
          categorias: item.categorias,
          horarios: item.horarios,
          img: item.img,
          logo: item.logo,
          local: item.nombre_local,
          cedula: item.cedula,
          fecha: item.updated_at === null ? item.created_at : item.updated_at,
          email: item.email,
          telefonos: item.telefonos,
          activo: item.activo ? "Activo" : "Inactivo",
          acciones: [
            {
              name: "Editar",
              icon: <EditIcon />,
              id: item.id,
            },
            {
              name: "Eliminar",
              icon: <DeleteIcon />,
              id: item.id,
            },
          ],
        }));
        setLocatarios1(locatarios);
        setLocatarios2(locatarios);
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
  useEffect(() => {
    getLocatarioss();
  }, []);

  const Filtros = () => {
    let data2 = [];

    if (currency1 !== "" && currency2 === "" && currency3 === "") {
      data2 = locatario1.filter((item) => item.plaza === currency1);
      console.log(data2);
    } else if (currency1 === "" && currency2 !== "" && currency3 === "") {
      data2 = locatario1.filter(
        (loc) =>
          loc.plaza ===
          plazastrues.filter((item) => item?.localidad_nombre === currency2)[0]
            ?.id
      );
    } else if (currency1 === "" && currency2 === "" && currency3 !== "") {
      data2 = locatario1.filter((item) => item.activo === currency3);
    }
    // else {
    //   console.log('hola');
    //   data2 = locatarios.map(item => {
    //     if(item.localidad === currency2) {
    //       if (item.categorias !== null && item.categorias.length > 0) {
    //         for (let i = 0; i < item.categorias.length; i++) {
    //           const element = item.categorias[i];
    //           console.log(element);
    //           if (element === currency1) {
    //              return item
    //           }
    //         }
    //       }
    //     }
    //   })
    // }
    setLocatarios1(data2);
  };
  console.log(currency1);
  const RestaurarLista = () => {
    setLocatarios1(locatario2);
    setCurrency1("");
    setCurrency2("");
    setCurrency3("");
  };

  console.log(locatario1);

  const Buscar = () => {
    let data = [];
    data = locatario1.filter((item) => item.nombre === nomplaza1);
    setLocatarios1(data);
  };

  console.log(locatario1);
  return (
    <ContainerDashboard title="Settings">
      <HeaderDashboard
        title="Productos"
        description="Información de los productos de las plazas"
      />
      <section className="ps-items-listing">
        <div className="ps-section__actions">
          <a className="ps-btn success" onClick={handleClickOpen}>
            <AddIcon />
            Nuevo Producto
          </a>
        </div>
        <div className="ps-section__header">
          <div className="ps-section__filter ps-form--filter">
            <div className="ps-form__left ">
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
                  label="Locatarios"
                  value={currency2}
                  onChange={handleChange2}
                  fullWidth
                  style={{ marginRight: "20px" }}
                  className={classes.margin}
                >
                  {locatarios.map((option) => (
                    <MenuItem key={option.id} value={option.nombre}>
                      {option.nombre} {option.apellido}
                    </MenuItem>
                  ))}
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
                    <MenuItem key={option.id} value={option.label}>
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
            </div>
            <div className="ps-form__right">
              <TooltipE title="Filtrar">
                <IconButton color="primary" component="span" onClick={Filtros}>
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
            <div className={"form-group" + " " + classes.root}>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={locatarios.map(
                  (option) => option.nombre + " " + option.apellido
                )}
                inputValue={nomplaza1}
                onInputChange={(event, newInputValue) => {
                  setNomplaza1(newInputValue);
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
            <TooltipE title="Buscar">
              <IconButton color="primary" component="span" onClick={Buscar}>
                <SearchIcon style={{ fontSize: "35px", marginTop: "-15px" }} />
              </IconButton>
            </TooltipE>
          </div>
        </div>
        <div className="ps-section__content">
          <TablaProductos />
        </div>
        <div className="ps-section__footer">
          {/* <p>Mostrar 10 de 30 artículos.</p> */}
          {/* <Pagination /> */}
        </div>
      </section>
      <Crear key="2015" open={open} handleClose={handleClose} />
    </ContainerDashboard>
  );
};
export default Productos;
// export default connect((state) => state.app)(SettingsPage);
