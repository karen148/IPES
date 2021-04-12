import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Modal from "./../index";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";

import { useForm } from "./../../../../hooks/useForm";

const Actualizar = ({
  open,
  handleClose,
  idPlaza,
  loc1,
  ced1,
  nom1,
  ape1,
  email1,
  telefonos1,
  plaza1,
  categorias1,
  horarios2,
  imagen2,
  logo2,
}) => {
  const { plazastrues } = useSelector((state) => state.plaza);
  const { locatarios } = useSelector((state) => state.locatario);
  const { id } = useSelector((state) => state.auth);

  const [horaSI, setHoraSI] = useState(false);
  const [alerta1, setAlerta1] = useState(false);
  const [imglogo, setImgLogo] = useState("img");
  const [nombre2, setNombre2] = useState("");
  const [cedula3, setCedula3] = useState("");
  const [apellido2, setApellido2] = useState("");
  const [local2, setLocal2] = useState("");
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

  
  const [img, setImg] = useState(null);
  const [img1, setImg1] = useState(null);
  const [telefonos, setTele] = useState([{ telefono: " " }]);
  const [alerta, setAlerta] = useState(false);
  const [plaza, setPlaza] = useState([]);
  const [cat, setCat] = useState([]);
  const [infoLocatarios, handleInputChange, setValues] = useForm({
    email: '',
  });

  const { email } = infoLocatarios;

  useEffect(() => {
    if (ced1) {
      let semana = [];
      if (horarios2) {
        for (let h = 0; h < horarios2.length; h++) {
          semana.push(horarios2[h].split("-", 2));
        }
      }
      setCedula3(ced1);

      setLocal2(loc1);

      setNombre2(nom1);

      setApellido2(ape1);

      // setValues({infoLocatarios, actividad: '-'})

      setValues({ infoLocatarios, email: email1 });

      if (semana.length) {
        setHorariom1(semana[0][0]);
        setHorariom2(semana[0][1]);
        setHorariolm1(semana[1][0]);
        setHorariolm2(semana[1][1]);
        if(semana.length > 2){
        setHorariomm1(semana[2][0]);
        setHorariomm2(semana[2][1]);
        setHorariojm1(semana[3][0]);
        setHorariojm2(semana[3][1]);
        setHorariovm1(semana[4][0]);
        setHorariovm2(semana[4][1]);
        setHorariosm1(semana[5][0]);
        setHorariosm2(semana[5][1]);
        setHorariodm1(semana[6][0]);
        setHorariodm2(semana[6][1]);
      }
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


      setTele(telefonos);

      setPlaza(
        plazastrues.length !== 0
          ? plazastrues.filter((item) => item?.id === plaza1)[0]
          : ""
      );

      setCat(categorias1);

      setImg1(
        process.env.REACT_APP_URL_API +
          `uploads/retorna/LOCATARIO/${imagen2 ? imagen2 : logo2}`
      );
    }
  }, [
    loc1,
    ced1,
    nom1,
    ape1,
    email1,
    telefonos1,
    plaza1,
    categorias1,
    horarios2,
    imagen2,
    logo2,
  ]);

  console.log(cedula3);
  console.log(plaza);
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

  //agregar un telefono
  const handleAddTel = () => {
    setTele([...telefonos, { telefono: "" }]);
  };

  //evento para modificar input
  const handleInputChange1 = (e, index) => {
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


  const setActualizar = async () => {
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

    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    axios
      .put(
        process.env.REACT_APP_URL_API + "locatarios/update/" + idPlaza,
        {
          admin_id: id,
          plaza_id: plaza.id,
          nombre_local: local2,
          categorias: cat,
          nombre: nombre2,
          apellido: apellido2,
          cedula: cedula3,
          horarios: horario,
          telefonos: tele,
          email: email,
        },
        config
      )
      .then((response) => {
        if (response.status === 200) {
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
    formData.append("locatario", imglogo);
    console.log(img);
    let config1 = {
      method: "put",
      url: process.env.REACT_APP_URL_API + `uploads/LOCATARIO/${idPlaza}`,
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

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="Actualizar locatario"
      tamaño="xl"
    >
      <section className="ps-new-item">
        <div className="ps-form__content">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
              <figure className="ps-block--form-box">
                <figcaption style={{ color: "white" }}>
                  Datos del locatario
                </figcaption>
                <div className="ps-block__content">
                  <div className="form-group">
                    <label>
                      Nombre del establecimiento<sup>*</sup>
                    </label>
                    <TextField
                      margin="normal"
                      variant="outlined"
                      type="text"
                      placeholder="Por favor ingrese el nombre del establecimiento"
                      name="local"
                      fullWidth
                      value={local2}
                      onChange={(e) => setLocal2(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Cédula<sup>*</sup>
                    </label>
                    {/* <div className="col-sm-12 text-center">
                      {locatarios.map((option) => {
                        return (
                          option.cedula === cedula && (
                            <Alert severity="error">
                              El locatario ya existe
                            </Alert>
                          )
                        );
                      })}
                      <br></br>
                    </div> */}
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      options={locatarios.map((option) => option.cedula)}
                      inputValue={cedula3}
                      onInputChange={(event, newInputValue) => {
                        setCedula3(newInputValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          margin="normal"
                          variant="outlined"
                          type="text"
                          placeholder="Por favor ingrese el número del documento..."
                        />
                      )}
                    />
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-6">
                      <label>
                        Nombres<sup>*</sup>
                      </label>
                      <TextField
                        margin="normal"
                        variant="outlined"
                        type="text"
                        name="nombre"
                        fullWidth
                        value={nombre2}
                        onChange={(e) => setNombre2(e.target.value)}
                      />
                    </div>
                    <div className="col-sm-6">
                      <label>
                        Apellidos<sup>*</sup>
                      </label>
                      <TextField
                        margin="normal"
                        variant="outlined"
                        type="text"
                        name="apellido"
                        fullWidth
                        value={apellido2}
                        onChange={(e) =>setApellido2(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-12">
                      <label>
                        Correo electrónico<sup>*</sup>
                      </label>
                      <TextField
                        margin="normal"
                        variant="outlined"
                        type="text"
                        name="email"
                        fullWidth
                        value={email}
                        onChange={handleInputChange}
                      />
                    </div>
                    {/* <div className="col-sm-6">
                      <label>
                        Actividad económica<sup>*</sup>
                      </label>
                      <TextField
                        margin="normal"
                        variant="outlined"
                        type="text"
                        name="actividad"
                        fullWidth
                        value={actividad}
                        onChange={handleInputChange}
                      />
                    </div> */}
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
                              onChange={(e) => handleInputChange1(e, i)}
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
                </div>
              </figure>
              <figure className="ps-block--form-box">
                <figcaption style={{ color: "white" }}>
                  Datos de la Plaza de mercado
                </figcaption>
                <div className="ps-block__content">
                  <div className="form-group row">
                    <div className="col-sm-6">
                      <label>
                        Plaza de mercado<sup>*</sup>
                      </label>
                      <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={plazastrues}
                        getOptionLabel={(option) => option.nombre}
                        value={plaza}
                        onChange={(event, newValue) => {
                          setPlaza(newValue);
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
                      <label>Localidad</label>
                      <TextField
                        margin="normal"
                        variant="outlined"
                        type="text"
                        name="localidad1"
                        fullWidth
                        disabled
                        value={
                          plaza?.length !== 0
                            ? plazastrues.filter(
                                (item) => item.nombre === plaza?.nombre
                              )[0]?.localidad_nombre
                            : ""
                        }
                      />
                    </div>
                    <div className="col-sm-12">
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
                        options={
                          plaza?.length !== 0
                            ? plazastrues.filter(
                                (item) => item.nombre === plaza?.nombre
                              )[0]?.categorias_nombres
                            : "Vacio"
                        }
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
                    {imglogo === "img" ? (
                      <>
                        <label>
                          <br></br>
                          Por favor verifique que la imagen tenga los siguientes
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
        <div className="col-sm-12 text-center">
          {alerta === true ? (
            <Alert severity="success">Información enviada exitosamente</Alert>
          ) : (
            false
          )}
          <br></br>
        </div>
        <div className="col-sm-12 text-center">
          <button
            className="ps-btn success"
            style={{ marginBottom: "30px", marginTop: "15px" }}
            onClick={setActualizar}
          >
            Actualizar información
          </button>
          <br></br>
        </div>
      </section>
    </Modal>
  );
};

export default Actualizar;
