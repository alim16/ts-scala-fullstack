
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
import { Drawer } from '@material-ui/core'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InfoIcon from '@material-ui/icons/Info'
import ContactMail from '@material-ui/icons/ContactMail'
import PersonIcon from '@material-ui/icons/Person'

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
    },

    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },

}));
const ListItems = () => { //TODO: improve this list
    const classes = useStyles()
    return (<List className={classes.list}>
        {['HowTo guide', 'Contact Us'].map((text, index) => (
            <ListItem button key={text}>
                <ListItemIcon> {text === "HowTo guide" ? <InfoIcon/> : <ContactMail/> } </ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
        ))}
    </List>
    )
}


const TopBar = () => {
    const classes = useStyles();
    const { state, dispatch } = React.useContext(AuthContext)
    const [drawerState, setState] = React.useState({ drawerOpen: false })
    const toggleDrawer = (newState: boolean) => (event: React.MouseEvent) => { setState({ drawerOpen: newState }) }
    return (

        <AppBar position="static" className={classes.bar}>
            <Toolbar>
                <Box className={classes.barBox}  >
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Menu onClick={toggleDrawer(true)} />
                        <Drawer anchor='left' open={drawerState.drawerOpen} onClose={toggleDrawer(false)}>
                            <ListItems />
                        </Drawer>
                    </IconButton>
                    <Typography variant="h2" className={classes.title}>
                        DataGen POC 🙌
                </Typography>
                    {state.isAuthenticated ? <Button onClick={() => dispatch({ type: "LOGOUT" })} color="inherit">
                    <PersonIcon/> Logout
                </Button> : <div> </div>}
                </Box>
            </Toolbar>
        </AppBar >
    )
}
export default TopBar