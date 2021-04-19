import { combineReducers } from "redux";

import { authReducer } from "./authReducer";
import { plazaReducer } from "./plazaReducer";
import { locatariosReducer } from "./locatariosReducer";
import { categoriaReducer } from "./categoriaReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  plaza: plazaReducer,
  locatario: locatariosReducer,
  categoria: categoriaReducer,
});
