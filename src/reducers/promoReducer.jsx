import { types } from "./../types";

const initialState = {
  promociones: [],
  // uid: null,
  // name: null
};

export const promoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.promocionesDatos:
      return {
        ...state,
        promociones: [...action.promocion],
      };
    default:
      return state;
  }
};
