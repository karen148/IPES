import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useStyle from "./style";
import { useDispatch, useSelector } from "react-redux";
import TooltipE from "components/shared/tooltip";
import { getPromocionID } from "actions/promociones";
import Actualizar from "components/shared/modal/Promociones/Actualizar";
import Eliminar from "components/shared/modal/Eliminar";
import Box from "@material-ui/core/Box";
import { DeletePromocion } from "actions/promociones";
import { getPromocion } from "actions/promociones";
import firebase from "firebase";
import { DesactivarPromocion } from "actions/promociones";
// const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const CardPromocion = () => {
  const dispatch = useDispatch();

  const { promociones } = useSelector((state) => state.promocion);
  const { categorias, plazastrues } = useSelector((state) => state.plaza);
  const { productos } = useSelector((state) => state.producto);

  const classes = useStyle();

  const [expanded, setExpanded] = useState(false);
  const [dp1, setIdp1] = useState("");
  const [dp2, setIdp2] = useState("");
  const [dp3, setIdp3] = useState("");
  const [promocion, setPromocion] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const handleExpandClick = (id) => {
    setExpanded(!expanded);
    setIdp2(id);
  };

  const handleClickOpen1 = (id) => {
    setOpen1(true);
    dispatch(getPromocionID(id, setPromocion));
  };

  const handleClose1 = () => {
    setOpen1(false);
    dispatch(getPromocion());
  };

  const handleClickOpen2 = (id) => {
    setOpen2(true);
    setIdp1(id);
  };

  const handleClose2 = () => {
    setOpen2(false);
    dispatch(getPromocion());
  };

  const handleClickOpen3 = (id) => {
    setOpen3(true);
    setIdp3(id);
  };

  const handleClose3 = () => {
    setOpen3(false);
    dispatch(getPromocion());
  };

  const Activar = () => {
    dispatch(DeletePromocion(dp1));
    dispatch(getPromocion());
  };

  const Desactivar = () => {
    dispatch(DesactivarPromocion(dp3));
    dispatch(getPromocion());
  };

  console.log(dp1);
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      {promociones.map((item) => {
        let plaza = [];
        let producto = [];
        let categoria = [];
        for (let index = 0; index < item.plazas_id.length; index++) {
          const element = item.plazas_id[index];
          plazastrues.map((pla) => {
            if (element === pla.id) {
              plaza.push(pla);
            }
          });
        }
        for (let index = 0; index < item.producto_id.length; index++) {
          const element = item.producto_id[index];
          productos.map((pro) => {
            if (element === pro.id) {
              producto.push(pro);
            }
          });
        }
        for (let index = 0; index < item.categorias_id.length; index++) {
          const element = item.categorias_id[index];
          categorias.map((pro) => {
            if (element === pro.id) {
              categoria.push(pro);
            }
          });
        }
        var desertRef1 = firebase
          .storage()
          .ref()
          .child(`PROMOCIONES/img/${item.id}/${item.imagen}`);
        desertRef1.getDownloadURL().then(function (url) {
          var img = document.getElementById(`img${item.imagen}`);
          console.log(img);
          img.src = url;
        });
        return (
          <Grid item xs={12} sm={3} md={3} lg={3} key={item.id}>
            <Card className={classes.root}>
              <CardContent style={{ textAlign: "center" }}>
                <img src="" id={`img${item.imagen}`} />
                <Typography variant="body2" color="textSecondary" component="p">
                  Imagen de la promoción
                </Typography>
                <Box>{item.activo}</Box>
              </CardContent>
              <CardActions disableSpacing>
                {item.acciones.map((cat) => {
                  return (
                    <TooltipE title={cat.name} key={cat.name}>
                      <IconButton
                        style={{ color: "#450016" }}
                        aria-label="add to favorites"
                        onClick={
                          cat.name === "Editar"
                            ? () => handleClickOpen1(cat.id)
                            : cat.name === "Activar"
                            ? () => handleClickOpen2(cat.id)
                            : () => handleClickOpen3(cat.id)
                        }
                      >
                        {cat.icon}
                      </IconButton>
                    </TooltipE>
                  );
                })}
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={() => handleExpandClick(item.id)}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse
                in={dp2 === item.id && expanded}
                timeout="auto"
                unmountOnExit
              >
                <CardContent>
                  <Typography variant="h5" color="secondary">
                    Plazas:
                  </Typography>
                  {plaza.map((pla) => {
                    return (
                      <Typography paragraph key={pla.id}>
                        {pla?.nombre.toUpperCase()}
                      </Typography>
                    );
                  })}
                  <Typography variant="h5" color="secondary">
                    Categorías:
                  </Typography>
                  {categoria.map((pla) => {
                    return (
                      <Typography paragraph key={pla.id}>
                        {pla.label}
                      </Typography>
                    );
                  })}
                  <Typography variant="h5" color="secondary">
                    Productos:
                  </Typography>
                  {producto.map((pla) => {
                    return (
                      <Typography paragraph key={pla.id}>
                        {pla?.nombre.toUpperCase()}
                      </Typography>
                    );
                  })}
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        );
      })}
      <Eliminar
        open={open3}
        handleClose={handleClose3}
        eliminar={Desactivar}
        titulo3="Desactivar promoción"
        titulo2="Desea desactivar la promoción"
      />
      <Eliminar
        open={open2}
        handleClose={handleClose2}
        eliminar={Activar}
        titulo3="Activar promoción"
        titulo2="Desea activar la promoción"
      />
      <Actualizar
        open={open1}
        handleClose={handleClose1}
        id={promocion?.id}
        plaza1={promocion?.plazas_id}
        productos1={promocion?.producto_id}
        categorias1={promocion?.categorias_id}
        imagen1={promocion?.imagen}
      />
    </Grid>
  );
};

export default CardPromocion;
