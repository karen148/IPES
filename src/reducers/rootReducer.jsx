import { combineReducers } from 'redux';

import { authReducer } from './authReducer'
import { plazaReducer } from './plazaReducer'

export const rootReducer = combineReducers({
    auth:authReducer,
    plaza:plazaReducer,
}) 
