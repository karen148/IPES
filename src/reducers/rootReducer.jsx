import { combineReducers } from "redux";

import { authReducer } from "./authReducer";
import { plazaReducer } from "./plazaReducer";
import { locatariosReducer } from "./locatariosReducer";
import { categoriaReducer } from "./categoriaReducer";
import menuReducer from "./menuReducer";
import { productoReducer } from "./productoReduces";

export const rootReducer = combineReducers({
  auth: authReducer,
  plaza: plazaReducer,
  locatario: locatariosReducer,
  categoria: categoriaReducer,
  menu: menuReducer,
  producto: productoReducer,
});
