import axios from 'axios'
export const updateTask = (id,request,config) =>{
    
    return axios.put(`/tasks/${id}`,request,config)
}