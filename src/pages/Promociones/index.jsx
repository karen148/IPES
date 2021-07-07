import React, { useEffect } from "react";

import ContainerDashboard from "../../components/layaouts/ContainerDashboard";
import HeaderDashboard from "./../../components/shared/headers/HeaderDashboard";

import { getTrue } from "./../../actions/plaza";

import AddIcon from "@material-ui/icons/Add";

import { useDispatch } from "react-redux";
import { getCategorias } from "actions/plaza";
import { getProducto } from "actions/producto";
import Crear from "components/shared/modal/Promociones/Crear";
import { getPromocion } from "actions/promociones";
import CardPromocion from "components/shared/cards/CardPromocion";

const Promocion = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    dispatch(getPromocion());
    dispatch(getProducto());
    dispatch(getCategorias());
    dispatch(getTrue());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(getPromocion());
  };

  return (
    <ContainerDashboard title="Settings">
      <HeaderDashboard
        title="Promociones"
        description="Información de las promociones de las plazas"
      />
      <section className="ps-items-listing">
        <div className="ps-section__actions">
          <a className="ps-btn success" onClick={handleClickOpen}>
            <AddIcon />
            Nueva Promoción
          </a>
        </div>
        <div className="ps-section__content">
          <CardPromocion />
        </div>
      </section>
      <Crear key="2015" open={open} handleClose={handleClose} />
    </ContainerDashboard>
  );
};
export default Promocion;
// export default connect((state) => state.app)(SettingsPage);
