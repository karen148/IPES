import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
/**
 * @function
 * @name ModalLocatario
 * @description Modal locatario es una sección que va mostrar un listado de los nùmeros
 * de los locales de cada locatario.
 * @param {Boolean} open
 * @param {Function} handleClose Es una función para cerrar el modal
 * @returns Listado de categorías
 * @author Karen V. González M.
 */
const ModalLocatario = ({ open, handleClose, locatario, datos }) => {
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
      <DialogTitle id="alert-dialog-title">
        LISTA DE LOCALES DE {locatario}
      </DialogTitle>
      <DialogContent id="alert-dialog-description">
        {open &&
          datos.map((item) => {
            let data = [];
            for (let i = 0; i <= item?.numero_local.length; i++) {
              const element = item?.numero_local[i];
              if (element) {
                data.push({
                  local: element,
                });
              }
            }
            return (
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                key={item.id}
              >
                {data.map((cat) => {
                  return (
                    <Grid item xs="12" sm="4" md="4" lg="4" key={cat.local}>
                      <Box
                        border={2}
                        style={{
                          borderColor: "#DE9E12",
                          textAlign: "center",
                          borderRadius: "10px",
                          width: "100%",
                        }}
                      >
                        <p>{cat.local}</p>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
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

ModalLocatario.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  locatario: PropTypes.string,
  datos: PropTypes.array,
};

export default ModalLocatario;
