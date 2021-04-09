import axios from "axios";
import { types } from "./../types";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

export const getTrue = () => {
  return async (dispatch) => {
  let config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  axios
    .get(process.env.REACT_APP_URL_API + "plazas/getAll", config)
    .then((response) => {
      console.log(response.data.plazas);
      let data = response.data.plazas;
      let plazatrues = [] 
      data.map((item) => {
        if (item.activo === true) {
          plazatrues.push ({ item })
        }
      });
      console.log(plazatrues);
      dispatch(PlazaTrue(plazatrues));
    })
    .catch((e) => {
      console.log("ERROR!!!!!", e);
    });
  }
};

const PlazaTrue = (plazatrues) => ({
  type: types.plazaDatosTrue,
  plazatrue: plazatrues,
});


export const getPlaz = () => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(process.env.REACT_APP_URL_API + "plazas/getAll", config)
      .then((response) => {
        console.log(response.data.plazas);
        let data = response.data.plazas;
        let plazas = data.map((item) => ({
          id: item.id,
          usuario: item.admin_id,
          localidad: item.localidad_nombre,
          nombre: item.nombre,
          direccion: item.direccion,
          telefonos: item.telefonos,
          email: item.email,
          locatarios: 0,
          categorias: item.categorias_nombres,
          horarios: item.horarios,
          activo: item.activo,
          img: item.img,
          fecha: item.updated_at === null ? item.created_at : item.updated_at,
          acciones: [
            {
              name: "Agregar lista de plazas",
              icon: <PlaylistAddIcon />,
              id: item.id
            },
          ],
        }));
        dispatch(PlazaDatos(plazas));
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

const PlazaDatos = (plazas) => ({
  type: types.plazaDatos,
  plaza: plazas,
});

export const getFuncionarios = () => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(process.env.REACT_APP_URL_API + "admins/getAll", config)
      .then((response) => {
        let data = response.data.admins;
        const funcionarios = data.map((item) => ({
            label: item.nombre+' '+item.apellido,
            id: item.id
        }))
        dispatch( PlazaFuncionarios(funcionarios))
        
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

const PlazaFuncionarios = (funcionarios) => ({
  type: types.plazaFuncionario,
  funcionario: funcionarios,
})

export const getCategorias = () => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(process.env.REACT_APP_URL_API + "categorias/getAll", config)
      .then((response) => {
        let data = response.data.categorias;
        const categorias = data.map((item) => ({
            label: item.nombre,
            id: item.id
        }))
        dispatch( PlazaCategorias(categorias))
        
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

const PlazaCategorias = (categorias) => ({
  type: types.plazaCategorias,
  categoria: categorias,
})


export const getLocalidades = () => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(process.env.REACT_APP_URL_API + "localidades/getAll", config)
      .then((response) => {
        console.log(response.data);
        let data = response.data.localidades;
        const localidades = data.map((item) => ({
            label: item.nombre,
            id: item.id
        }))
        dispatch( PlazaLocalidades(localidades))
        
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

const PlazaLocalidades = (localidades) => ({
  type: types.plazaLocalidades,
  localidad: localidades,
})

export const getCantidades = () => {
  return async (dispatch) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(process.env.REACT_APP_URL_API + "locatarios/locatarioPorPlaza", config)
      .then((response) => {
        console.log(response.data);
        let data = response.data.cantidadLocales;
        const cantidades = data.map((item) => ({
            total: item.total,
            id: item.plaza_id
        }))
        dispatch( PlazaCantidades(cantidades))
        
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
};

const PlazaCantidades = (cantidades) => ({
  type: types.plazaCantidad,
  cantidad: cantidades,
})