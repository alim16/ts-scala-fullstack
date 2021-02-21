import React from 'react';
import { AuthContext } from '../App';
import { config } from './constants'

//TODO: error handling when server is down or nothing is returned (ErrorBoundery, Suspense)??
export default {
    getFinalSpaceCharacters: () => {
        return fetch("https://finalspaceapi.com/api/v0/character/?limit=12")
            .then((res) => res.json())
    },
    getPeopleList: () => {
        return fetch(`${config.SERVER_BASE_URL}/people`)
            .then((res) => res.json())
    },

    // Login: () => {
    //     const { dispatch } = React.useContext(AuthContext);
    //     const initialState = {
    //         email: "",
    //         password: "",
    //         isSubmitting: false,
    //         errorMessage: null
    //       };
    //     const [data, setData] = React.useState(initialState);

    //     fetch(`${config.SERVER_BASE_URL}/login`, {
    //         method: "post",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             username: data.email,
    //             password: data.password
    //         })
    //     })
    //         .then(res => {
    //             // if (res.ok) {
    //             //     return res.json();
    //             // }
    //             // throw res;
    //             return JSON.stringify( {user:'admin', token:'1234'})
    //         })
    //         .then(resJson => {
    //             dispatch({
    //                 type: "LOGIN",
    //                 payload: resJson
    //             })
    //         })
    //         .catch(error => {
    //             setData({
    //                 ...data,
    //                 isSubmitting: false,
    //                 errorMessage: error.message || error.statusText
    //             });
    //         });
    // }

}