import React, { useState, Fragment, useEffect} from "react";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import TooltipE from "./../../tooltip";
import Modal from "./../../modal";
import _Eliminar from './../../modal/Eliminar.jsx'
import _Actualizar from './../../modal/Actualizar.jsx'
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { getCantidades} from "../../../../actions/plaza";
// import Tooltip from '@material-ui/core/Tooltip';

const TablaPlazas = () => {

  const dispatch = useDispatch();
  const { funcionarios, cantidades } = useSelector(state => state.plaza)
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [idp, setIdp] = useState(0);
  const [idp1, setIdp1] = useState(0);
  const [idp2, setIdp2] = useState(0);

  useEffect(() => {
    dispatch( getCantidades());
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
    // getPlaza()
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
    // getPlaza()
  };

  const Eliminar = () => {
    
    let config1 = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      axios.put(process.env.REACT_APP_URL_API+'plazas/delete/'+idp2,
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

  console.log(idp);
  // const tableItems = datos.map((item, index) => {
  //   console.log(item.locatarios);
  //   if(item !== undefined){
  //     if (item.activo === true) {
  //       let data = [];
  //       if (item.categorias !== null && item.categorias.length > 0) {
  //         for (let i = 0; i <= item.categorias.length; i++) {
  //           const element = item.categorias[i];
  //           data.push({ categoria: element });
  //         }
  //       }
  //       return (
  //         <tr key={item.id}>
  //           <td>{index + 1}</td>
  //           <td>
  //             <Button
  //               color="secondary"
  //               onClick={() => {
  //                 handleClickOpen();
  //                 setIdp(item.id);
  //               }}
  //             >
  //               <b>{item.nombre}</b>
  //             </Button>
  //           </td>
  //           <td>{item.localidad}</td>
  //           <td>{cantidades.map(can => { return ( item.id === can.id && can.total)})}</td>
  //           <td style={{ width: "180px" }}>
  //             {data.map((item) => {
  //               return (
  //                 <Button size="small" color="primary">
  //                   <b>{item.categoria}</b>
  //                 </Button>
  //               );
  //             })}
  //           </td>
  //           <td>
  //             {item.fecha === null ? (
  //               <p>No hay fecha</p>
  //             ) : (
  //               item.fecha.slice(0, 10)
  //             )}
  //           </td>
  //           <td>
  //             {item.acciones.map((cat) => {
  //               return (
  //                 <TooltipE title={cat.name} key={cat.name}>
  //                   <IconButton 
  //                     color="default" 
  //                     component="span" 
  //                     key={cat.name} 
  //                     onClick={cat.name === 'Editar' 
  //                       ? ()=>{handleClickOpen2(); setIdp1(cat.id);} 
  //                       : ()=>{handleClickOpen1(); setIdp2(cat.id);}}
  //                     >
  //                     {cat.icon}
  //                   </IconButton>
  //                 </TooltipE>
  //               );
  //             })}
  //           </td>
  //         </tr>
  //       );
  //     }
  //   }
  // });

  return (
    <div className="table-responsive">
      <table
        className="table ps-table"
        style={{ textAlign: "center" }}
        height="500px"
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
          {/* {tableItems} */}
        </tbody>
      </table>
      {/* <Modal
        open={open}
        handleClose={handleClose}
        title={datos.map((item) => {
          return item !== undefined && item.id === idp && item.nombre;
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
                      src={process.env.REACT_APP_URL_API+`uploads/retorna/PLAZA/${item.img}`}
                      alt=""
                      width="200px"
                      height="200px"
                    />
                  </div>
                  <br></br>
                </div>
                <b>Funcionario: </b>
                {funcionarios.map(fun => {return ( item.usuario === fun.id ? fun.label :'')})}
                <br></br>
                <b>Dirección: </b>
                {item.direccion}
                <br></br>
                <b>Telefonos: </b>
                {item.telefonos + "."}
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
        titulo={datos.map(item => {return (item !== undefined && item.id === idp2 && item.nombre)})}
      />
      <_Actualizar
        open={open2}
        handleClose={handleClose2}
        idPlaza={idp1}
      /> */}
      
    </div>
  );
};

export default TablaPlazas;