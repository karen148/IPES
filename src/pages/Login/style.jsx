import { makeStyles } from "@material-ui/core/styles";
import img from "./plaza.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    fontSize: "16px !important",
  },
  image: {
    backgroundImage: `url(${img})`,
    // backgroundImage:
    //   "url(http://komodolarevista.co/wp-content/uploads/sites/40/2018/03/Puesto-de-frutas-en-la-plaza-de-paloquemado-Bogota%CC%81-Cortesia-Mario-Carvajal1-1.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    fontSize: 20,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default useStyles;
