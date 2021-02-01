import {config} from './constants'

//TODO: error handling when server is down or nothing is returned (ErrorBoundery, Suspense)??
export default {
    getFinalSpaceCharacters: () => {
        return fetch("https://finalspaceapi.com/api/v0/character/?limit=12")
            .then((res) => res.json())
    },
    getPeopleList: () => {
        return fetch(`${config.SERVER_BASE_URL}/people`)
            .then((res) => res.json())
    }

}