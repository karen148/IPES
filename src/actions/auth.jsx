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
                localStorage.setItem('id', response.data.id)
                let config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}`},
                };
                axios.get(process.env.REACT_APP_URL_API +'admins/getAdmin/'+response.data.id, config)
                .then((response) => {
                    console.log(response);
                    let datos = response.data.admin;
                    dispatch( login ({
                        rol: datos.rol,
                        id: datos.id,
                        name: datos.nombre,
                        img: datos.img
                    }))
                })
                .catch ((e) => {
                    console.log("ERROR!!!!!", e);
                })
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
            let config1 = {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}`},
            };
            axios.get(process.env.REACT_APP_URL_API +'admins/getAdmin/'+localStorage.getItem('id'), config1)
            .then((response) => {
                console.log(response);
                let datos = response.data.admin;
                dispatch( login ({
                    rol: datos.rol,
                    id: datos.id,
                    name: datos.nombre,
                    img: datos.img
                }))
            })
            .catch ((e) => {
                console.log("ERROR!!!!!", e);
            })
        })
        .catch((e) => {
            dispatch(checkingFinish ())
            console.log('ERRORR',e);
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