import request from './index'

export function DailyhqApi(query) {
    return request({
        url: '/graph/Dailyhq',
        method: 'post',
        params:query
    })
}

export function QuotationsApi(query) {
    return request({
        url: '/graph/quotations',
        method: 'post',
        params:query
    })
}
