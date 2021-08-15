import { types } from "./../types";

const initialState = {};

export const pedidoReducer = (action, state = initialState) => {
  switch (action?.type) {
    case types.pedidoMensaje:
      return {
        ...state,
        ...action.payload,
      };
      case types.pedidoDatos:
        return {
          ...state,
          ...action.payload,
        };
    default:
      return state;
  }
};