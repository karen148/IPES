import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { setCategorias } from "actions/categoria";
import { useDispatch } from "react-redux";
import { useForm } from "hooks/useForm";
import Alert from "@material-ui/lab/Alert";
import { getCategorias } from "actions/categoria";
import PropTypes from "prop-types";

const FormCreateCategory = ({ get }) => {
  const dispatch = useDispatch();
  const [img, setImg] = useState(null);
  const [img1, setImg1] = useState(null);
  const [alerta, setAlerta] = useState(false);
  const [alerta1, setAlerta1] = useState(false);
  const [categoria, handleCategoria] = useForm({
    nombre: "",
    slug: "",
    descripcion: "",
  });

  const { nombre, slug, descripcion } = categoria;

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

  const crearCategoria = () => {
    if (nombre && slug && descripcion) {
      dispatch(setCategorias(nombre, slug, descripcion, img));
      setAlerta(true);
      setTimeout(() => {
        setAlerta(false);
      }, 3000);
    } else {
      setAlerta1(true);
      setTimeout(() => {
        setAlerta1(false);
      }, 3000);
    }
    dispatch(getCategorias());
    get();
  };

  return (
    <form className="ps-form ps-form--new" action="index.html" method="get">
      <div className="ps-form__content">
        <div className="form-group">
          <label>
            Nombre<sup>*</sup>
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="Ingrese el nombre de la categoría"
            required
            value={nombre}
            name="nombre"
            onChange={handleCategoria}
          />
        </div>
        <div className="form-group">
          <label>
            Slug - Url<sup>*</sup>
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="Ingrese la categoría slug"
            value={slug}
            name="slug"
            onChange={handleCategoria}
          />
        </div>
        <div className="form-group" style={{ textAlign: "center" }}>
          <label>Icono SVG</label>
          <input
            style={{ paddingTop: "10px" }}
            className="form-control"
            type="file"
            placeholder=""
            accept=".svg"
            id="docs"
            name="imagen"
            onChange={(e) => handleImg(e.target.files)}
          />
          {img1 ? (
            <img
              src={img1}
              alt=""
              width="100px"
              height="100px"
              style={{ marginTop: "10px" }}
            />
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea
            className="form-control"
            rows="6"
            placeholder="Ingrese la descripción de la categoría"
            value={descripcion}
            name="descripcion"
            onChange={handleCategoria}
          ></textarea>
        </div>
      </div>
      <div className="form-group" style={{ textAlign: "center" }}>
        {alerta && <Alert severity="success"> Se envió la información</Alert>}
        {alerta1 && (
          <Alert severity="error">
            Faltan datos (Nombre, slug o descripción)
          </Alert>
        )}
        <Button variant="contained" color="secondary" onClick={crearCategoria}>
          Crear
        </Button>
      </div>
    </form>
  );
};

FormCreateCategory.propTypes = {
  get: PropTypes.func,
};

export default FormCreateCategory;
