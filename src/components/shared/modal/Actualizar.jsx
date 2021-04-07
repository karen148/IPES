import React, { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import axios from "axios"

import Modal from './index';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';


const Actualizar = ({ plazas, open, handleClose, idPlaza}) => {

    const { funcionarios, categorias, localidades } = useSelector(state => state.plaza)
    const [alerta1, setAlerta1] = useState(false);
    const [alerta, setAlerta] = useState(false);
    const [horario, setHorario] = useState([]);
    const [plaza1, setPlaza1] = useState([]);
    const [local, setLocal2] = useState('');
    const [cat, setCat] = useState([]);
    const [funcio1, setFunci1] = useState('');
    const [funcio, setFunci2] = useState([]);
    const [telefonos1, setTele2] = useState([]);
    const [telefonos, setTele] = useState([{telefono: ' '}]);
    const [img, setImg] = useState(null);
    const [img1, setImg1] = useState(null);
    const [ state, setStatet ] = useState({
        nombre: '',
        direccion: '',
        email:'',
        horario_m1: '',
        horario_m2: '',
        horario_t1:'',
        horario_t2:'',
    })

    const { nombre, direccion, email, horario_m1, horario_m2, horario_t1, horario_t2} = state;

    const Actualiza = () =>{
        plazas.map(item => {
            if (item !== undefined && item.id === idPlaza) {
              setStatet({state, nombre: item.nombre})
              setStatet({state, direccion: item.direccion})
              setStatet({state, email: item.email})
              setHorario(item.horarios)
              setTele2(item.telefonos)
              setCat(item.categorias)
              setLocal2(item.localidad)
              setFunci2(funcionarios.map(fun => {return ( item.usuario === fun.id ? fun.label :'')}))
              setImg1(process.env.REACT_APP_URL_API+`uploads/retorna/PLAZA/${item.img}`)
            }
        })
    }
    useEffect(() => {
        Actualiza()
    }, [])

    console.log(direccion);

    const handlePlaza = (event) => {
        const {value , name} = event.target;
        setStatet((_state) => ({..._state, [name]: value}));
      };

    //agregar un telefono
    const handleAddTel = () =>{
        setTele([...telefonos, {telefono: ''}])
    }

    console.log(direccion);
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
    }

    const setActulizar = async () => {
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
    
        axios.put(process.env.REACT_APP_URL_API+`plazas/update/${idPlaza}`,
            {
              admin_id: funcio.id,
              localidad_nombre: local,
              categorias_nombres:cate,
              nombre: nombre,
              direccion: direccion,
              telefonos: tele,
              email: email,
              horarios: horario,
            }
            ,config
          )
          .then((response) => {
            if (response.status === 200) {
                console.log(response);
                setAlerta(true)
            }
          })
          .catch((e) => {
            console.log("ERROR!!!!!", e);
          });
    };

    const setImagen = async () => {
        const formData = new FormData();
        formData.append('imagen', img)
        formData.append('plaza', 'img')
        console.log(img);
        let config1 = {
            method: 'put',
            url: process.env.REACT_APP_URL_API+`uploads/PLAZA/${idPlaza}`,
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            data: formData
        };
        axios(config1)
        .then(response => {
        if (response.status) {
            setAlerta1(true)
        }
        })
        .catch((e) => {
        console.log('ERROR',e);
        })
};

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="Actualizar plaza"
      tamaño="xl"
    >
      <section className="ps-new-item">
            <div className="ps-form__content">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                  <figure className="ps-block--form-box">
                    <figcaption style={{ color: "white" }}>
                      Datos de la plaza {idPlaza}
                    </figcaption>
                    <div className="ps-block__content">
                      <div className="form-group">
                        <label>
                          Nombre de la plaza<sup>*</sup>
                        </label>
                        <TextField
                          margin="normal"
                          variant="outlined"
                          type="text"
                          placeholder="Por favor ingrese el nombre de la plaza..."
                          name="nombre"
                          fullWidth
                          value={nombre}
                          onChange={handlePlaza}
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
                          value={direccion}
                          onChange={handlePlaza}
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
                            options={localidades.map((option) => option.label)}
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
                            options={funcionarios.map((option) => option.label)}
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
                          value={email}
                          name="email"
                          onChange={handlePlaza}
                        />
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-12">
                          <label>
                            Horario de la mañana<sup>*</sup>
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
                            onChange={handlePlaza}
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
                            onChange={handlePlaza}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-12">
                          <label>
                            Horario de la tarde<sup>*</sup>
                          </label>
                        </div>
                        <div className="col-sm-6">
                          <TextField
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            type="time"
                            value={horario_t1}
                            name="horario_t1"
                            onChange={handlePlaza}
                          />
                        </div>
                        <div className="col-sm-6">
                          <TextField
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            type="time"
                            value={horario_t2}
                            name="horario_t2"
                            onChange={handlePlaza}
                          />
                        </div>
                      </div>
                    </div>
                  </figure>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
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
                  <figure className="ps-block--form-box">
                    <figcaption style={{ color: "white" }}>Imagen</figcaption>
                    <div className="ps-block__content">
                      <div className="form-group">
                        <label>
                          Por favor verifique que la foto o imagen tenga los
                          siguientes formatos: 'png', 'jpg', 'JPG', 'jpeg',
                          'gif'
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
                          <div className="col-sm-12 text-center">
                            {alerta1 === true ? <Alert severity="success">Imagen actualizada</Alert> : false}
                            <br></br>
                          </div>
                          <div className="col-sm-12 text-center">
                            <button
                                className="ps-btn success"
                                style={{ marginBottom: "30px" }}
                                onClick={setImagen}
                            >
                                Actualizar Imagen
                            </button>
                        </div>
                          {/* <button className="ps-btn ps-btn--sm">
                                Enviar imagen
                              </button> */}
                        </div>
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
            {alerta === true ? <Alert severity="success">Información enviada exitosamente</Alert> : false}

            <div className="col-sm-12 text-center">
              <button
                className="ps-btn success"
                style={{ marginBottom: "30px" }}
                onClick={setActulizar}
              >
                Actualizar datos de la plaza
              </button>
            </div>
          </section>
    </Modal>
  );
};

export default Actualizar;
