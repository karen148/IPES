import { withStyles } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';

const TooltipE = ({title, children}) =>{ 
    const Style = withStyles((theme) =>({
        tooltip: {
            fontSize: 15,
            backgroundColor: theme.palette.primary.main,
            color: 'white'
        },
        arrow: {
            color: theme.palette.primary.main,
        }
    }))(Tooltip)

    return (<Style title={title} arrow >
                {children}
            </Style>);
}

export default TooltipE;