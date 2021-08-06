import React, { useEffect, useState } from "react";
// import axios from "axios";
import { getClientes } from "actions/cliente";
import { useDispatch } from "react-redux";

import ContainerDashboard from "../../components/layaouts/ContainerDashboard";
import HeaderDashboard from "./../../components/shared/headers/HeaderDashboard";

import TablesClientes from "components/shared/tables/TablesClientes";

import AddIcon from "@material-ui/icons/Add";
// import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";

import TooltipE from "./../../components/shared/tooltip";
import Excel from "components/shared/Excel";
// import useStyles from "./styles";

const Clientes = () => {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const [nomcliente, setNomCLiente] = useState("");
  const [cliente, setCliente] = useState([]);
  const [cliente1, setCliente1] = useState([]);
  const [mostrar, setMostrar] = useState(false);
  const columns = [
    { label: "Cedula", value: "cedula" },
    { label: "Nombre", value: "nombre" },
    { label: "Teléfono", value: "telefono" },
    { label: "Dirección", value: "direccion" },
    { label: "Email", value: "email" },
    {
      label: "Estado",
      value: function x(row) {
        return row.activo ? "Activo" : "Inactivo";
      },
    },
  ];
  const settings = {
    sheetName: "Clientes IPES",
    fileName: "Clientes-IPES",
  };

  console.log(cliente);
  useEffect(() => {
    dispatch(getClientes(setCliente));
  }, [dispatch]);

  const getDatos = () => {
    dispatch(getClientes(setCliente));
    setMostrar(false);
  };

  const Buscar = (e) => {
    setMostrar(true);
    setNomCLiente(e.target.value);
    if (nomcliente.length === 1) {
      setMostrar(false);
    }
    if (/^([a-zñáéíóú]+[\s]*)+$/.test(nomcliente.toLowerCase())) {
      setCliente1(
        cliente.filter((item) => {
          return item.nombre
            ?.toLowerCase()
            .trim()
            .includes(nomcliente.toLowerCase());
        })
      );
    } else if (/[0-9]/.test(parseInt(nomcliente))) {
      setCliente1(
        cliente.filter((item) => {
          return item.cedula?.trim().includes(parseInt(nomcliente.trim()));
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

  const Restaurar = () => {
    dispatch(getClientes(setCliente));
    setNomCLiente("");
    setMostrar(false);
  };
  console.log(cliente);
  return (
    <ContainerDashboard title="Settings">
      <HeaderDashboard
        title="Clientes"
        description="Información de los clientes de las plazas"
      />
      <section className="ps-items-listing">
        <div className="ps-section__actions">
          <a
            className="ps-btn success"
            onClick={() =>
              Excel(columns, mostrar ? cliente1 : cliente, settings)
            }
            download
          >
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
