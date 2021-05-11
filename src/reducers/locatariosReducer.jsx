import { types } from "./../types";

const initialState = {
  locatarios: [],
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
    default:
      return state;
  }
};
