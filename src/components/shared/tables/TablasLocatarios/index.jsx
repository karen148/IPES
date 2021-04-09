import React, { useState, Fragment, useEffect} from "react";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import TooltipE from "./../../tooltip";
import Modal from "./../../modal";
import _Eliminar from './../../modal/Eliminar.jsx'
import _Actualizar from './../../modal/Locatarios/Actualizar'
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { getCantidades, getTrue} from "../../../../actions/plaza";
import { getLocatario } from "../../../../actions/locatarios";
// import Tooltip from '@material-ui/core/Tooltip';

const TablaLocatarios = ({ datos, getLocali}) => {

  const dispatch = useDispatch();
  const { plazastrues} = useSelector(state => state.plaza)
  const [local3, setLocal3] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [idp, setIdp] = useState(0);
  const [idp1, setIdp1] = useState(0);
  const [idp2, setIdp2] = useState(0);

  useEffect(() => {
    dispatch( getCantidades());
  }, [dispatch])

  useEffect(() => {
    dispatch( getTrue());
  }, [dispatch])


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
    
  };

  const handleClose1 = () => {
    setOpen1(false);
    getLocali();
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
    getLocali();
  };

  const datoActualizar = (idL) => {
    setLocal3(datos.filter(item => item.id === idL))
  }

  const Eliminar = () => {
    
    let config1 = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      axios.put(process.env.REACT_APP_URL_API+'locatarios/delete/'+idp2,
        {
            activo:false
        }
        ,config1)
      .then(response => {
        if (response.status) {
          handleClose1()
        }
      })
      .catch((e) => {
        console.log('ERROR',e);
      })
  }

  
  const tableItems = datos.map((item, index) => {

    console.log(plazastrues.length && plazastrues.filter(pla => pla.id === item.plaza)[0]);

    // console.log(plazastrues.length ? plazastrues.filter(pla => pla.id === item.plaza)[0].localidad_nombre : '-' );
    if(datos.length){
      let data = [];
      if (item?.categorias !== null && item.categorias?.length > 0) {
        for (let i = 0; i <= item.categorias.length; i++) {
          const element = item.categorias[i];
          data.push({ categoria: element });
        }
      }
      return (
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>
            <Button
              color="secondary"
              onClick={() => {
                handleClickOpen();
                setIdp(item.id);
              }}
            >
              <b>{item.local}</b>
            </Button>
          </td>
          <td>{plazastrues.length ? plazastrues.filter(pla => pla.id === item.plaza)[0]?.localidad_nombre : '-'}</td>
          <td>{plazastrues.length ? plazastrues.filter(pla => pla.id === item.plaza)[0]?.nombre : '-'}</td>
          <td>{item.activo}</td>
          <td style={{ width: "180px" }}>
            {data.map((item) => {
              return (
                <Button size="small" color="primary">
                  <b>{item.categoria}</b>
                </Button>
              );
            })}
          </td>
          <td>
            {item?.acciones.map((cat) => {
              return (
                <TooltipE title={cat.name} key={cat.name}>
                  <IconButton 
                    color="default" 
                    component="span" 
                    key={cat.name} 
                    onClick={cat.name === 'Editar' 
                      ? ()=>{handleClickOpen2(); setIdp1(cat.id); datoActualizar(cat.id)} 
                      : ()=>{handleClickOpen1(); setIdp2(cat.id);}}
                    >
                    {cat.icon}
                  </IconButton>
                </TooltipE>
              );
            })}
          </td>
        </tr>
      ); 
    }
  });
console.log(local3);
  return (
    <div className="table-responsive">
      <table
        className="table ps-table"
        style={{ textAlign: "center" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del local</th>
            <th>Localidad</th>
            <th>Plaza de mercado</th>
            <th>Estado</th>
            <th>Categorías</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tableItems}
        </tbody>
      </table>
      <Modal
        open={open}
        handleClose={handleClose}
        title={datos.map((item) => {
          return item !== undefined && item.id === idp && item.local;
        })}
        tamaño="xs"
      >
        {datos.map((item) => {
          if (item !== undefined && item.id === idp) {
            return (
              <Fragment>
                <div className="col-sm-12 text-center">
                  <div className="ps-block__left">
                    <img
                      src={process.env.REACT_APP_URL_API+`uploads/retorna/LOCATARIO/${item.img ? item.img : item.logo}`}
                      alt=""
                      width="200px"
                      height="200px"
                    />
                    <p>{item.img ? 'Imagen' : 'Logo'}</p>
                  </div>
                </div>
                {/* <b>Funcionario: </b>
                {funcionarios.map(fun => {return ( item.usuario === fun.id ? fun.label :'')})} */}
                <br></br>
                <b>Locatario: </b>
                {item.nombre} {item.apellido}
                <br></br>
                <b>Cédula: </b>
                {item.cedula}
                <br></br>
                <b>Telefonos: </b>
                {item.telefonos === null ? '' : item.telefonos+"."}
                <br></br>
                <b>Horario de atención: </b>
                {item.horarios + "."}
                <br></br>
                <b>Correo oficial: </b>
                {item.email}
                <br></br>
              </Fragment>
            );
          }
        })}
      </Modal>
      <_Eliminar 
        open={open1}
        handleClose={handleClose1}
        eliminar={Eliminar}
        titulo3='Cambiar de estado'
        titulo2='el locatario'
        titulo={datos.map(item => {return (item !== undefined && item.id === idp2 && item.nombre)})}
      />
      <_Actualizar
        open={open2}
        handleClose={handleClose2}
        idPlaza={idp1}
        loc1={local3.length !== 0 ? local3[0].local : ''}
        ced1={local3.length !== 0 ? local3[0].cedula : '*'}
        nom1={local3.length !== 0 ? local3[0].nombre : ''}
        ape1={local3.length !== 0 ? local3[0].apellido : ''}
        email1={local3.length !== 0 ? local3[0].email : ''}
        telefonos1={local3.length !== 0 ? local3[0].telefonos : ''}
        plaza1={local3.length !== 0 ? local3[0].plaza : ''}
        categorias1={local3.length !== 0 ? local3[0].categorias : ''}
        horarios2={local3.length !== 0 ? local3[0].horarios : ''}
        imagen2={local3.length !== 0 ? local3[0].img : ''}
        logo2={local3.length !== 0 ? local3[0].logo : ''}
      />
      
    </div>
  );
};

export default TablaLocatarios;
