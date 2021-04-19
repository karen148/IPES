import React, { useEffect, useState } from "react";
import ContainerDashboard from "./../../components/layaouts/ContainerDashboard";
import TableCategoryItems from "./../../components/shared/tables/TableCategoryItems";
import FormCreateCategory from "./../../components/shared/forms/FormCreateCategory";
import HeaderDashboard from "./../../components/shared/headers/HeaderDashboard";
import { useDispatch, useSelector } from "react-redux";
import { getCategorias } from "actions/categoria";
import { IconButton, TextField } from "@material-ui/core";
import TooltipE from "components/shared/tooltip";
import RefreshIcon from "@material-ui/icons/Refresh";
// import { toggleDrawerMenu } from '~/store/app/action';

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { categorias } = useSelector((state) => state.categoria);
  const [cate, setCate] = useState("");
  const [cat, setCat] = useState([]);
  // useEffect(() => {
  //     dispatch(toggleDrawerMenu(false));
  // }, []);

  useEffect(() => {
    dispatch(getCategorias());
  }, []);

  const filtrar2 = (e) => {
    setCate(e.target.value);
    let data = categorias.filter((item) => {
      if (cate === "") {
        return item;
      } else if (
        item.nombre.toLowerCase().trim().includes(cate.toLowerCase())
      ) {
        return item;
      }
    });
    setCat(
      data.filter((item) => {
        return item !== undefined;
      })
    );
  };

  const restaurar = () => {
    setCat(categorias);
    setCate(" ");
  };

  const getDatos = () => {
    setCat(categorias);
  };

  return (
    <ContainerDashboard title="Categorias">
      <HeaderDashboard
        title="Categorias"
        description="Listado de categorías del IPES"
      />
      <section className="ps-dashboard ps-items-listing">
        <div className="ps-section__left center">
          <TextField
            margin="normal"
            type="text"
            name="cate"
            variant="outlined"
            fullWidth
            value={cate}
            onChange={filtrar2}
            style={{ width: "90%" }}
            placeholder="Buscar"
          />
          <TooltipE title="Restaurar información">
            <IconButton color="primary" component="span" onClick={restaurar}>
              <RefreshIcon style={{ fontSize: "35px", marginTop: "10px" }} />
            </IconButton>
          </TooltipE>
          <div className="ps-section__content">
            <TableCategoryItems
              datos={cat.length === 0 ? categorias : cat}
              get={getDatos}
            />
            <div className="ps-section__footer"></div>
          </div>
        </div>
        <div className="ps-section__right">
          <FormCreateCategory get={getDatos} />
        </div>
      </section>
    </ContainerDashboard>
  );
};

export default CategoriesPage;
