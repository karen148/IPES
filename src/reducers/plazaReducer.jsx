import { types } from "./../types";

const initialState = {
  funcionarios: [],
  plazas: [],
  plazastrues: [],
  localidades: [],
  categorias: [],
  cantidades: [],
};

export const plazaReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.plazaLocalidades:
      return {
        ...state,
        localidades: [...action.localidad],
      };

    case types.plazaFuncionario:
      return {
        ...state,
        funcionarios: [...action.funcionario],
      };

    case types.plazaCategorias:
      return {
        ...state,
        categorias: [...action.categoria],
      };

    case types.plazaCantidad:
      return {
        ...state,
        cantidades: [...action.cantidad],
      };

    case types.plazaDatos:
      return {
        ...state,
        plazas: [...action.plaza],
      };

    case types.plazaDatosTrue:
      return {
        ...state,
        plazastrues: [...action.plazatrue],
      };

    default:
      return state;
  }
};
