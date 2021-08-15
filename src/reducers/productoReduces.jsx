import { types } from "./../types";

const initialState = {
  productos: [],
  prolocatarios: [],
  // uid: null,
  // name: null
};

export const productoReducer = (action, state = initialState) => {
  switch (action?.type) {
    case types.productoDatos:
      return {
        ...state,
        productos: [...action.producto],
      };

    case types.productoMensaje:
      return {
        ...state,
        ...action.payload,
      };

    case types.productoLocatarios:
      return {
        ...state,
        prolocatarios: [...action.producto],
      };

    default:
      return state;
  }
};
