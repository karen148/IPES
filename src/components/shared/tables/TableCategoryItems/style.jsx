import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  text: {
    color: "#8c8989",
  },
  text1: {
    color: "#5a4848",
  },
  text2: {
    color: theme.palette.primary.main,
  },
}));

export default useStyles;
