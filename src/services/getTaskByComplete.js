import axios from 'axios'
export const getTaskByComplete = (complete)=>{
    return axios.get(`/tasks?filters[complete][$eq]=${complete}&populate=*`)
}