
import { Container, makeStyles, Typography } from "@material-ui/core"
import React from "react"
import Alert from '@material-ui/lab/Alert'
import { AuthContext } from "../../App"
import { loginStyles } from "./loginStyles"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"

interface IUserState {
    email: string,
    password: string,
    isSubmitting: boolean,
    errorMessage: string | null
}

export const LoginOld = () => {
    const { dispatch } = React.useContext(AuthContext)

    const classes = loginStyles()
    const initialState: IUserState = {
        email: "",
        password: "",
        isSubmitting: false,
        errorMessage: null
    }
    const [data, setData] = React.useState(initialState)
    const handleInputChange = (event: any) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }
    const handleFormSubmit = (event: any) => {
        event.preventDefault()
        setData({
            ...data,
            isSubmitting: true,
            errorMessage: null
        })

        //`${config.SERVER_BASE_URL}/login`
        fetch(`https://finalspaceapi.com/api/v0/character/?limit=12`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: data.email,
                password: data.password
            })
        })
            .then(res => {
                // if (res.ok) {
                //     return res.json()
                // }
                // throw res
                return { user: 'admin', token: '1234' } //TODO: hardcoded, fix when auth is working
            })
            .then(resJson => {
                dispatch({
                    type: "LOGIN",
                    payload: resJson
                })
            })
            .catch(error => {
                setData({
                    ...data,
                    isSubmitting: false,
                    errorMessage: error.message || error.statusText
                })
            })
    }
    return (
        <Container className={classes.container} maxWidth="xs">
            <form onSubmit={handleFormSubmit}>
                <Typography component="h1" variant="h5">Login </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Email"
                                    name="email" size="small"
                                    variant="outlined"
                                    id="email"
                                    value={data.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    size="small"
                                    type="password"
                                    variant="outlined"
                                    value={data.password}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    {data.errorMessage && (
                        <Alert severity="error">{data.errorMessage}</Alert>
                    )}

                    <Grid item xs={12}>
                        <Button color="secondary" fullWidth type="submit" variant="contained">
                            {data.isSubmitting ? ("Loading..." ) : ("Login")}
                        </Button>
                    </Grid>
                    <Grid item xs={12} justify="center">
                <Alert severity="info">No registration option atm</Alert>
                </Grid>
                </Grid>

            </form>
        </Container>

    )
}
export default LoginOld