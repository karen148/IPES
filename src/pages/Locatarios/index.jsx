import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";

import ContainerDashboard from "../../components/layaouts/ContainerDashboard";
import TablasLocatarios from "./../../components/shared/tables/TablasLocatarios";
import HeaderDashboard from "./../../components/shared/headers/HeaderDashboard";

import { getPlaz } from './../../actions/plaza'
import { getLocatario } from "../../actions/locatarios";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from "@material-ui/icons/Edit";
import RefreshIcon from '@material-ui/icons/Refresh';


import MenuItem from "@material-ui/core/MenuItem";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import NotesIcon from '@material-ui/icons/Notes';

import { ThemeProvider } from "@material-ui/core/styles";
import Modal from "./../../components/shared/modal";
import theme from './../../theme';
import TooltipE from './../../components/shared/tooltip';
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { ListItemText } from "@material-ui/core";
import Crear from "../../components/shared/modal/Locatarios/Crear";


const estados = [
  {
    value:'inactivo',
    label:'inactivo'
  },
  {
    value:'activo',
    label:'activo'
  }
]


const Locatarios = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { funcionarios, plazas, localidades } = useSelector(state => state.plaza)
  const { locatarios } = useSelector(state => state.locatario)

  const [currency1, setCurrency1] = React.useState(null);
  const [currency2, setCurrency2] = React.useState(null);

  const [alerta, setAlerta] = useState(false);
  const [locatario1, setLocatarios] = useState(locatarios);
  const [open, setOpen] = React.useState(false);
  const [telefonos, setTele] = useState([{telefono: ' '}]);
  const [local, setLocal2] = useState('');
  const [cat, setCat] = useState([]);
  const [funcio, setFunci2] = useState([]);
  const [nomplaza, setNomplaza] = useState('');
  const [nomplaza1, setNomplaza1] = useState('');
  const [img, setImg] = useState(null);
  const [img1, setImg1] = useState(null);
  const [state, setStatet] = useState({
      id: '',
      nombre: '',
      direccion: '',
      email: '',
      horario_m1: '',
      horario_m2: '',
      horario_t1:'',
      horario_t2:'',
  })

  useEffect(() => {
    dispatch( getLocatario());
  }, [dispatch,])

  useEffect(() => {
    dispatch( getPlaz());
  }, [dispatch])

  console.log(locatario1);
  const handleImg = (event) => {
    var reader = new FileReader();
     reader.readAsDataURL(event[0]);
     reader.onload = function() {
       setImg(event[0]);
       setImg1(reader.result)
     };
     
     reader.onerror = function() {
       console.log(reader.error);
     };
 };

  const handleState = (event) => {
    const {value , name} = event.target;
    setStatet((_state) => ({..._state, [name]: value}));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    getPlaz();
    setAlerta(false)
  };

  const handleChange1 = (event) => {
    setCurrency1(event.target.value);
  };

  const handleChange2 = (event) => {
    setCurrency2(event.target.value);
  };
  
  //agregar un telefono
  const handleAddTel = () =>{
    setTele([...telefonos, {telefono: ''}])
  }

  //evento para modificar input
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...telefonos];
    list[index][name] = value;
    setTele(list);
  };

  // evento para remover un hijo
  const handleRemoveClick = index => {
    const list = [...telefonos];
    list.splice(index, 1);
    setTele(list);
  };
  
  const setRegistro = async () => {
    let horario = []
    horario.push(state.horario_m1+'-'+state.horario_m2, state.horario_t1+'-'+state.horario_t2)
    let tele= []
    telefonos.map(item => {
      Array.prototype.push.apply(tele, [item.telefono])
    })
    let cate = []
    cat.map(item => {
      Array.prototype.push.apply(cate, [item.label])
    })

    let config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    axios.post(process.env.REACT_APP_URL_API +"plazas/crear",
        {
          admin_id: funcio.id,
          localidad_nombre: local,
          nombre: nomplaza,
          categorias_nombres:cate,
          direccion: state.direccion,
          telefonos: tele,
          email: state.email,
          horarios: horario,
        }
        ,config
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("SE REGISTRO");
          console.log(response);
          let id = response.data.plaza.id
          const formData = new FormData();
          formData.append('imagen', img)
          formData.append('plaza', 'img')
          console.log(img);
          let config1 = {
            method: 'put',
            url: process.env.REACT_APP_URL_API+'uploads/PLAZA/'+id,
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            data: formData
          };
          axios(config1)
          .then(response => {
            if (response.status) {
              setAlerta(true)
            }
          })
          .catch((e) => {
            console.log('ERROR',e);
          })
        }
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };


  // const Filtros = () =>{
  //   console.log(currency1+' - '+currency2);
  //   let data = []
  //   let data1 = []
  //   if (currency2 !==null && currency1 === null) {
  //     data = plaza1.filter(item => item.localidad === currency2)
  //   }else if (currency2 === null && currency1 !== null) {
  //     data = plaza1.map(item => {
  //       if (item.categorias !== null && item.categorias.length > 0) {
  //         for (let i = 0; i < item.categorias.length; i++) {
  //           const element = item.categorias[i];
  //           console.log(element);
  //           if (element === currency1) {
  //              return item;
  //              console.log(element);
  //              console.log(item);
  //           }
  //         }
  //       }
  //     })
  //   }else {
  //     console.log('hola');
  //     data = plaza1.map(item => {
  //       if(item.localidad === currency2) {
  //         if (item.categorias !== null && item.categorias.length > 0) {
  //           for (let i = 0; i < item.categorias.length; i++) {
  //             const element = item.categorias[i];
  //             console.log(element);
  //             if (element === currency1) {
  //                return item
  //             }
  //           }
  //         }
  //       }
  //     })
  //   }
  //   setPlaza1(data)
  // }

  // const Restaurar = () =>{
  //   setPlaza1(plazas)
  //   setCurrency1(null)
  //   setCurrency2(null)
  // }

  // const Buscar = () => {
  //   let data = []
  //   data = plaza1.filter(item => item.nombre === nomplaza1)
  //   setPlaza1(data)
  // }

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
        </div>
        <div className="ps-section__header">
          <div className="ps-section__filter ps-form--filter">
            <div className="ps-form__left ">
              <div className={"form-group" + " " + classes.root}>
                  <TextField
                    id="filled-select-currency"
                    select
                    label="Plaza de emrcado"
                    value={currency1}
                    onChange={handleChange1}
                    fullWidth
                    className={classes.margin}
                    style={{marginRight:'20px'}}
                  >
                    {plazas.map((option) => (
                      <MenuItem key={option.id} value={option.nombre}>
                        {option.nombre}
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
                    style={{marginRight:'20px'}}
                    className={classes.margin}
                  >
                    {localidades.map((option) => (
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
                    value={currency2}
                    onChange={handleChange2}
                    fullWidth
                    style={{marginRight:'20px'}}
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
              <TooltipE title='Filtrar'> 
                <IconButton color="primary" component="span">
                  <NotesIcon style={{fontSize: '35px', marginTop: '-5px', marginLeft:'-10px'}}/>
                </IconButton>
              </TooltipE>
            </div>
            <div className="ps-form__right">
              <TooltipE title='Restaurar información'> 
                <IconButton color="secondary" component="span">
                  <RefreshIcon style={{fontSize: '35px', marginTop: '-5px'}}/>
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
                  <TextField {...params} 
                      margin="normal" 
                      type= 'text'
                      id="standard-basic"
                      style={{width: '300px', marginTop: '5px'}}
                      placeholder="Por favor ingrese el nombre de la plaza..."
                        />
                  )}
              />
          </div>
            <TooltipE title='Buscar'> 
                <IconButton color="primary" component="span">
                  <SearchIcon style={{fontSize: '35px', marginTop: '-15px'}}/>
                </IconButton>
            </TooltipE>
          </div>
        </div>
        <div className="ps-section__content">
            <TablasLocatarios />
        </div>
        <div className="ps-section__footer">
          <p>Mostrar 10 de 30 artículos.</p>
          {/* <Pagination /> */}
        </div>
      </section>
        <Crear
          open={open}
          handleClose={handleClose}
        />
    </ContainerDashboard>
  );
};
export default Locatarios;
// export default connect((state) => state.app)(SettingsPage);
