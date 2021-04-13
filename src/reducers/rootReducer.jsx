import { combineReducers } from "redux";

import { authReducer } from "./authReducer";
import { plazaReducer } from "./plazaReducer";
import { locatariosReducer } from "./locatariosReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  plaza: plazaReducer,
  locatario: locatariosReducer,
});
