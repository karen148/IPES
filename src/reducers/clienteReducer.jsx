import { types } from "./../types";

const initialState = {};

export const clienteReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.clienteMensaje:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
