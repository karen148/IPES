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


export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, id } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch( starChecking())
    }, [dispatch])

    if (checking) {
        return(<h5>Espere...</h5>)
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
                    <Redirect to ="/"/>
                </Switch>
            </div>
        </BrowserRouter>
    )
}