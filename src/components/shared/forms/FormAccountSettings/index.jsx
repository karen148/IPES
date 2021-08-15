import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDatos, updateAdmin, updateImagen, changePass } from "actions/admin";

/**
 * @function FormAccountSettings
 * @description La vista perfile es donde se puede actualizar la información del admin,
 * cambio de contraseñas y actualización de imagen de perfil.
 * @returns
 */
const FormAccountSettings = () => {
  const dispatch = useDispatch();
  const { id, rol, img } = useSelector((stat) => stat.auth);

  const [ojo1, setOjo1] = useState("visibility_off");
  const [ojo2, setOjo2] = useState("visibility_off");
  const [img1, setImg] = useState(null);
  const [email1, setEmail] = useState("");
  const [state, setState] = useState({
    nombre: "",
    telefono: 0,
    email: "",
    cedula: 0,
    contraseña: "",
    confirmar_contraseña: "",
    antigua: "",
  });

  useEffect(() => {
    dispatch(getDatos(setState, state, setEmail, id));
  }, [dispatch]);

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

  /**
   * @function fecthApi
   * @description Por medio de esta función podemos enviar la información
   * para actualizar los datos del admin, en esta función solo se actualiza
   * nombre, telefono, cedula y email
   */
  const fecthApi = () => {
    dispatch(
      updateAdmin(state.nombre, state.telefono, state.cedula, email1, id)
    );
    dispatch(getDatos(setState, state, setEmail, id));
  };

  /**
   * @function UpdateImagen
   * @description Por medio de esta función se actualiza la imagen de perfil del dashboard
   * y la imagen se visualiza en src\components\shared\widgets\WidgetUserWelcome
   */
  const UpdateImagen = () => {
    dispatch(updateImagen(img1, rol, id, img));
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

  /**
   * @function showPass1
   * @description Por medio de esta función y la función showPass2 se podra visualizar
   * la contraseña digitada en los input Cambiar Contraseña y Confirma contraseña
   */
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

  /**
   * @function changePassword
   * @description changePassword permita cambiar la contraseña del admmin.
   */
  const changePassword = () => {
    dispatch(
      changePass(
        email1,
        state.antigua,
        state.contraseña,
        ValiContraseña,
        state.confirmar_contraseña
      )
    );
  };
  return (
    <Fragment>
      <div className="row" key={localStorage.getItem("id")}>
        <div className="col-sm-12">
          <div className="form-group">
            <label>Nombre completo</label>
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
            <label>Cedula</label>
            <input
              className="form-control"
              type="number"
              name="cedula"
              value={state.cedula}
              onChange={handleState}
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
                    onClick={changePassword}
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
