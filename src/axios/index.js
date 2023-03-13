

import axios from 'axios'

const service = axios.create({
    baseURL:"",
    timeout: 300000 // request timeout
})

service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        console.error('production ======>axiox request err:' + error)
        return Promise.reject(error)
    }
)
service.interceptors.response.use(
    response => {
        if(response.status==200){
            return response.data
        }
    },
    error => {
        console.error('production ======>axiox response err:' + error) // for debug
        return Promise.reject(error)
    }
)

export default service
