
import { Container, makeStyles, Typography } from "@material-ui/core"
import React from "react"
import Alert from '@material-ui/lab/Alert'
import API from "../../utils/API"
import { config } from "../../utils/constants"
import { AuthContext } from "../../App"
import { login2Styles, loginStyles } from "./loginStyles"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import FormControl from '@material-ui/core/FormControl'
import { useForm, Controller } from 'react-hook-form'


export const Login = () => {
    const classes = login2Styles()
    const { dispatch } = React.useContext(AuthContext)


    const { control, handleSubmit, watch, errors: fieldsErrors } = useForm()
    const onSubmit = (data: any) => {
        console.log('submitted', JSON.stringify(data))
        API.loginFake(data)
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
           console.log('problem?')
        })
    }

    return (
        <Grid
            container component="main"
            className={classes.root}
            alignItems="center"
            justify="center"
            direction="column"
        >
            <Grid item xs={12}>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                    <Typography component="h1" variant="h5">Login </Typography>
                    <FormControl fullWidth variant="outlined" className={classes.control} >
                        <Controller control={control} name="email"
                            as={
                                <TextField fullWidth
                                    label="Email"
                                    name="email" size="small"
                                    helperText={fieldsErrors.email ? fieldsErrors.email.message : null}
                                    variant="outlined"
                                    error={fieldsErrors.email}
                                    id="email" />
                            }
                            defaultValue=""
                            rules={{
                                required: 'Required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'invalid email address'
                                }
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth variant="outlined" className={classes.control} >
                        <Controller name="password"
                            as={
                                <TextField
                                    fullWidth
                                    label="Password"
                                    id="password"
                                    size="small"
                                    type="password"
                                    variant="outlined"
                                    helperText={fieldsErrors.password ? fieldsErrors.password.message : null}
                                    error={fieldsErrors.password}
                                />
                            }
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true
                            }}
                        />

                    </FormControl>
                    <Grid item container justify="center">
                        <Button color="secondary" fullWidth type="submit" variant="contained" className={classes.button}>
                            Login
                        </Button>
                        <Button disabled={true} color="secondary" fullWidth type="submit" variant="contained" className={classes.button}>
                            Register
                        </Button>
                    </Grid>
                    <Grid item xs={12} >
                        <Alert severity="info">No registration option atm</Alert>
                    </Grid>
                </form>
            </Grid>
        </Grid>

    )
}
export default Login