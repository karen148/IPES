import React from "react";
// import axios from "axios";
// import IconButton from "@material-ui/core/IconButton";
// import TooltipE from "./../../tooltip";
// import Modal from "./../../modal";
// import _Eliminar from "./../../modal/Eliminar.jsx";
// // import _Actualizar from "./../../modal/Actualizar.jsx";
// import Button from "@material-ui/core/Button";
// import PropTypes from "prop-types";

const TablaProducto = () => {
  //   const { funcionarios } = useSelector((state) => state.plaza);
  // const [open, setOpen] = useState(false);
  // const [idp, setIdp] = useState(0);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleClickOpen1 = () => {
  //   setOpen1(true);
  // };

  // const handleClose1 = () => {
  //   setOpen1(false);
  //   getPlaza();
  // };

  // const handleClickOpen2 = () => {
  //   setOpen2(true);
  // };

  // const handleClose2 = () => {
  //   setOpen2(false);
  //   getPlaza();
  // };

  //   const Eliminar = () => {
  //     let config1 = {
  //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //     };
  //     axios
  //       .put(
  //         process.env.REACT_APP_URL_API + "plazas/delete/" + idp2,
  //         {
  //           activo: false,
  //         },
  //         config1
  //       )
  //       .then((response) => {
  //         if (response.status) {
  //           handleClose1();
  //         }
  //       })
  //       .catch((e) => {
  //         console.log("ERROR", e);
  //       });
  //   };

  // const tableItems = datos.map((item, index) => {
  //   return (
  //     <tr key={item.id}>
  //       <td>{index + 1}</td>
  //       <td>
  //         <Button
  //           color="secondary"
  //           onClick={() => {
  //             handleClickOpen();
  //             setIdp(item.id);
  //           }}
  //         >
  //           <b>{item.nombre}</b>
  //         </Button>
  //       </td>
  //       <td>
  //         {item.fecha === null ? <p>No hay fecha</p> : item.fecha.slice(0, 10)}
  //       </td>
  //       <td>
  //         {item.acciones.map((cat) => {
  //           return (
  //             <TooltipE title={cat.name} key={cat.name}>
  //               <IconButton
  //                 color="default"
  //                 component="span"
  //                 key={cat.name}
  //                 onClick={
  //                   cat.name === "Editar"
  //                     ? () => {
  //                         // handleClickOpen2();
  //                         // setIdp1(cat.id);
  //                         // getPla(cat.id);
  //                       }
  //                     : () => {
  //                         // handleClickOpen1();
  //                         // setIdp2(cat.id);
  //                       }
  //                 }
  //               >
  //                 {cat.icon}
  //               </IconButton>
  //             </TooltipE>
  //           );
  //         })}
  //       </td>
  //     </tr>
  //   );
  // });
  return (
    <div className="table-responsive">
      <table className="table ps-table" style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del producto</th>
            <th>SKU</th>
            <th>Estado</th>
            <th>Plaza</th>
            <th>Locatario</th>
            <th>Categorías</th>
            <th>Fechas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody></tbody>
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
                <p>{item.nombre}</p>
              </Fragment>
            );
          }
        })}
      </Modal> */}
      {/* <_Eliminar
        open={open1}
        handleClose={handleClose1}
        eliminar={Eliminar}
        titulo3="Eliminar plaza"
        titulo2="la plaza"
        titulo={datos.map((item) => {
          return item !== undefined && item.id === idp2 && item.nombre;
        })}
      />
      <_Actualizar
        open={open2}
        handleClose={handleClose2}
        idPlaza={idp1}
        nombre1={plaza.nombre}
        direccion1={plaza.direccion}
        email1={plaza.email}
        imagen={plaza.img}
        logo1={plaza.logo}
        locali={plaza.localidad_nombre}
        funcio2={plaza.admin_id}
        cat1={plaza.categorias_nombres}
        horarios1={plaza.horarios}
        telefonos1={plaza.telefonos}
      /> */}
    </div>
  );
};

// TablaProducto.propTypes = {
//   datos: PropTypes.array,
//   // getPlaza: PropTypes.func,
// };

export default TablaProducto;