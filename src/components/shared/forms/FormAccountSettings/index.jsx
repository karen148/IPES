import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { updateImg } from "actions/imagen";
import firebase from "firebase";

const FormAccountSettings = () => {
  const { id, rol, img } = useSelector((state) => state.auth);

  const [ojo1, setOjo1] = useState("visibility_off");
  const [ojo2, setOjo2] = useState("visibility_off");
  const [img1, setImg] = useState(null);
  const [email1, setEmail] = useState("");
  const [state, setState] = useState({
    nombre: "",
    apellido: "",
    telefono: 0,
    email: "",
    cedula: 0,
    contraseña: "",
    confirmar_contraseña: "",
    antigua: "",
  });

  const handleState = (event) => {
    const { value, name } = event.target;
    setState((_state) => ({ ..._state, [name]: value }));
  };

  const handleImg = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event[0]);
    reader.onload = function () {
      setImg(event[0]);
    };

    reader.onerror = function () {
      console.log(reader.error);
    };
  };

  // const fecthApi2 = async () => {
  //   axios
  //     .post(
  //       "https://api-dashboard-auth-ipes.azurewebsites.net/locatarios/registro",
  //       {
  //         nombre: state.nombre,
  //         apellido: state.apellido,
  //         telefono: state.telefono,
  //         cedula: state.cedula,
  //         email: state.email,
  //         password: state.contraseña,
  //       }
  //       // config
  //     )
  //     .then((response) => {
  //       console.log(response.status);
  //       if (response.status === 200) {
  //         console.log("SE REGISTRO");
  //         return history.push("/");
  //       } else {
  //         return history.push("/sign-up");
  //       }
  //     })
  //     .catch((e) => {
  //       console.log("ERROR!!!!!", e);
  //     });
  // };

  const getDatos = async () => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(process.env.REACT_APP_URL_API + `admins/getAdmin/${id}`, config)
      .then((response) => {
        let data = response.data.admin;
        setState({ state, nombre: data.nombre });
        setState({ state, apellido: data.apellido });
        setState({ state, telefono: data.telefono });
        setState({ state, email: data.email });
        setState({ state, cedula: data.cedula });
        setEmail(data.email);
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
  useEffect(() => {
    getDatos();
  }, []);

  const fecthApi = async () => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .put(
        process.env.REACT_APP_URL_API + `admins/updateAdmin/${id}`,
        {
          nombre: state.nombre,
          apellido: state.apellido,
          telefono: state.telefono,
          cedula: state.cedula,
        },
        config
      )
      .then((response) => {
        if (response.status === 200) {
          getDatos();
          // return(<div className={classes.root}><Alert severity="success">Datos actualizados</Alert></div>)
          alert("Datos actualizados");
        }
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };

  console.log(img1);
  console.log(state.cedula);
  console.log(state.telefono);

  const UpdateImagen = () => {
    updateImg(img1, `ADMINS/${rol}/${id}`, `admins/updateAdmin/${id}`, "img");
    var desertRef = firebase
      .app()
      .storage("gs://ipes-adeda.appspot.com")
      .ref(`/ADMINS/${rol}/${id}`)
      .child(`${img}`);
    desertRef
      .delete()
      .then((ref) => console.log("success =>", ref))
      .catch((error) => console.log(error));
  };

  const ValiContraseña = (confirmar_contraseña) => {
    if (
      /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,16}$/.test(confirmar_contraseña)
    ) {
      return true;
    } else {
      console.log("MALLLL");
      return false;
    }
  };

  const showPass1 = () => {
    var cambio = document.getElementById("pass1");
    if (cambio.type === "password") {
      cambio.type = "text";
      setOjo1("visibility");
    } else {
      cambio.type = "password";
      setOjo1("visibility_off");
    }
  };

  const showPass2 = () => {
    var cambio = document.getElementById("pass2");
    if (cambio.type === "password") {
      cambio.type = "text";
      setOjo2("visibility");
    } else {
      cambio.type = "password";
      setOjo2("visibility_off");
    }
  };

  const changePass = async () => {
    console.log(email1);
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    if (ValiContraseña(state.confirmar_contraseña)) {
      axios
        .put(
          process.env.REACT_APP_URL_API + "admins/change-password",
          {
            email: email1,
            oldPassword: state.antigua,
            newPassword: state.contraseña,
          },
          config
        )
        .then((response) => {
          if (response.status === 200) {
            alert("Se atualizo la contraseña");
          } else {
            alert("No se atualizo la contraseña");
          }
        })
        .catch((error) => {
          if (error.response) {
            //do something
            console.log(error.response);
          } else if (error.request) {
            //do something else
            console.log(error.request);
          } else if (error.message) {
            //do something other than the other two
            console.log(error.message);
          }
        });
    }
  };

  console.log(img1);
  console.log(
    /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,16}$/.test(state.contraseña)
  );
  return (
    <Fragment>
      <div className="row" key={localStorage.getItem("id")}>
        <div className="col-sm-6">
          <div className="form-group">
            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={state.nombre}
              onChange={handleState}
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label>Apellido</label>
            <input
              className="form-control"
              type="text"
              name="apellido"
              value={state.apellido}
              onChange={handleState}
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label>Cedula</label>
            <input
              className="form-control"
              type="number"
              name="cedula"
              value={state.cedula}
              onChange={handleState}
              disabled
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label>Teléfono</label>
            <input
              className="form-control"
              type="number"
              name="telefono"
              value={state.telefono}
              onChange={handleState}
            />
          </div>
        </div>
        <div className="col-sm-12">
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={state.email}
              onChange={handleState}
              disabled
            />
          </div>
        </div>
        <div className="col-sm-12 text-center">
          <button
            className="ps-btn success"
            onClick={fecthApi}
            style={{ marginBottom: "30px" }}
          >
            Actualizar información
          </button>
        </div>
        <div className="col-sm-12">
          <div className="header__left">
            <h3>Cambio de contraseña</h3>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="form-group">
            <label>Contraseña antigua</label>
            <input
              className="form-control"
              type="password"
              placeholder=""
              name="antigua"
              value={state.antigua}
              onChange={handleState}
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label>Cambiar Contraseña</label>
            <input
              className="form-control"
              type="password"
              id="pass1"
              placeholder=""
              name="contraseña"
              value={state.contraseña}
              onChange={handleState}
            />
            <span
              className="material-icons icon"
              style={{
                float: "right",
                cursor: "pointer",
                position: "relative",
                margin: "-35px 10px 0 0",
              }}
              onClick={showPass1}
            >
              {ojo1}
            </span>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label>Confirmar Contraseña</label>
            <input
              className="form-control"
              type="password"
              placeholder=""
              id="pass2"
              name="confirmar_contraseña"
              value={state.confirmar_contraseña}
              onChange={handleState}
            />
            <span
              className="material-icons icon"
              style={{
                float: "right",
                cursor: "pointer",
                position: "relative",
                margin: "-35px 10px 0 0",
              }}
              onClick={showPass2}
            >
              {ojo2}
            </span>
          </div>
        </div>
        <div className="col-sm-12">
          {/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,16}$/.test(
            state.contraseña
          ) ? (
            <>
              {state.contraseña === state.confirmar_contraseña && (
                <div className="ps-form text-center">
                  <button
                    className="ps-btn success"
                    onClick={changePass}
                    style={{ marginBottom: "30px" }}
                  >
                    Actualizar contraseña
                  </button>
                </div>
              )}
              {state.contraseña !== state.confirmar_contraseña && (
                <div className="ps-form text-center">
                  <h5 style={{ marginBottom: "25px" }}>
                    Por favor verifique que este bien escrita la contraseña
                  </h5>
                </div>
              )}
            </>
          ) : (
            <div className="ps-form">
              <h5 style={{ marginBottom: "25px" }}>La contraseña debe tener</h5>
              <ul>
                <li>Al menos una letra en minúscula</li>
                <li>Al menos una letra en Mayúscula</li>
                <li>Al menos un número</li>
                <li>Al menos 8 carácteres</li>
              </ul>
            </div>
          )}
        </div>
        <div className="col-sm-12">
          <div className="header__left">
            <h3>Agregar o actualizar foto</h3>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="form-group">
            <label className="form-label">
              Por favor verifique que la foto o imagen tenga los siguientes
              formatos: 'png', 'jpg', 'JPG', 'jpeg', 'gif'
            </label>
            <input
              style={{ paddingTop: "10px" }}
              className="form-control"
              type="file"
              placeholder=""
              accept=".png,.jpg,.JPG,.jpeg,.gif"
              id="docs"
              name="imagen"
              onChange={(e) => handleImg(e.target.files)}
            />
          </div>
        </div>
        <div className="col-sm-12 text-center">
          <button
            className="ps-btn success"
            onClick={UpdateImagen}
            style={{ marginBottom: "30px" }}
          >
            Actualizar foto
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default FormAccountSettings;
