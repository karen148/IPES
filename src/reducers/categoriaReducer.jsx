import { types } from "./../types";

const initialState = {
  categorias: [],
  // uid: null,
  // name: null
};

export const categoriaReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.categoriaCrear:
      return {
        ...state,
        ...action.payload,
      };

    case types.categoriaDatos:
      return {
        ...state,
        categorias: [...action.categoria],
      };

    case types.categoriaMensaje:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
