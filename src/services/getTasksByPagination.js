import axios from 'axios'
export const getTasksByPagination =(page)=>{
    return axios.get(`/tasks/?&pagination[page]=${page}&pagination[pageSize]=5&populate=*`)
}