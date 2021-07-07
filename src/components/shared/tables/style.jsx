import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 600,
    maxWidth: "100%",
  },
  encabezado: {
    fontWeight: "bold",
    color: "#450016",
    fontSize: "16px",
  },
  text: {
    color: "#8c8989",
  },
  text1: {
    color: "#5a4848",
  },
  text2: {
    color: theme.palette.primary.main,
  },
  demo: {
    marginBottom: "15px",
  },
  nombre: {
    color: "#3DBE97",
  },
  iconos: {
    color: "#450016",
  },
  error: {
    color: "#FF2D42",
  },
}));

export default useStyles;
