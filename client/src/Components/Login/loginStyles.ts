import { makeStyles } from "@material-ui/core/styles";

export const loginStyles = makeStyles((theme) => ({
    container: {
      justifyContent: 'center',
      display: 'flex',
      alignItems:'center',
      height: '50vh'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formError: {
        color: '#FF0000'
    },
    form2: {
        display: 'flex',
        height: 200,
        flexDirection: 'column',
        alignSelf: 'center'
    },
    btn: {
        height: '40px',
        fontWeight: 'bold',
        fontSize: '15px',
        backgroundColor: '#F42B4B',
        color: 'rgb(255, 255, 255)'
    }
}))