import { types } from "./../types";

const initialState = {
  locatarios: [],
  ok: false,
};

export const locatariosReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.locatariosDatos:
      return {
        ...state,
        locatarios: [...action.locatario],
      };
    case types.locatariosMensaje:
      return {
        ...state,
        ...action.payload,
      };
    case types.locatariosDato:
      return {
        ...state,
        ok: action.payload,
      };
    default:
      return state;
  }
};
