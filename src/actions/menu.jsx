import { types } from "./../types";

export function toggleDrawerMenu(payload) {
  return { type: types.TOGGLE_DRAWER_MENU, payload };
}

export function toggleDrawerMenuSuccess(payload) {
  return { type: types.TOGGLE_DRAWER_MENU_SUCCESS, payload };
}
