import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

const ModalForm = ({ open, handleClose, title, children, tamaño, Limpiar }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={tamaño}
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent id="alert-dialog-description">{children}</DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose(), Limpiar();
          }}
          color="secondary"
        >
          Salir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ModalForm.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.object,
  tamaño: PropTypes.string,
  Limpiar: PropTypes.func,
};

export default ModalForm;
