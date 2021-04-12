import axios from "axios";
import { types } from "./../types";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";


export const getLocatario = () => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(process.env.REACT_APP_URL_API + "locatarios/getAll", config)
      .then((response) => {
        let data = response.data.locatarios;
        let locatarios = data.map((item) => ({
          id: item.id,
          usuario: item.admin_id,
          plaza: item.plaza_id,
          nombre: item.nombre,
          apellido: item.apellido,
          categorias: item.categorias,
          horarios: item.horarios,
          img: item.img,
          logo: item.logo,
          local: item.nombre_local,
          cedula: item.cedula,
          fecha: item.updated_at === null ? item.created_at : item.updated_at,
          email: item.email,
          telefonos: item.telefonos,
          activo: item.activo ? 'Activo' : 'Inactivo',
          acciones: [
            {
              name: "Editar",
              icon: <EditIcon />,
              id: item.id
            },
            {
              name: "Eliminar",
              icon: <DeleteIcon />,
              id: item.id
            },
          ],
        }));
        dispatch(LocatariosDatos(locatarios));
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

const LocatariosDatos = (locatarios) => ({
  type: types.locatariosDatos,
  locatario: locatarios,
});