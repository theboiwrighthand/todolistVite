import axios from 'axios'
export const postTask = (request , config)=>{
    
    return axios.post(`/tasks`,request,config)
}

export const postTaskImage = (formdata)=>{
    
    return axios.post(`/upload`,formdata)
}