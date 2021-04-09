import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";

import ContainerDashboard from "../../components/layaouts/ContainerDashboard";
import TablasPlazas from "./../../components/shared/tables/TablaPlazas";
import HeaderDashboard from "./../../components/shared/headers/HeaderDashboard";

import {
  getFuncionarios,
  getCategorias,
  getLocalidades,
} from "./../../actions/plaza";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import RefreshIcon from "@material-ui/icons/Refresh";

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import NotesIcon from "@material-ui/icons/Notes";

import { ThemeProvider } from "@material-ui/core/styles";
import Modal from "./../../components/shared/modal";
import theme from "./../../theme";
import TooltipE from "./../../components/shared/tooltip";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardReturnRounded } from "@material-ui/icons";

const Plazas = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { funcionarios, categorias, localidades, cantidades } = useSelector(
    (state) => state.plaza
  );

  const [currency1, setCurrency1] = React.useState(null);
  const [currency2, setCurrency2] = React.useState(null);

  const [plazas, setPlaza] = useState([]);
  const [plaza1, setPlaza1] = useState(plazas);
  const [alerta, setAlerta] = useState(false);
  const [estado, setEstado] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [telefonos, setTele] = useState([{ telefono: " " }]);
  const [local, setLocal2] = useState("");
  const [cat, setCat] = useState([]);
  const [funcio, setFunci2] = useState([]);
  const [nomplaza, setNomplaza] = useState("");
  const [nomplaza1, setNomplaza1] = useState("");
  const [img, setImg] = useState(null);
  const [img1, setImg1] = useState(null);

  const [horaSI, setHoraSI] = useState(false);
  const [imglogo, setImgLogo] = useState("img");
  const [horario_m1, setHorariom1] = useState("");
  const [horario_m2, setHorariom2] = useState("");
  const [horario_lm1, setHorariolm1] = useState("");
  const [horario_lm2, setHorariolm2] = useState("");
  const [horario_mm1, setHorariomm1] = useState("");
  const [horario_mm2, setHorariomm2] = useState("");
  const [horario_jm1, setHorariojm1] = useState("");
  const [horario_jm2, setHorariojm2] = useState("");
  const [horario_vm1, setHorariovm1] = useState("");
  const [horario_vm2, setHorariovm2] = useState("");
  const [horario_sm1, setHorariosm1] = useState("");
  const [horario_sm2, setHorariosm2] = useState("");
  const [horario_dm1, setHorariodm1] = useState("");
  const [horario_dm2, setHorariodm2] = useState("");

  const [state, setStatet] = useState({
    id: "",
    nombre: "",
    direccion: "",
    email: "",
  });

  useEffect(() => {
    dispatch(getFuncionarios());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategorias());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLocalidades());
  }, [dispatch]);

  console.log(cantidades);
  const handleImg = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event[0]);
    reader.onload = function () {
      setImg(event[0]);
      setImg1(reader.result);
    };

    reader.onerror = function () {
      console.log(reader.error);
    };
  };

  const HoraSi = () => {
    setHoraSI(true);
  };

  const HoraNO = () => {
    setHoraSI(false);
  };

  const Logo = () => {
    setImgLogo("logo");
  };

  const Img = () => {
    setImgLogo("img");
  };

  const handleState = (event) => {
    const { value, name } = event.target;
    setStatet((_state) => ({ ..._state, [name]: value }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    getPlazas();
    setAlerta(false);
  };

  const handleChange1 = (event) => {
    setCurrency1(event.target.value);
  };

  const handleChange2 = (event) => {
    setCurrency2(event.target.value);
  };

  //agregar un telefono
  const handleAddTel = () => {
    setTele([...telefonos, { telefono: "" }]);
  };

  //evento para modificar input
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...telefonos];
    list[index][name] = value;
    setTele(list);
  };

  // evento para remover un hijo
  const handleRemoveClick = (index) => {
    const list = [...telefonos];
    list.splice(index, 1);
    setTele(list);
  };

  const setRegistro = async () => {
    let horario = [];
    horario.push(
      horario_m1 + "-" + horario_m2,
      horario_lm1 + "-" + horario_lm2,
      horario_mm1 + "-" + horario_mm2,
      horario_jm1 + "-" + horario_jm2,
      horario_vm1 + "-" + horario_vm2,
      horario_sm1 + "-" + horario_sm2,
      horario_dm1 + "-" + horario_dm2
    );
    let tele = [];
    telefonos.map((item) => {
      Array.prototype.push.apply(tele, [item.telefono]);
    });
    let cate = [];
    cat.map((item) => {
      Array.prototype.push.apply(cate, [item.label]);
    });

    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    axios
      .post(
        process.env.REACT_APP_URL_API + "plazas/crear",
        {
          admin_id: funcio.id,
          localidad_nombre: local,
          nombre: nomplaza,
          categorias_nombres: cate,
          direccion: state.direccion,
          telefonos: tele,
          email: state.email,
          horarios: horario,
        },
        config
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("SE REGISTRO");
          console.log(response);
          let id = response.data.plaza.id;
          const formData = new FormData();
          formData.append("imagen", img);
          formData.append("plaza",imglogo);
          console.log(img);
          let config1 = {
            method: "put",
            url: process.env.REACT_APP_URL_API + "uploads/PLAZA/" + id,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            data: formData,
          };
          axios(config1)
            .then((response) => {
              if (response.status) {
                setAlerta(true);
              }
            })
            .catch((e) => {
              console.log("ERROR", e);
            });
        }
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };

  console.log(imglogo);

  const getPlazas = async () => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(process.env.REACT_APP_URL_API + "plazas/getAll", config)
      .then((response) => {
        console.log(response.data.plazas);
        let data = response.data.plazas;
        let data1 = [];
        data.map((item) => {
          if (item.activo === true) {
            data1.push({
              id: item.id,
              usuario: item.admin_id,
              localidad: item.localidad_nombre,
              nombre: item.nombre,
              direccion: item.direccion,
              telefonos: item.telefonos,
              email: item.email,
              categorias: item.categorias_nombres,
              horarios: item.horarios,
              activo: item.activo,
              img: item.img,
              logo: item.logo,
              fecha:
                item.updated_at === null ? item.created_at : item.updated_at,
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
            });
          }
        });
        setPlaza(data1);
        setPlaza1(data1);
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
  useEffect(() => {
    getPlazas();
  }, []);

  const Filtros = () => {
    console.log(currency1 + " - " + currency2);
    let data = [];
    let data1 = [];
    if (currency2 !== null && currency1 === null) {
      data = plaza1.filter((item) => item.localidad === currency2);
    } else if (currency2 === null && currency1 !== null) {
      data = plaza1.map((item) => {
        if (item.categorias !== null && item.categorias.length > 0) {
          for (let i = 0; i < item.categorias.length; i++) {
            const element = item.categorias[i];
            console.log(element);
            if (element === currency1) {
              return item;
            }
          }
        }
      });
    } else {
      console.log("hola");
      data = plaza1.map((item) => {
        if (item.localidad === currency2) {
          if (item.categorias !== " " && item.categorias.length > 0) {
            for (let i = 0; i < item.categorias.length; i++) {
              const element = item.categorias[i];
              console.log(element);
              if (element === currency1) {
                return item;
              }
            }
          }
        }
      });
    }
    setPlaza1(data);
  };

  const Restaurar = () => {
    setPlaza1(plazas);
    setCurrency1(undefined);
    setCurrency2();
  };

  const Buscar = () => {
    let data = [];
    data = plaza1.filter((item) => item.nombre === nomplaza1);
    setPlaza1(data);
  };
  console.log(currency1);
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
                    label="Localidad"
                    value={currency2}
                    onChange={handleChange2}
                    fullWidth
                    style={{ marginRight: "20px" }}
                    className={classes.margin}
                  >
                    {localidades.map((option) => (
                      <MenuItem key={option.id} value={option.label}>
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
            <TablasPlazas datos={plaza1} getPlaza={getPlazas} />
          </div>
          <div className="ps-section__footer">
            <p>Mostrar 10 de 30 artículos.</p>
            {/* <Pagination /> */}
          </div>
        </section>
        <Modal
          open={open}
          handleClose={handleClose}
          title="Crear plaza"
          tamaño="xl"
        >
          <Fragment>
            <section className="ps-new-item">
              <div className="ps-form__content">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <figure className="ps-block--form-box">
                      <figcaption style={{ color: "white" }}>
                        Datos de la plaza
                      </figcaption>
                      <div className="ps-block__content">
                        <div className="form-group">
                          <label>
                            Nombre de la plaza<sup>*</sup>
                          </label>
                          <div className="col-sm-12 text-center">
                            {plazas.map((option) => {
                              return (
                                option.nombre === nomplaza && (
                                  <Alert severity="error">
                                    La plaza de mercado ya existe
                                  </Alert>
                                )
                              );
                            })}
                            <br></br>
                          </div>
                          <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            options={plazas.map((option) => option.nombre)}
                            inputValue={nomplaza}
                            onInputChange={(event, newInputValue) => {
                              setNomplaza(newInputValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                margin="normal"
                                variant="outlined"
                                type="text"
                                placeholder="Por favor ingrese el nombre de la plaza..."
                              />
                            )}
                          />
                        </div>
                        <div className="form-group">
                          <label>
                            Dirección<sup>*</sup>
                          </label>
                          <TextField
                            margin="normal"
                            variant="outlined"
                            type="text"
                            placeholder="Por favor ingrese la dirección de la plaza..."
                            name="direccion"
                            fullWidth
                            value={state.direccion}
                            onChange={handleState}
                          />
                        </div>
                        <div className="form-group row">
                          <div className="col-sm-6">
                            <label>
                              Localidad<sup>*</sup>
                            </label>
                            <Autocomplete
                              id="free-solo-demo"
                              freeSolo
                              options={localidades.map(
                                (option) => option.label
                              )}
                              inputValue={local}
                              onInputChange={(event, newInputValue) => {
                                setLocal2(newInputValue);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  type="text"
                                  margin="normal"
                                  variant="outlined"
                                />
                              )}
                            />
                          </div>
                          <div className="col-sm-6">
                            <label>
                              Funcionarios<sup>*</sup>
                            </label>
                            <Autocomplete
                              id="free-solo-demo"
                              freeSolo
                              options={funcionarios}
                              getOptionLabel={(option) => option.label}
                              value={funcio}
                              onChange={(event, newValue) => {
                                setFunci2(newValue);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  type="text"
                                  margin="normal"
                                  variant="outlined"
                                />
                              )}
                            />
                            {/* <Autocomplete
                                id="free-solo-demo"
                                freeSolo
                                options={localidades.map((option) => option.label)}
                                inputValue={local}
                                onInputChange={(event, newInputValue) => {
                                setLocal2(newInputValue);
                                }}
                                renderInput={(params) => (
                                <TextField {...params} 
                                    margin="normal" 
                                    variant="outlined" 
                                     />
                                )}
                            /> */}
                          </div>
                        </div>
                        <div className="form-group row">
                          {telefonos.map((x, i) => {
                            return (
                              <>
                                <div className="col-sm-8">
                                  <label>
                                    Teléfono<sup>*</sup>
                                  </label>
                                  <TextField
                                    margin="normal"
                                    variant="outlined"
                                    type="text"
                                    placeholder="Por favor ingrese el teléfono "
                                    value={x.telefono}
                                    name="telefono"
                                    onChange={(e) => handleInputChange(e, i)}
                                    fullWidth
                                  />
                                </div>
                                <div className="col-sm-4">
                                  {telefonos.length !== 1 && (
                                    <Button
                                      onClick={() => handleRemoveClick(i)}
                                      variant="contained"
                                      color="primary"
                                      style={{
                                        marginTop: "40px",
                                        marginRight: "10px",
                                        color: "white",
                                      }}
                                    >
                                      <b>-</b>
                                    </Button>
                                  )}
                                  {telefonos.length - 1 === i && (
                                    <Button
                                      onClick={handleAddTel}
                                      variant="contained"
                                      color="primary"
                                      style={{
                                        marginTop: "40px",
                                        color: "white",
                                      }}
                                    >
                                      <b>+</b>
                                    </Button>
                                  )}
                                </div>
                              </>
                            );
                          })}
                        </div>
                        <div className="form-group">
                          <label>
                            Correo electrónico<sup>*</sup>
                          </label>
                          <TextField
                            margin="normal"
                            variant="outlined"
                            type="text"
                            fullWidth
                            placeholder="Por favor ingrese el correo electrónico de la plaza..."
                            value={state.email}
                            name="email"
                            onChange={handleState}
                          />
                        </div>
                      </div>
                    </figure>
                    <figure className="ps-block--form-box">
                      <figcaption style={{ color: "white" }}>
                        Categorías
                      </figcaption>
                      <div className="ps-block__content">
                        <div className="form-group">
                          <label>
                            Categoría<sup>*</sup>
                          </label>
                          <Autocomplete
                            multiple
                            limitTags={2}
                            id="multiple-limit-tags"
                            value={cat}
                            onChange={(event, newValue) => {
                              setCat(newValue);
                            }}
                            options={categorias}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                placeholder="Categorías de las plazas"
                              />
                            )}
                          />
                        </div>
                      </div>
                    </figure>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <figure className="ps-block--form-box">
                      <figcaption style={{ color: "white" }}>
                        Horario
                      </figcaption>
                      <div className="ps-block__content">
                        <div className="form-group row">
                          <div className="col-sm-6">
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={HoraNO}
                            >
                              {" "}
                              Horario Fijo{" "}
                            </Button>
                          </div>
                          <div className="col-sm-6">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={HoraSi}
                              style={{ color: "white" }}
                            >
                              {" "}
                              Horario por días
                            </Button>
                          </div>
                          {horaSI ? (
                            <>
                              <div className="col-sm-12">
                                <label>
                                  <br></br>
                                  Lunes
                                </label>
                              </div>
                              <div className="col-sm-6">
                                <TextField
                                  margin="normal"
                                  variant="outlined"
                                  fullWidth
                                  type="time"
                                  value={horario_m1}
                                  name="horario_m1"
                                  onChange={(e) => setHorariom1(e.target.value)}
                                />
                              </div>
                              <div className="col-sm-6">
                                <TextField
                                  margin="normal"
                                  variant="outlined"
                                  fullWidth
                                  type="time"
                                  value={horario_m2}
                                  name="horario_m2"
                                  onChange={(e) => setHorariom2(e.target.value)}
                                />
                              </div>
                              <div className="col-sm-12">
                                <label>Martes</label>
                              </div>
                              <div className="col-sm-6">
                                <TextField
                                  margin="normal"
                                  variant="outlined"
                                  fullWidth
                                  type="time"
                                  value={horario_lm1}
                                  name="horario_lm1"
                                  onChange={(e) =>
                                    setHorariolm1(e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-sm-6">
                                <TextField
                                  margin="normal"
                                  variant="outlined"
                                  fullWidth
                                  type="time"
                                  value={horario_lm2}
                                  name="horario_lm2"
                                  onChange={(e) =>
                                    setHorariolm2(e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-sm-12">
                                <label>Miercoles</label>
                              </div>
                              <div className="col-sm-6">
                                <TextField
                                  margin="normal"
                                  variant="outlined"
                                  fullWidth
                                  type="time"
                                  value={horario_mm1}
                                  name="horario_mm1"
                                  onChange={(e) =>
                                    setHorariomm1(e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-sm-6">
                                <TextField
                                  margin="normal"
                                  variant="outlined"
                                  fullWidth
                                  type="time"
                                  value={horario_mm2}
                                  name="horario_mm2"
                                  onChange={(e) =>
                                    setHorariomm2(e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-sm-12">
                                <label>Jueves</label>
                              </div>
                              <div className="col-sm-6">
                                <TextField
                                  margin="normal"
                                  variant="outlined"
                                  fullWidth
                                  type="time"
                                  value={horario_jm1}
                                  name="horario_jm1"
                                  onChange={(e) =>
                                    setHorariojm1(e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-sm-6">
                                <TextField
                                  margin="normal"
                                  variant="outlined"
                                  fullWidth
                                  type="time"
                                  value={horario_jm2}
                                  name="horario_jm2"
                                  onChange={(e) =>
                                    setHorariojm2(e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-sm-12">
                                <label>Viernes</label>
                              </div>
                              <div className="col-sm-6">
                                <TextField
                                  margin="normal"
                                  variant="outlined"
                                  fullWidth
                                  type="time"
                                  value={horario_vm1}
                                  name="horario_vm1"
                                  onChange={(e) =>
                                    setHorariovm1(e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-sm-6">
                                <TextField
                                  margin="normal"
                                  variant="outlined"
                                  fullWidth
                                  type="time"
                                  value={horario_vm2}
                                  name="horario_vm2"
                                  onChange={(e) =>
                                    setHorariovm2(e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-sm-12">
                                <label>Sabado</label>
                              </div>
                              <div className="col-sm-6">
                                <TextField
                                  margin="normal"
                                  variant="outlined"
                                  fullWidth
                                  type="time"
                                  value={horario_sm1}
                                  name="horario_sm1"
                                  onChange={(e) =>
                                    setHorariosm1(e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-sm-6">
                                <TextField
                                  margin="normal"
                                  variant="outlined"
                                  fullWidth
                                  type="time"
                                  value={horario_sm2}
                                  name="horario_sm2"
                                  onChange={(e) =>
                                    setHorariosm2(e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-sm-12">
                                <label>Domingo</label>
                              </div>
                              <div className="col-sm-6">
                                <TextField
                                  margin="normal"
                                  variant="outlined"
                                  fullWidth
                                  type="time"
                                  value={horario_dm1}
                                  name="horario_dm1"
                                  onChange={(e) =>
                                    setHorariodm1(e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-sm-6">
                                <TextField
                                  margin="normal"
                                  variant="outlined"
                                  fullWidth
                                  type="time"
                                  value={horario_dm2}
                                  name="horario_dm2"
                                  onChange={(e) =>
                                    setHorariodm2(e.target.value)
                                  }
                                />
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="col-sm-12">
                                <label>
                                  <br></br>
                                  El mismo horario para todos los días
                                </label>
                              </div>
                              <div className="col-sm-6">
                                <TextField
                                  margin="normal"
                                  variant="outlined"
                                  fullWidth
                                  type="time"
                                  value={horario_m1}
                                  name="horario_m1"
                                  onChange={(e) =>
                                    setHorariom1(e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-sm-6">
                                <TextField
                                  margin="normal"
                                  variant="outlined"
                                  fullWidth
                                  type="time"
                                  value={horario_m2}
                                  name="horario_m2"
                                  onChange={(e) =>
                                    setHorariom2(e.target.value)
                                  }
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </figure>
                    <figure className="ps-block--form-box">
                      <figcaption style={{ color: "white" }}>Imagen</figcaption>
                      <div className="ps-block__content">
                        <div className="form-group row">
                          <div className="col-sm-6">
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={Img}
                            >
                              {" "}
                              Imagen{" "}
                            </Button>
                          </div>
                          <div className="col-sm-6">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={Logo}
                              style={{ color: "white" }}
                            >
                              {" "}
                              Logo
                            </Button>
                          </div>
                          {imglogo === "img" ? (
                            <>
                              <label>
                                <br></br>
                                Por favor verifique que la imagen tenga los
                                siguientes formatos: 'png', 'jpg', 'JPG',
                                'jpeg', 'gif'
                              </label>
                              <div className="form-group--nest row">
                                <div className="col-sm-12">
                                  <input
                                    className="form-control mb-1"
                                    type="file"
                                    placeholder=""
                                    style={{ paddingTop: "10px" }}
                                    accept=".png,.jpg,.JPG,.jpeg,.gif"
                                    onChange={(e) => handleImg(e.target.files)}
                                  />
                                </div>
                                <div className="col-sm-12 text-center">
                                  <div className="ps-block__left">
                                    <img
                                      src={img1}
                                      alt=""
                                      width="200px"
                                      height="200px"
                                    />
                                  </div>
                                  <br></br>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <label>
                                <br></br>
                                Por favor verifique que el logo tenga los
                                siguientes formatos: 'png', 'jpg', 'JPG',
                                'jpeg', 'gif'
                              </label>
                              <div className="form-group--nest row">
                                <div className="col-sm-12">
                                  <input
                                    className="form-control mb-1"
                                    type="file"
                                    placeholder=""
                                    style={{ paddingTop: "10px" }}
                                    accept=".png,.jpg,.JPG,.jpeg,.gif"
                                    onChange={(e) => handleImg(e.target.files)}
                                  />
                                </div>
                                <div className="col-sm-12 text-center">
                                  <div className="ps-block__left">
                                    <img
                                      src={img1}
                                      alt=""
                                      width="200px"
                                      height="200px"
                                    />
                                  </div>
                                  <br></br>
                                </div>
                              </div>
                            </>
                          )}

                          {/* <button className="ps-btn ps-btn--sm">
                                Enviar imagen
                              </button> */}
                        </div>
                      </div>
                    </figure>
                  </div>
                </div>
              </div>
              {/* {plaza.map(item => {
                return( item.nombre === nomplaza 
                        ? setEstado(false) 
                        : setEstado(true)
                  )
              })}
              {estado === true ? <div className="col-sm-12 text-center">
                        <button className="ps-btn success" style={{marginBottom: '30px'}} onClick={setRegistro}>
                            Registrar
                        </button>
                      </div> : false
              } */}
              <div className="col-sm-12 text-center">
                {alerta === true ? (
                  <Alert severity="success">
                    Información enviada exitosamente
                  </Alert>
                ) : (
                  false
                )}
                <br></br>
              </div>
              <div className="col-sm-12 text-center">
                <button
                  className="ps-btn success"
                  style={{ marginBottom: "30px", marginTop: "15px" }}
                  onClick={setRegistro}
                >
                  Registrar
                </button>
                <br></br>
              </div>
            </section>
          </Fragment>
        </Modal>
      </ThemeProvider>
    </ContainerDashboard>
  );
};
export default Plazas;
// export default connect((state) => state.app)(SettingsPage);
