import React, { useEffect, useState } from "react";
import axios from "axios";

import ContainerDashboard from "../../components/layaouts/ContainerDashboard";
import TablasLocatarios from "./../../components/shared/tables/TablasLocatarios";
import HeaderDashboard from "./../../components/shared/headers/HeaderDashboard";

import { getPlaz, getTrue, getLocalidades } from "./../../actions/plaza";

import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import ListAltIcon from "@material-ui/icons/ListAlt";
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
import Crear from "../../components/shared/modal/Locatarios/Crear";
import { getCategorias } from "actions/plaza";
import { getProducto } from "actions/producto";
import Archivo from "components/shared/modal/Locatarios/Archivo";
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

const Locatarios = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { plazastrues } = useSelector((state) => state.plaza);

  const [currency1, setCurrency1] = React.useState("12");
  const [currency3, setCurrency3] = React.useState("");

  const [locatario2, setLocatarios2] = useState([]);
  const [noimg, setNoImg] = useState("");
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [nomplaza1, setNomplaza1] = useState("");

  useEffect(() => {
    dispatch(getPlaz());
    dispatch(getProducto());
    dispatch(getCategorias());
    dispatch(getLocalidades());
    dispatch(getTrue());
    dispatch(NoImg(setNoImg));
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    getLocatarioss();
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
    getLocatarioss();
  };

  const handleChange1 = (event) => {
    setCurrency1(event.target.value);
  };

  const getLocatarioss = async () => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(
        process.env.REACT_APP_URL_API +
          "locatarios/locatariosPorPlaza/" +
          currency1,
        config
      )
      .then((response) => {
        let data = response.data.locatarios;
        let locatarios = data.map((item, index) => ({
          conteo: index + 1,
          id: item.id,
          usuario: item.admin_id,
          plaza: item.plaza_id,
          nombre: item.nombre,
          apellido: item.apellido,
          categorias: item.categorias_id === null ? [] : item.categorias_id,
          horarios: item.horarios,
          img: item.img,
          logo: item.logo,
          local: item.nombre_local,
          cedula: item.cedula,
          fecha: item.updated_at === null ? item.created_at : item.updated_at,
          email: item.email === null ? "" : item.email,
          telefonos: item.telefonos ? item.telefonos : [],
          activo: item.activo ? "Activo" : "Inactivo",
          numero_local: item.numero_local,
          productos: item.productos_locatarios_id,
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
            {
              name: "Listado de productos",
              icon: <ListAltIcon />,
              id: item.id,
            },
          ],
        }));
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
    getLocatarioss();
  };
  console.log(locatario2);
  const RestaurarLista = () => {
    getLocatarioss();
    setCurrency3("");
  };

  const Buscar = () => {
    let data = locatario2.filter((item) => item.nombre === nomplaza1);
    setLocatarios2(data);
  };

  const handleEstado = () => {
    setLocatarios2(
      locatario2.filter((item) => {
        return item.activo.includes(currency3);
      })
    );
  };
  useEffect(() => {
    if (currency3.length > 0) {
      handleEstado();
    }
  }, [currency3]);

  console.log(locatario2);
  return (
    <ContainerDashboard title="Settings">
      <HeaderDashboard
        title="Locatarios"
        description="Información de los locatarios de las plazas"
      />
      <section className="ps-items-listing">
        <div className="ps-section__actions">
          <a className="ps-btn success" onClick={handleClickOpen}>
            <AddIcon />
            Nuevo Locatario
          </a>
          <a className="ps-btn success" onClick={handleClickOpen1}>
            <AddIcon />
            Subir archivo
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
              {/* <div style={{ width: "20px" }}>
                <TooltipE title="Buscar">
                  <IconButton color="primary" component="span" onClick={Buscar}>
                    <SearchIcon
                      style={{ fontSize: "35px", marginTop: "0px" }}
                    />
                  </IconButton>
                </TooltipE>
              </div> */}
              <div className="form-group">
                <TextField
                  id="filled-select-currency"
                  select
                  label="Estados"
                  value={currency3}
                  onChange={(e) => setCurrency3(e.target.value)}
                  fullWidth
                  style={{ marginRight: "20px" }}
                  className={classes.margin}
                >
                  {estados.map((option) => (
                    <MenuItem key={option?.value} value={option?.value}>
                      {option?.label}
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
                options={locatario2?.map((option) =>
                  option?.nombre ? option?.nombre : ""
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
                    placeholder="Nombre"
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
          <TablasLocatarios
            datos={locatario2}
            getLocali={getLocatarioss}
            noimg={noimg}
          />
        </div>
      </section>
      <Crear
        key="2015"
        open={open}
        handleClose={handleClose}
        locatarios={locatario2}
      />
      <Archivo open={open1} handleClose={handleClose1} />
    </ContainerDashboard>
  );
};
export default Locatarios;
// export default connect((state) => state.app)(SettingsPage);
