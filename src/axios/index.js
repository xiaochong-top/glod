

import axios from 'axios'
// import { MessageBox, Message} from 'element-ui'
// import store from '@/store'
// import { getToken, setToken, getRegionCode } from '@/utils/auth'
// import router from '@/router'
// import i18n from '@/lang'
// import {GET_BASE_API} from '@/settings'


// let baseURL=GET_BASE_API()
// console.log('production ======>baseURL:',baseURL)

const service = axios.create({
    baseURL:"",
    timeout: 300000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // 去除字段
        // if (config.data) {
        //     if (config.data.gmtCreated) {
        //         delete config.data.gmtCreated
        //     }
        //     if (config.data.gmtModified) {
        //         delete config.data.gmtModified
        //     }
        // }
        // do something before request is sent
        // if (store.getters.token) {
        return config
    },
    error => {
        console.error('production ======>axiox request err:' + error)
        return Promise.reject(error)
    }
)
service.interceptors.response.use(
    response => {
        // const res = response.data
        // if (res.status !== 0) {
        //     let errMassage=''
        //     if(res && res.key) {
        //         errMassage = new Error(res.key)
        //     }
        //     return Promise.reject(errMassage)
        // } else {
        //     return res
        // }
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
