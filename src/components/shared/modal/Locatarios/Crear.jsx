import React, { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import axios from "axios"

import Modal from './../index';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import { useForm } from "antd/lib/form/Form";
import FormLabel from "@material-ui/core/FormLabel";
import { getTrue } from "../../../../actions/plaza";


const Crear = ({open, handleClose, idPlaza}) => {

    const {funcionarios, categorias, localidades, plazastrues } = useSelector(state => state.plaza)
  
    const [ infoLocatario, handleLocatario] = useForm({
      local:'',
      nombre:'',
      apellido:'',
      cedula:'',
      actividad:'',
      email:'',
    })

    const { 
      local,
      nombre,
      apellido,
      cedula,
      actividad,
      email
    } = infoLocatario;
   
  useEffect(() => {
    getTrue()
  }, [])

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="Actualizar plaza"
      tamaño="xl"
    >
      <Grid 
        container
        spacing={3}
        direction="column"
        justify="center"
        alignItems="center"
      >
          <Grid item xl={6} style={{ textAling: 'center'}} square>
            <Typography component="h1" variant="h5" style={{fontSize: '20px'}}>
              Datos del locatario
            </Typography>
              <br></br>
              <FormLabel>Plaza de mercado<b>*</b></FormLabel>
              <TextField
                margin="normal" 
                variant="outlined"
                type= 'text'
                fullWidth
                value={local}
                name="local"
                onChange={handleLocatario}
              />
              <FormLabel>Nombre<b>*</b></FormLabel>
              <TextField
                margin="normal" 
                variant="outlined"
                type= 'text'
                fullWidth
                value={nombre}
                name="nombre"
                onChange={handleLocatario}
              />
            <FormLabel>Apellido<b>*</b></FormLabel>
              <TextField
                margin="normal" 
                variant="outlined"
                type= 'text'
                fullWidth
                value={apellido}
                name="apellido"
                onChange={handleLocatario}
              />
              <FormLabel>Cédula<b>*</b></FormLabel>
              <TextField
                margin="normal" 
                variant="outlined"
                type= 'text'
                fullWidth
                value={cedula}
                name="cedula"
                onChange={handleLocatario}
              />
              <FormLabel>Actividad Económica<b>*</b></FormLabel>
              <TextField
                margin="normal" 
                variant="outlined"
                type= 'text'
                fullWidth
                value={actividad}
                name="actividad"
                onChange={handleLocatario}
              />
              <FormLabel>Email<b>*</b></FormLabel>
              <TextField
                margin="normal" 
                variant="outlined"
                type= 'text'
                fullWidth
                value={email}
                name="email"
                onChange={handleLocatario}
              />
          </Grid>
          <Grid item xl={6} style={{ textAling: 'center'}} square>
            <Typography component="h1" variant="h5" style={{fontSize: '20px'}}>
              Datos de la plaza
            </Typography>
              <br></br>
              <FormLabel>Nombre del sitio <b>*</b></FormLabel>
              <TextField
                margin="normal" 
                variant="outlined"
                type= 'text'
                fullWidth
                value={local}
                name="local"
                onChange={handleLocatario}
              />
              <FormLabel>Nombre<b>*</b></FormLabel>
              <TextField
                margin="normal" 
                variant="outlined"
                type= 'text'
                fullWidth
                value={nombre}
                name="nombre"
                onChange={handleLocatario}
              />
            <FormLabel>Apellido<b>*</b></FormLabel>
              <TextField
                margin="normal" 
                variant="outlined"
                type= 'text'
                fullWidth
                value={apellido}
                name="apellido"
                onChange={handleLocatario}
              />
              <FormLabel>Cédula<b>*</b></FormLabel>
              <TextField
                margin="normal" 
                variant="outlined"
                type= 'text'
                fullWidth
                value={cedula}
                name="cedula"
                onChange={handleLocatario}
              />
              <FormLabel>Actividad Económica<b>*</b></FormLabel>
              <TextField
                margin="normal" 
                variant="outlined"
                type= 'text'
                fullWidth
                value={actividad}
                name="actividad"
                onChange={handleLocatario}
              />
              <FormLabel>Email<b>*</b></FormLabel>
              <TextField
                margin="normal" 
                variant="outlined"
                type= 'text'
                fullWidth
                value={email}
                name="email"
                onChange={handleLocatario}
              />
          </Grid>
          <Grid item>
              <Button variant="contained" color="secondary" onClick={handleClose}>NO</Button>
          </Grid>
      </Grid>
    </Modal>
  );
};

export default Crear;
