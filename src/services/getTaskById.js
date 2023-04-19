import axios from 'axios'
export const getTaskById =(id)=>{
    return axios.get(`/tasks/${id}?populate=*`)
}