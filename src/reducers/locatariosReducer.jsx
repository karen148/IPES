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

    default:
      return state;
  }
};
