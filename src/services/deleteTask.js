import axios from 'axios'
export const deleteTask = (id, config)=>{
    
    return axios.delete(`/tasks/${id}`,config)
}