import axios from 'axios'

export default function require(url, data={}, method='get') {
    if (method === 'get') {
        // 拼请求参数串
        // data: {username: tom, password: 123}
        // paramStr: username=tom&password=123
        let paramStr = ''
        Object.keys(data).forEach(key => {
            paramStr += key + '=' + data[key] + '&'
        })
        if(paramStr) {
            paramStr = paramStr.substring(0, paramStr.length-1)
        }
        // 使用axios发get请求
        return axios.get(url + '?' + paramStr)
    }else if (method === 'post') {
        return axios.post(url, data)
    }
}