import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
/**
 * @function
 * @name ModalCategorias
 * @description Modal categorías es una sección que va mostrar un listado de categorías
 * por plaza.
 * @param {Boolean} open
 * @param {Function} handleClose Es una función para cerrar el modal
 * @returns Listado de categorías
 * @author Karen V. González M.
 */
const ModalCategorias = ({ open, handleClose, titulo, mensaje, datos }) => {
  const { categorias } = useSelector((state) => state.plaza);
  console.log(datos);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
      style={{ borderRadius: "10px" }}
    >
      <DialogTitle id="alert-dialog-title">{titulo}</DialogTitle>
      <DialogContent id="alert-dialog-description">
        {open &&
          datos?.map((item) => {
            let data = [];
            for (let i = 0; i <= item?.categorias_id.length; i++) {
              const element = item?.categorias_id[i];
              categorias.map((item) => {
                if (item.id === element) {
                  data.push({
                    icono: item.icono,
                    id: item.id,
                    name: item.label,
                  });
                }
              });
            }
            return item?.categorias_id.length !== 0 ? (
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                {data.map((cat) => {
                  return (
                    <Grid item xs="12" sm="4" md="4" lg="4" key={cat.id}>
                      <Box
                        border={2}
                        style={{
                          borderColor: "#DE9E12",
                          textAlign: "center",
                          borderRadius: "10px",
                          width: "100%",
                        }}
                      >
                        <p>{cat.name}</p>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <h4 style={{ textAlign: "center", color: "#FF2D42" }}>
                {mensaje}
              </h4>
            );
          })}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Salir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ModalCategorias.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  titulo: PropTypes.string,
  mensaje: PropTypes.string,
  datos: PropTypes.array,
};

export default ModalCategorias;
