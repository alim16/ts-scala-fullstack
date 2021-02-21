
import { makeStyles, Theme } from "@material-ui/core"
import AppBar from "@material-ui/core/AppBar"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { Menu } from "@material-ui/icons"
import React from "react"
import { AuthContext } from "../../App"

const useStyles = makeStyles((theme: Theme) => ({
    menuButton: {

    },
    title: {

    },
    bar: {
        marginBottom: 20
    },
    barBox: {
        display: 'flex',
        justifyContent: 'space-between',
        flexGrow: 1
    }
}));

const TopBar = () => {
    const classes = useStyles();
    const { state, dispatch } = React.useContext(AuthContext)
    return (

        <AppBar position="static" className={classes.bar}>
            <Toolbar>
                <Box className={classes.barBox}  >
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h2" className={classes.title}>
                        Something
                </Typography>
                    {state.isAuthenticated ? <Button onClick={() => dispatch({ type: "LOGOUT" })} color="inherit">
                        Logout
                </Button> : <div> </div>}
                </Box>
            </Toolbar>
        </AppBar>
    )
}
export default TopBar