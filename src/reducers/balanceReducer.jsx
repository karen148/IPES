import { types } from "./../types";

const initialState = {
  CantidadProductos: [],
  TopProductos: [],
};

export const balanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.balanceCantidadProductosVendidos:
      return {
        ...state,
        CantidadProductos: [...action.cantidadproducto],
      };
    case types.balanceTopProductos:
      return {
        ...state,
        TopProductos: [...action.topproducto],
      };
    default:
      return state;
  }
};
