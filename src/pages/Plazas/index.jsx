import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ContainerDashboard from "../../components/layaouts/ContainerDashboard";
import TablasPlazas from "./../../components/shared/tables/TablaPlazas";
import HeaderDashboard from "./../../components/shared/headers/HeaderDashboard";

import Crear from "components/shared/modal/Plaza/Crear";

import {
  getFuncionarios,
  getCategorias,
  getLocalidades,
} from "./../../actions/plaza";

import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import IconButton from "@material-ui/core/IconButton";
import NotesIcon from "@material-ui/icons/Notes";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./../../theme";
import TooltipE from "./../../components/shared/tooltip";
import useStyles from "./styles";
import { getTrue } from "actions/plaza";
import { toggleDrawerMenu } from "actions/menu";
import { getCantidades } from "actions/plaza";
import { NoImg } from "actions/imagen";
import { getPlaz } from "actions/plaza";

const Plazas = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { categorias, localidades, plazas } = useSelector(
    (state) => state.plaza
  );

  const [currency1, setCurrency1] = React.useState("");
  const [currency2, setCurrency2] = React.useState("");

  const [mostrar, setMostrar] = useState(true);
  const [plaza1, setPlaza1] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [nomplaza1, setNomplaza1] = useState("");

  useEffect(() => {
    if (categorias.length === 0) {
      dispatch(getFuncionarios());
      dispatch(getCategorias());
      dispatch(getLocalidades());
      dispatch(getTrue());
      dispatch(getCantidades());
      dispatch(toggleDrawerMenu(false));
      dispatch(NoImg());
      dispatch(getPlaz());
    }
  }, [categorias]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(getPlaz());
  };

  const handleChange1 = (event) => {
    setCurrency1(event.target.value);
  };

  const handleChange2 = (event) => {
    setCurrency2(event.target.value);
  };

  const Filtros = () => {
    setMostrar(false);
    console.log(currency1 + " - " + currency2);
    let data = [];
    if (currency2 !== "" && currency1 === "") {
      console.log(plazas.filter((item) => item.localidad === currency2));
      data = plazas.filter((item) => item.localidad === currency2);
    } else if (currency2 === "" && currency1 !== "") {
      data = plazas.filter((item) => {
        if (item.categorias_id.length > 0) {
          for (let i = 0; i < item.categorias_id.length; i++) {
            const element = item.categorias_id[i];
            if (element === currency1) {
              item;
            }
          }
        }
      });
    } else {
      data = plazas.map((item) => {
        if (item.localidad) {
          if (item.localidad === currency2) {
            if (item.categorias_id) {
              if (item.categorias_id !== " " && item.categorias_id.length > 0) {
                for (let i = 0; i < item.categorias_id.length; i++) {
                  const element = item.categorias_id[i];
                  console.log(element);
                  if (element === currency1) {
                    return item;
                  }
                }
              }
            }
          }
        }
      });
    }
    setPlaza1(data.filter((item) => item !== undefined));
  };
  console.log(currency1);
  console.log(currency2);
  const Restaurar = () => {
    setMostrar(true);
    dispatch(getPlaz());
    setCurrency1("");
    setCurrency2("");
  };

  const Buscar = () => {
    let data = [];
    setMostrar(false);
    data = plazas.filter((item) => item.nombre === nomplaza1);
    setPlaza1(data);
  };
  console.log(plaza1);
  console.log(plazas);
  return (
    <ContainerDashboard title="Settings">
      <HeaderDashboard
        title="Plazas de mercado"
        description="Información de las plazas"
      />
      <ThemeProvider theme={theme}>
        <section className="ps-items-listing">
          <div className="ps-section__actions">
            <a className="ps-btn success" onClick={handleClickOpen}>
              <AddIcon />
              Nueva plaza
            </a>
          </div>
          <div className="ps-section__header">
            <div className="ps-section__filter ps-form--filter">
              <div className="ps-form__left ">
                <div className={"form-group" + " " + classes.root}>
                  <TextField
                    id="filled-select-currency"
                    select
                    label="Categorías"
                    value={currency1}
                    onChange={handleChange1}
                    fullWidth
                    className={classes.margin}
                    style={{ marginRight: "20px" }}
                  >
                    {categorias.map((option) => {
                      if (option.activo) {
                        return (
                          <MenuItem key={option.id} value={option.id}>
                            {option.label}
                          </MenuItem>
                        );
                      }
                    })}
                  </TextField>
                </div>
                <div className="form-group">
                  <TextField
                    id="filled-select-currency"
                    select
                    label="Localidad"
                    value={currency2}
                    onChange={handleChange2}
                    fullWidth
                    style={{ marginRight: "20px" }}
                    className={classes.margin}
                  >
                    {localidades.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
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
              <div className="ps-form__right">
                <TooltipE title="Restaurar información">
                  <IconButton
                    color="secondary"
                    component="span"
                    onClick={Restaurar}
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
                  options={plazas.map((option) => option.nombre)}
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
                      placeholder="Por favor ingrese el nombre de la plaza..."
                    />
                  )}
                />
              </div>
              <TooltipE title="Buscar">
                <IconButton color="primary" component="span" onClick={Buscar}>
                  <SearchIcon
                    style={{ fontSize: "35px", marginTop: "-15px" }}
                  />
                </IconButton>
              </TooltipE>
            </div>
          </div>
          <div className="ps-section__content">
            {plaza1.length > 0 || mostrar ? (
              <TablasPlazas
                datos={mostrar ? plazas : plaza1}
                getPlaza={() => dispatch(getPlaz())}
              />
            ) : (
              <h3
                style={{
                  textAlign: "center",
                  color: "#FF2D42",
                }}
              >
                No hay datos
              </h3>
            )}
          </div>
        </section>
        <Crear open={open} handleClose={handleClose} />
      </ThemeProvider>
    </ContainerDashboard>
  );
};
export default Plazas;
// export default connect((state) => state.app)(SettingsPage);
