
import { Container, makeStyles, Typography } from "@material-ui/core"
import React from "react"
import Alert from '@material-ui/lab/Alert'
import Card from "@material-ui/core/Card"
import API from "../../utils/API"
import { config } from "../../utils/constants"
import { AuthContext } from "../../App"
import { loginStyles } from "./loginStyles"

interface IUserState {
    email: string,
    password: string,
    isSubmitting: boolean,
    errorMessage: string | null
}





export const Login = () => {
    const { dispatch } = React.useContext(AuthContext)
    
    const classes = loginStyles()
    const initialState:IUserState = {
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
    const handleFormSubmit = (event:any) => {
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
                return  {user:'admin', token:'1234'}
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

        <div className={classes.container}>
            <Card>
                <div className="container">
                    <form className={classes.form2} onSubmit={handleFormSubmit}>
                        <Typography component="h1" variant="h5">Login </Typography>

                        <label htmlFor="email">
                            Email Address
                            <input
                                type="text"
                                value={data.email}
                                onChange={handleInputChange}
                                name="email"
                                id="email"
                            />
                        </label>

                        <label htmlFor="password">
                            Password
                            <input
                                type="password"
                                value={data.password}
                                onChange={handleInputChange}
                                name="password"
                                id="password"
                            />
                        </label>

                        {data.errorMessage && (
                            <Alert severity="error">{data.errorMessage}</Alert>
                        )}

                        <button className={classes.submit} disabled={data.isSubmitting}>
                            {data.isSubmitting ? (
                                "Loading..."
                            ) : ("Login")}
                        </button>
                    </form>
                </div>
           </Card>
        </div>

    )
}
export default Login