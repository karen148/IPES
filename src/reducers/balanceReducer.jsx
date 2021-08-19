import { types } from "./../types";

const initialState = {
  CantidadProductos: [],
  TopProductos: [],
  TopLocatarios: [],
  TopLocatariosPlazas: [],
  TopProductosPlazas: [],
  Ganancias: [],
  Domicilios: [],
};

export const balanceReducer = (state = initialState, action) => {
  switch (action?.type) {
    case types.balanceTopProductos:
      return {
        ...state,
        TopProductos: [...action.topproducto],
      };
    case types.balanceLocatariosPlaza:
      return {
        ...state,
        TopLocatariosPlazas: [...action.toplocatarioplaza],
      };
    case types.balanceTopProductosPlaza:
      return {
        ...state,
        TopProductosPlazas: [...action.topproductoplaza],
      };
    case types.balanceLocatariosVendidos:
      return {
        ...state,
        TopLocatarios: [...action.toplocatario],
      };
    case types.gananciasPlaza:
      return {
        ...state,
        Ganancias: [...action.ganancia],
      };
    case types.domiciliosPlaza:
      return {
        ...state,
        Domicilios: [...action.domicilio],
      };
    default:
      return state;
  }
};
