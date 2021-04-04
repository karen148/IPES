import axios from 'axios';
import {types} from './../types';
import Swal from 'sweetalert2';

export const startLogin = (email, password) =>{
    return async(dispatch) =>{
        axios.post(process.env.REACT_APP_URL_AUTH+"admin-auth/login", {
            'email': email,
            'password': password
        })
        .then((response) =>{
            console.log(response.data);
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('token-date', new Date().getTime() );
                localStorage.setItem("id", response.data.id)
                localStorage.setItem("rol", response.data.rol)
                dispatch( login ({
                    rol: response.data.rol,
                    id: response.data.id
                }))
            }
        })
        .catch((e) => {
            console.log("ERROR!!!!!", e);
            Swal.fire('Error', 'Datos incorrectos', 'error')
          });
    }
}

export const starChecking = () =>{
    return async (dispatch) =>{
        let config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`,
                       token: localStorage.getItem("token") 
            },
        };
        axios.get(process.env.REACT_APP_URL_API+"admins/renewToken", config)
        .then((response) => {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('token-date', new Date().getTime() );
            dispatch( login ({
                rol: localStorage.getItem("rol"),
                id: localStorage.getItem("id"),
            }))
        })
        .catch((e) => {
            dispatch(checkingFinish ())
            console.log('ERRORR'+e);
        })
    }
}

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch( logout )
    }
}

const logout = () => ({ type: types.authLogout })

const login = (user) => ({
    type: types.authLogin,
    payload: user
})

const checkingFinish = () => ({ type: types.authCheckingFinish})