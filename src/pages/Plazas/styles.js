import { useTheme, fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({
    root: {
        '&$focused' : {
            borderColor: theme.palette.primary.main,
        },
        '&:hover' :{
            borderColor: theme.palette.primary.main,
        }
    },
    margin: {
        marginTop: '-7px'
    },
    button:{
        '&:hover' :{
            color: theme.palette.primary.main,
            fontWeight: 'bold'
        }
    }
    
}))

export default useStyles;



