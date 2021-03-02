import React from 'react';
import { AuthContext } from '../App';
import { config } from './constants'

//TODO: error handling when server is down or nothing is returned (ErrorBoundery, Suspense)??
export default {
    getFinalSpaceCharacters: async () => {
        const res = await fetch("https://finalspaceapi.com/api/v0/character/?limit=12");
        return await res.json();
    },
    getPeopleList: async () => {
        const res = await fetch(`${config.SERVER_BASE_URL}/people`);
        return await res.json();
    },

    loginFake: async (data: any) => {
        const res = await fetch(`${config.SERVER_BASE_URL}/login`, {
            method: "POST", //TODO: change back to a get
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: data.email, password: data.password })
        })
        if (!res.ok) {
            throw new Error(res.status.toString());
        }
        return res.json();

    }

}