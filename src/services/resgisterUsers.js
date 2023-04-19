import axios from 'axios'
export const registerUsers = (request) =>{
    return axios.post(`/users`,request)
}