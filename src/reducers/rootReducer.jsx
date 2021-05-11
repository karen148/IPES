import { combineReducers } from "redux";

import { authReducer } from "./authReducer";
import { plazaReducer } from "./plazaReducer";
import { locatariosReducer } from "./locatariosReducer";
import { categoriaReducer } from "./categoriaReducer";
import { productoReducer } from "./productoReduces";
import { clienteReducer } from "./clienteReducer";
import menuReducer from "./menuReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  plaza: plazaReducer,
  locatario: locatariosReducer,
  categoria: categoriaReducer,
  menu: menuReducer,
  producto: productoReducer,
  cliente: clienteReducer,
});
