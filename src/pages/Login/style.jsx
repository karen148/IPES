import { makeStyles } from "@material-ui/core/styles";
import img from "./plaza.png";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    fontSize: "16px !important",
    justifyContent: "center",
    "& .MuiFormLabel-root": {
      fontSize: "18px",
    },
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
    position: "relative",
  },
  paper: {
    margin: theme.spacing(3, 2),
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
  div2: {
    position: "absolute",
    textAlign: "center",
    justifyContent: "center",
  },
  cardd: {
    marginTop: theme.spacing(5),
    display: "flex",
    width: "115vh",
    borderRadius: "30px",
    position: "relative",
    zIndex: 3,
  },
  img: {
    width: "100%",
    height: "auto",
    marginLeft: "-15px",
  },
  text: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    marginTop: "55px",
    fontSize: "35px",
  },
  boxi: {
    borderColor: "white",
    textAlign: "center",
    width: "50%",
  },
  "@media (max-width: 1024px)": {
    boxi: {
      marginTop: "-40px",
      height: "115px",
    },
    cardd: {
      display: "inline-block",
      padding: "0",
      height: "80vh",
      marginTop: "25px",
    },
    form: {
      marginTop: "-30px",
    },
  },
  "@media (max-width: 960px)": {
    boxi: {
      display: "none",
    },
    cardd: {
      display: "inline-block",
      padding: "0",
      height: "85vh",
      marginTop: "25px",
    },
  },
  "@media (max-width: 800px)": {
    image: {
      backgroundSize: "100% 100%",
    },
    img: {
      display: "none",
      width: "0px",
      marginLeft: "0px",
    },
    cardd: {
      display: "inline-block",
      padding: "0",
      marginTop: "10px",
      height: "95vh",
    },
    boxi: {
      display: "none",
    },
    div2: {
      display: "inline-block",
    },
    form: {
      marginTop: "-15px",
    },
  },
  "@media (max-width: 768px)": {
    img: {
      display: "none",
      width: "0px",
      marginLeft: "0px",
    },
    cardd: {
      display: "inline-block",
      width: "80%",
      height: "50vh",
      marginLeft: "0px",
    },
    text: {
      color: "#450016",
    },
    boxi: {
      display: "none",
    },
    div2: {
      display: "inline-block",
    },
  },
  "@media (max-width: 760px)": {
    image: {
      display: "none",
    },
    img: {
      display: "none",
      width: "0px",
      marginLeft: "0px",
    },
    cardd: {
      display: "inline-block",
      marginTop: theme.spacing(10),
    },
    boxi: {
      display: "none",
    },
    div2: {
      display: "inline-block",
    },
  },
  "@media (max-width: 608px)": {
    boxi: {
      borderColor: "#450016",
      textAlign: "center",
      width: "95%",
      marginLeft: "5%",
    },
  },
  "@media (max-width: 640px)": {
    cardd: {
      display: "inline-block",
      marginTop: "0px",
      width: "100%",
    },
    form: {
      marginTop: "-30px",
    },
  },
  "@media (max-width: 610px)": {
    cardd: {
      display: "inline-block",
      marginTop: "15%",
      width: "100%",
    },
  },
  "@media (max-width: 360px)": {
    cardd: {
      display: "inline-block",
      marginTop: "-15px",
      width: "100%",
    },
    form: {
      marginTop: "-6px",
    },
  },
}));

export default useStyles;
