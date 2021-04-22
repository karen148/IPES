import { types } from "./../types";

export const initialState = {
  isDrawerMenu: false,
};

function menuReducer(state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_DRAWER_MENU:
      return {
        ...state,
        isDrawerMenu: action.payload,
      };
    default:
      return state;
  }
}

export default menuReducer;
