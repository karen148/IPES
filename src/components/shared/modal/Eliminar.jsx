import React from "react";
import Modal from "./";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

const Eliminar = ({
  open,
  handleClose,
  eliminar,
  titulo,
  titulo1,
  titulo2,
  titulo3,
}) => {
  const Salir = () => {
    eliminar();
    handleClose();
  };

  return (
    <Modal open={open} handleClose={handleClose} title={titulo3} tamaño="xs">
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={12}>
          <h4>
            {titulo1} {titulo2} {titulo}?
          </h4>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={Salir}
            style={{ color: "white" }}
          >
            SI
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            NO
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

Eliminar.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  eliminar: PropTypes.func,
  titulo: PropTypes.string,
  titulo1: PropTypes.string,
  titulo2: PropTypes.string,
  titulo3: PropTypes.string,
};

export default Eliminar;
