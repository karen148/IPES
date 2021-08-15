import { types } from "./../types";

const initialState = {
  promociones: [],
  // uid: null,
  // name: null
};

export const promoReducer = (action, state = initialState) => {
  switch (action?.type) {
    case types.promocionesDatos:
      return {
        ...state,
        promociones: [...action.promocion],
      };
    default:
      return state;
  }
};
