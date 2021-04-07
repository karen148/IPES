import React, { useEffect } from 'react';
import {
    BrowserRouter ,
    Switch,
    Redirect
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { starChecking } from './../actions/auth'
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import Login from './../pages/Login'
import Tablero from './../pages/Tablero'
import Perfil from './../pages/Perfil'
import Plazas from './../pages/Plazas'


export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, id } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch( starChecking())
    }, [dispatch])

    if (checking) {
        return(<h5>Por favor espere...</h5>)
    }

    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <PublicRoute 
                        exact 
                        path="/login" 
                        component={Login} 
                        isAuthenticated= {!!id}
                    />
                    <PrivateRoute 
                        exact 
                        path="/" 
                        component={Tablero} 
                        isAuthenticated= {!!id}
                    />
                    <PrivateRoute 
                        exact 
                        path="/perfil" 
                        component={Perfil} 
                        isAuthenticated= {!!id}
                    />
                    <PrivateRoute 
                        exact 
                        path="/plaza" 
                        component={Plazas} 
                        isAuthenticated= {!!id}
                    />
                    <Redirect to ="/"/>
                </Switch>
            </div>
        </BrowserRouter>
    )
}