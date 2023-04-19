import axios from 'axios'
export const login = (request )=>{
    
    return axios.post(`/auth/local`,request)
}