import React from 'react';
import Modal from './';
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';

const Eliminar = ({open, handleClose, eliminar, titulo, titulo2, titulo3}) =>{
    return (
        <Modal
            open={open}
            handleClose={handleClose}
            title={titulo3}
            tamaño="xs"
        >   
            <Grid 
            container 
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}>
                <Grid item xs={12}>
                    <b>Desea eliminar {titulo2} {titulo}?</b>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={eliminar} style={{color: 'white'}}>SI</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="secondary" onClick={handleClose}>NO</Button>
                </Grid>
            </Grid>
        </Modal>
    )
}

export default Eliminar;