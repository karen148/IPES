import { withStyles } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from "prop-types";

const TooltipE = ({ title, children }) => {
  const Style = withStyles((theme) => ({
    tooltip: {
      fontSize: 15,
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
    arrow: {
      color: theme.palette.primary.main,
    },
  }))(Tooltip);

  return (
    <Style title={title} arrow>
      {children}
    </Style>
  );
};

TooltipE.propTypes = {
  title: PropTypes.string,
  getLocali: PropTypes.func,
  children: PropTypes.element,
};

export default TooltipE;
