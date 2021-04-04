import React, {useEffect, useState, Fragment} from 'react';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from "@material-ui/core";
import TooltipE from './../../tooltip'
import Modal from './../../modal'
// import Tooltip from '@material-ui/core/Tooltip';
import { Table, Tag, Space } from 'antd';
import moment from 'moment';

const TablaPlazas = ({ datos }) => {

    const [open, setOpen] = React.useState(false);
    const [idp, setIdp] = useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const tableItems = datos.map((item, index) => {

        // let data = item.categorias.length
        // for (let index = 0; index <= index <= ( Object.keys(item.categorias).length); index++) {
        //     const element = item.categorias[index];
        //     console.log(element);
        // }
        // for (let index = 0; index < data.length; index++) {
        //     const element = data[index];
        //     console.log(element);
            
        // }
        console.log(item.categorias);

        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                    <a href="#" onClick={() => {handleClickOpen(), setIdp(item.id)}}>
                        <strong>{item.nombre}</strong>
                    </a>
                </td>
                <td>{item.localidad}</td>
                <td>{item.locatarios}</td>
                <td>{item.categorias}
                    {/* {item.categorias.forEach((cat) => (
                        <p className="ps-item-categories" style={{fontSize: '16px'}} key={index * 21}>
                            {cat}
                        </p>
                    ))} */}
                </td>
                <td>
                    {item.fecha === null ? <p>No hay fecha</p>: item.fecha.slice(0,10)}
                </td>
                <td>
                    {/* <p className="ps-item-categories"> */}
                        {item.acciones.map((cat) => (
                        <TooltipE title={cat.name} key={cat.name}>
                            <IconButton color="default" component="span" key={cat.name}>
                                {cat.icon}
                            </IconButton>
                        </TooltipE>
                        ))}
                    {/* </p> */}
                </td>
            </tr>
        );
    });
    console.log(idp);

    return (<div className="table-responsive">
            <table className="table ps-table" style={{textAlign: 'center',}} height= '500px'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre de la plaza</th>
                        <th>Localidad</th>
                        <th>Locatarios inscritos</th>
                        <th>Categorías</th>
                        <th>Fecha actualizada</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>{tableItems}</tbody>
            </table>
            <Modal 
                open={open} 
                handleClose={handleClose}
                title={datos.map(item => { return (item.id === idp && item.nombre)})}
                tamaño= 'xs'
            >
            {datos.map(item => {
                if(item.id === idp){
                    return (
                        <Fragment>
                            <p><strong>Dirección: </strong>{item.direccion}</p>
                            <p><strong>Telefonos: </strong>{item.telefono1} - {item.telefono2}</p>
                            <p><strong>Horario de atención: </strong>{item.horario_m} / {item.horario_t}</p>
                            <p><strong>Correo oficial: </strong>{item.email}</p>
                            <br></br>
                        </Fragment>
                    )
                }
            })}
            </Modal>
        </div>)
}

export default TablaPlazas