import React, { useState } from "react";

import ContainerDashboard from "../../components/layaouts/ContainerDashboard";
import HeaderDashboard from "./../../components/shared/headers/HeaderDashboard";

import TablesClientes from "components/shared/tables/TablesClientes";

import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
// import RefreshIcon from "@material-ui/icons/Refresh";

// import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@material-ui/lab/Autocomplete";
import IconButton from "@material-ui/core/IconButton";

import TooltipE from "./../../components/shared/tooltip";
import useStyles from "./styles";

const Pedidos = () => {
  const classes = useStyles();

  // const [nomproducto, setNomProducto] = useState("");
  const [pedidos, setPedidos] = useState([]);

  const getDatos = () => {
    console.log("datos");
  };

  const Buscar = () => {
    console.log("buenas");
  };

  console.log(setPedidos([]));
  return (
    <ContainerDashboard title="Settings">
      <HeaderDashboard
        title="Clientes"
        description="Información de los clientes de las plazas"
      />
      <section className="ps-items-listing">
        <div className="ps-section__actions">
          <a className="ps-btn success" onClick={getDatos}>
            <AddIcon />
            Exportar datos
          </a>
        </div>
        <div className="ps-section__header">
          <div className="ps-section__search">
            <div className={"form-group" + " " + classes.root}>
              {/* <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={pedidos?.map((option) => option?.nombre)}
                inputValue={nomproducto}
                onInputChange={(event, newInputValue) => {
                  setNomProducto(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    type="text"
                    id="standard-basic"
                    style={{ width: "300px", marginTop: "5px" }}
                    placeholder="Producto"
                  />
                )}
              /> */}
            </div>
            <TooltipE title="Buscar">
              <IconButton color="primary" component="span" onClick={Buscar}>
                <SearchIcon style={{ fontSize: "35px", marginTop: "-15px" }} />
              </IconButton>
            </TooltipE>
          </div>
        </div>
        <div className="ps-section__content">
          <TablesClientes getDatos={getDatos} datos={pedidos} />
        </div>
        <div className="ps-section__footer"></div>
      </section>
    </ContainerDashboard>
  );
};
export default Pedidos;
