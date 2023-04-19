import axios from 'axios'
export const getAllTasks = ()=>{
    return axios.get(`/tasks?pagination[limit]=-1&populate=*`)
}