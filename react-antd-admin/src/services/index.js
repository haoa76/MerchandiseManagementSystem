import { message } from "antd";
import axios from "axios";

const doAxios = (url, method = 'get', params) => {
    return axios({   //这里要将axios的请求方法改为promise对象返回出去
        headers:{Authorization: sessionStorage.getItem('token')},
        method,
        url,
        params: method === 'get' ? params : undefined,
        data: method === 'post' ? params : undefined,
    }).then(res => {
        if (res.status === 200) {
            if (res.data.code === '00000') {
                return res.data
            } else if (res.data.code === '-1') {
                return res.data
            }
            else if (res.data.code === '102') {
                window.location = '/login'
                message.error(res.data.message)
            }
            else {
                return Promise.reject(res.data)
            }
        }
    }).catch(err => {
        // debugger
        const { response = {} } = err;
        message.error(response.data || '请求失败')
    })
}
export default {
    get: (url, params) => doAxios(url, 'get', params),
    post: (url, params) => doAxios(url, 'post', params)
}