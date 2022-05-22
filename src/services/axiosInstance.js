import axios from "axios"

export const baseURL = 'https://test-front.framework.team'

const instance = axios.create({
    withCredentials: true,
    baseURL,
    crossDomain: true
})


export default instance