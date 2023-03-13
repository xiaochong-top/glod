import request from './index'

export function historyDataApi(query) {
    return request({
        url: '/graph/Dailyhq',
        method: 'post',
        params:query
    })
}

export function todayDataApi(query) {
    return request({
        url: '/graph/quotations',
        method: 'post',
        params:query
    })
}
