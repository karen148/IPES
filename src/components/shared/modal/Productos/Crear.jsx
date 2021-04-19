import React from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";

import Modal from "./../index";
// import TextField from "@material-ui/core/TextField";
// import Alert from "@material-ui/lab/Alert";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Formulario from "./../../forms/FormProducto/Formulario";
// import { useForm } from "./../../../../hooks/useForm";

const Crear = ({ open, handleClose }) => {
  // const { plazastrues } = useSelector((state) => state.plaza);
  // const { locatarios } = useSelector((state) => state.locatario);
  // const { id } = useSelector((state) => state.auth);

  // const [horaSI, setHoraSI] = useState(false);
  // const [imglogo, setImgLogo] = useState("img");
  // const [horario_m1, setHorariom1] = useState("");
  // const [horario_m2, setHorariom2] = useState("");
  // const [horario_lm1, setHorariolm1] = useState("");
  // const [horario_lm2, setHorariolm2] = useState("");
  // const [horario_mm1, setHorariomm1] = useState("");
  // const [horario_mm2, setHorariomm2] = useState("");
  // const [horario_jm1, setHorariojm1] = useState("");
  // const [horario_jm2, setHorariojm2] = useState("");
  // const [horario_vm1, setHorariovm1] = useState("");
  // const [horario_vm2, setHorariovm2] = useState("");
  // const [horario_sm1, setHorariosm1] = useState("");
  // const [horario_sm2, setHorariosm2] = useState("");
  // const [horario_dm1, setHorariodm1] = useState("");
  // const [horario_dm2, setHorariodm2] = useState("");

  // const [cedula, setCedula] = useState("");
  // const [img, setImg] = useState(null);
  // const [img1, setImg1] = useState(null);
  // const [telefonos, setTele] = useState([{ telefono: " " }]);
  // const [alerta, setAlerta] = useState(false);
  // const [plaza, setPlaza] = useState([]);
  // const [cat, setCat] = useState([]);
  // const [infoLocatarios, handleInputChange] = useForm({
  //   local: "",
  //   nombre: "",
  //   apellido: "",
  //   email: "",
  // });

  // const { local, apellido, nombre, email } = infoLocatarios;

  // const handleImg = (event) => {
  //   var reader = new FileReader();
  //   reader.readAsDataURL(event[0]);
  //   reader.onload = function () {
  //     setImg(event[0]);
  //     setImg1(reader.result);
  //   };

  //   reader.onerror = function () {
  //     console.log(reader.error);
  //   };
  // };

  // const HoraSi = () => {
  //   setHoraSI(true);
  // };

  // const HoraNO = () => {
  //   setHoraSI(false);
  // };

  // const Logo = () => {
  //   setImgLogo("logo");
  // };

  // const Img = () => {
  //   setImgLogo("img");
  // };

  // //agregar un telefono
  // const handleAddTel = () => {
  //   setTele([...telefonos, { telefono: "" }]);
  // };

  // //evento para modificar input
  // const handleInputChange1 = (e, index) => {
  //   const { name, value } = e.target;
  //   const list = [...telefonos];
  //   list[index][name] = value;
  //   setTele(list);
  // };

  // // evento para remover un hijo
  // const handleRemoveClick = (index) => {
  //   const list = [...telefonos];
  //   list.splice(index, 1);
  //   setTele(list);
  // };

  // const setRegistro = async () => {
  //   let horario = [];
  //   horario.push(
  //     horario_m1 + "-" + horario_m2,
  //     horario_lm1 + "-" + horario_lm2,
  //     horario_mm1 + "-" + horario_mm2,
  //     horario_jm1 + "-" + horario_jm2,
  //     horario_vm1 + "-" + horario_vm2,
  //     horario_sm1 + "-" + horario_sm2,
  //     horario_dm1 + "-" + horario_dm2
  //   );
  //   let tele = [];
  //   telefonos.map((item) => {
  //     Array.prototype.push.apply(tele, [item.telefono]);
  //   });

  //   let config = {
  //     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //   };

  //   axios
  //     .post(
  //       process.env.REACT_APP_URL_API + "locatarios/crear",
  //       {
  //         admin_id: id,
  //         plaza_id: plaza.id,
  //         nombre_local: local,
  //         categorias: cat,
  //         nombre: nombre,
  //         apellido: apellido,
  //         cedula: cedula,
  //         horarios: horario,
  //         telefonos: tele,
  //         email: email,
  //       },
  //       config
  //     )
  //     .then((response) => {
  //       if (response.status === 200) {
  //         console.log("SE REGISTRO");
  //         console.log(response);
  //         let id = response.data.locatario.id;
  //         const formData = new FormData();
  //         formData.append("imagen", img);
  //         formData.append("locatario", imglogo);
  //         console.log(img);
  //         let config1 = {
  //           method: "put",
  //           url: process.env.REACT_APP_URL_API + "uploads/LOCATARIO/" + id,
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //           data: formData,
  //         };
  //         axios(config1)
  //           .then((response) => {
  //             if (response.status) {
  //               setAlerta(true);
  //             }
  //           })
  //           .catch((e) => {
  //             console.log("ERROR", e);
  //           });
  //       }
  //     })
  //     .catch((e) => {
  //       console.log("ERROR!!!!!", e);
  //     });
  // };

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="Crear Producto"
      tamaño="md"
    >
      <Formulario></Formulario>
    </Modal>
  );
};

Crear.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default Crear;
