import { types } from "./../types";

const initialState = {
  Noimg: "",
};

export const imgReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.imagen:
      return {
        ...state,
        Noimg: action.imagen,
      };
    default:
      return state;
  }
};
