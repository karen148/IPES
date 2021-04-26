import { types } from "./../types";

const initialState = {
  productos: [],
  // uid: null,
  // name: null
};

export const productoReducer = (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};
