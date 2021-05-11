import React, { useEffect, useState } from "react";
import axios from "axios";

import ContainerDashboard from "../../components/layaouts/ContainerDashboard";
import HeaderDashboard from "./../../components/shared/headers/HeaderDashboard";

import TablesClientes from "components/shared/tables/TablesClientes";

import AddIcon from "@material-ui/icons/Add";
// import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import RefreshIcon from "@material-ui/icons/Refresh";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";

import TooltipE from "./../../components/shared/tooltip";
// import useStyles from "./styles";

const Clientes = () => {
  // const classes = useStyles();

  const [nomcliente, setNomCLiente] = useState("");
  const [cliente, setCliente] = useState([]);
  const [cliente1, setCliente1] = useState([]);
  const [mostrar, setMostrar] = useState(false);

  const getDatos = () => {
    getCliente();
    setMostrar(false);
  };

  const Buscar = (e) => {
    setMostrar(true);
    setNomCLiente(e.target.value);
    setCliente1(cliente);
    if (/^([a-zñáéíóú]+[\s]*)+$/.test(nomcliente.toLowerCase())) {
      setCliente1(
        cliente1.filter((item) => {
          return item.nombre
            .toLowerCase()
            .trim()
            .includes(nomcliente.toLowerCase());
        })
      );
    }
    // else if (
    //   !/^([a-zñáéíóú]+[\s]*)+$/.test(nomcliente.toLowerCase()) === false
    // ) {
    //   setCliente1(cliente);
    //   console.log(cliente);
    //   console.log("aqui");
    // }
  };

  console.log(nomcliente.toLowerCase());
  console.log(/^([a-zñáéíóú]+[\s]*)+$/.test(nomcliente.toLowerCase()));
  const Restaurar = () => {
    getCliente();
    setNomCLiente("");
    setMostrar(false);
  };

  const ExportarCliente = async () => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(process.env.REACT_APP_URL_API + "clientes/downladXLSX", config)
      .then((response) => {
        console.log(response);
        window.open(
          process.env.REACT_APP_URL_API + "clientes/downladXLSX",
          "_self"
        );
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };

  const getCliente = async () => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(process.env.REACT_APP_URL_API + "clientes/getAll", config)
      .then((response) => {
        let data = response.data.clientes;
        let clientes = data.map((item, index) => ({
          conteo: index + 1,
          id: item.id,
          nombre: item.nombre,
          telefono: item.telefono,
          direccion: item.direccion,
          img: item.img,
          activo: item.activo,
          email: item.email,
          acciones: [
            {
              name: "Eliminar",
              icon: <DeleteIcon />,
              id: item.id,
            },
          ],
        }));
        setCliente(clientes);
      })
      .catch((e) => {
        console.log("ERROR!!!!!", e);
      });
  };
  useEffect(() => {
    getCliente();
  }, []);

  console.log(cliente);
  return (
    <ContainerDashboard title="Settings">
      <HeaderDashboard
        title="Clientes"
        description="Información de los clientes de las plazas"
      />
      <section className="ps-items-listing">
        <div className="ps-section__actions">
          <a className="ps-btn success" onClick={ExportarCliente} download>
            <AddIcon />
            Exportar datos
          </a>
        </div>
        <div>
          <TextField
            margin="normal"
            type="text"
            name="cate"
            variant="outlined"
            fullWidth
            value={nomcliente}
            onChange={Buscar}
            placeholder="Buscar"
            style={{ width: "100%" }}
          />
          <span
            style={{
              float: "right",
              cursor: "pointer",
              position: "relative",
              margin: "-75px 10px 0 0",
            }}
          >
            <TooltipE title="Restaurar información">
              <IconButton color="primary" component="span" onClick={Restaurar}>
                <RefreshIcon style={{ fontSize: "35px", marginTop: "10px" }} />
              </IconButton>
            </TooltipE>
          </span>
        </div>
        <div className="ps-section__content">
          <TablesClientes
            getDatos={getDatos}
            datos={mostrar ? cliente1 : cliente}
          />
        </div>
        <div className="ps-section__footer"></div>
      </section>
    </ContainerDashboard>
  );
};
export default Clientes;
