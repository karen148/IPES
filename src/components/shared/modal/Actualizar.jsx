import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Modal from "./index";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";

const Actualizar = ({
  open,
  handleClose,
  idPlaza,
  nombre1,
  direccion1,
  email1,
  imagen,
  locali,
  funcio2,
  cat1,
  horarios1,
  telefonos1,
  logo1
}) => {
  const { funcionarios, categorias, localidades } = useSelector(
    (state) => state.plaza
  );

  const [alerta1, setAlerta1] = useState(false);
  const [alerta, setAlerta] = useState(false);
  const [nombre2, setNombre2] = useState("");
  const [email2, setEmail] = useState("");
  const [horaSI, setHoraSI] = useState(false);
  const [imglogo, setImgLogo] = useState('img');
  const [direccion2, setDireccion] = useState("");
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
  const [horario, setHorario] = useState([]);
  const [plaza1, setPlaza1] = useState([]);
  const [local, setLocal2] = useState("");
  const [cat, setCat] = useState([]);
  const [funcio, setFunci2] = useState([]);
  const [telefonos2, setTele2] = useState([]);
  const [telefonos, setTele] = useState([{ telefono: " " }]);
  const [img, setImg] = useState(null);
  const [img1, setImg1] = useState(null);

  useEffect(() => {
    if (nombre1) {
      let semana = [];
      if (horarios1) {
        for (let h = 0; h < horarios1.length; h++) {
          semana.push(horarios1[h].split("-", 2));
        }
      }

      if (semana.length) {
        setHorariom1(semana[0][0]);
        setHorariom2(semana[0][0]);
        setHorariolm1(semana[0][1]);
        setHorariolm2(semana[0][1]);
        setHorariomm1(semana[1][0]);
        setHorariomm2(semana[1][0]);
        setHorariojm1(semana[1][1]);
        setHorariojm2(semana[1][1]);
        setHorariovm1(semana[1][1]);
        setHorariovm2(semana[1][1]);
        setHorariosm1(semana[1][1]);
        setHorariosm2(semana[1][1]);
        setHorariodm1(semana[1][1]);
        setHorariodm2(semana[1][1]);
      } else {
        setHorariom1("");
        setHorariom2("");
        setHorariolm1("");
        setHorariolm2("");
        setHorariomm1("");
        setHorariomm2("");
        setHorariojm1("");
        setHorariojm2("");
        setHorariovm1("");
        setHorariovm2("");
        setHorariosm1("");
        setHorariosm2("");
        setHorariodm1("");
        setHorariodm2("");
      }

      let telefonos = [];
      if (telefonos1) {
        for (let h = 0; h < telefonos1.length; h++) {
          telefonos.push({ telefono: telefonos1[h] });
        }
      }

      let categorias = [];
      if (cat1) {
        for (let h = 0; h < cat1.length; h++) {
          categorias.push({ id: h, label: cat1[h] });
        }
      }
      console.log(categorias);
      let admin = "";
      if (funcio2) {
        admin = funcionarios.filter((fu) => fu.id === funcio2);
        setFunci2(admin[0].label);
      } else {
        setFunci2("");
      }

      // let nombre = ''
      // if(funcio2.label){
      //   nombre = funcio2.label
      // }

      console.log(telefonos);
      setNombre2(nombre1);
      setDireccion(direccion1);
      setEmail(email1);
      setImg1(
        process.env.REACT_APP_URL_API + `uploads/retorna/PLAZA/${imagen ? imagen : logo1}`
      );
      setLocal2(locali);

      setTele(telefonos);
      setCat(categorias);
    }
  }, [
    nombre1,
    direccion1,
    email1,
    imagen,
    locali,
    funcio2,
    cat1,
    horarios1,
    telefonos1,
    logo1,
  ]);

  console.log(logo1);
  console.log(funcio2);
  console.log(locali);

  const HoraSi = () => {
    setHoraSI(true);
  };

  const HoraNO = () => {
    setHoraSI(false);
  };

  const Logo = () => {
    setImgLogo('logo');
  };

  const Img = () => {
    setImgLogo('img');
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

  const setActulizar = async () => {
    let horario = [];
    horario.push(
      horario_m1 + "-" + horario_m2,
      horario_lm1 + "-" + horario_lm2,
      horario_mm1 + "-" + horario_mm2,
      horario_jm1 + "-" + horario_jm2,
      horario_vm1 + "-" + horario_vm2,
      horario_sm1 + "-" + horario_sm2,
      horario_dm1 + "-" + horario_dm2,
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

    console.log(funcio);
    axios
      .put(
        process.env.REACT_APP_URL_API + `plazas/update/${idPlaza}`,
        {
          admin_id: funcio.id,
          localidad_nombre: local,
          categorias_nombres: cate,
          nombre: nombre2,
          direccion: direccion2,
          telefonos: tele,
          email: email2,
          horarios: horario,
        },
        config
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setAlerta(true);
        }
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };

  const setImagen = async () => {
    const formData = new FormData();
    formData.append("imagen", img);
    formData.append("plaza", imglogo);
    console.log(img);
    let config1 = {
      method: "put",
      url: process.env.REACT_APP_URL_API + `uploads/PLAZA/${idPlaza}`,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      data: formData,
    };
    axios(config1)
      .then((response) => {
        if (response.status) {
          setAlerta1(true);
        }
      })
      .catch((e) => {
        console.log("ERROR", e);
      });
  };
  console.log(nombre2);
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
                  Datos de la plaza {nombre1}
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
                      value={nombre2}
                      onChange={(e) => setNombre2(e.target.value)}
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
                      value={direccion2}
                      onChange={(e) => setDireccion(e.target.value)}
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
                      value={email2}
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </figure>
              <figure className="ps-block--form-box">
                <figcaption style={{ color: "white" }}>Categorías</figcaption>
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
                <figcaption style={{ color: "white" }}>Horario</figcaption>
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
                            onChange={(e) => setHorariolm1(e.target.value)}
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
                            onChange={(e) => setHorariolm2(e.target.value)}
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
                            onChange={(e) => setHorariomm1(e.target.value)}
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
                            onChange={(e) => setHorariomm2(e.target.value)}
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
                            onChange={(e) => setHorariojm1(e.target.value)}
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
                            onChange={(e) => setHorariojm2(e.target.value)}
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
                            onChange={(e) => setHorariovm1(e.target.value)}
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
                            onChange={(e) => setHorariovm2(e.target.value)}
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
                            onChange={(e) => setHorariosm1(e.target.value)}
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
                            onChange={(e) => setHorariosm2(e.target.value)}
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
                            onChange={(e) => setHorariodm1(e.target.value)}
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
                            onChange={(e) => setHorariodm2(e.target.value)}
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
                    {imglogo ==='img' ? (
                      <>
                        <label>
                          <br></br>
                          Por favor verifique que la imagen tenga los
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
                            {alerta1 === true ? (
                              <Alert severity="success">
                                Imagen actualizada
                              </Alert>
                            ) : (
                              false
                            )}
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
                        </div>
                      </>
                    ) : (
                      <>
                        <label>
                          <br></br>
                          Por favor verifique que el logo tenga los siguientes
                          formatos: 'png', 'jpg', 'JPG', 'jpeg', 'gif'
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
                            {alerta1 === true ? (
                              <Alert severity="success">
                                Logo actualizado
                              </Alert>
                            ) : (
                              false
                            )}
                            <br></br>
                          </div>
                          <div className="col-sm-12 text-center">
                            <button
                              className="ps-btn success"
                              style={{ marginBottom: "30px" }}
                              onClick={setImagen}
                            >
                              Actualizar Logo
                            </button>
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
        {alerta === true ? (
          <Alert severity="success">Información enviada exitosamente</Alert>
        ) : (
          false
        )}

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
