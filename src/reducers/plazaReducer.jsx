import { types } from "./../types";

const initialState = {
  funcionarios: [],
  plazas: [],
  plazastrues: [],
  localidades: [],
  categorias: [],
  cantidades: [],
  plazaids: [],
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

    case types.plazaMensaje:
      return {
        ...state,
        ...action.payload,
      };

    case types.plazaID:
      return {
        ...state,
        plazaids: [...action.plazaid],
      };

    default:
      return state;
  }
};
