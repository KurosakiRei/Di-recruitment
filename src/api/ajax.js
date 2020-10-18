import axios from 'axios'


export default function ajax(url = '', data = {}, method = 'GET') {
    if (method === 'GET') {
        let qs = ''
        for (let each in data) {
            qs += `${each}=${data[each]}&`
        }

        url = qs ? `${url}?${qs.substring(0,qs.length-1)}` : url

        return axios.get(url)

    } else {
        return axios.post(url, data)
    }
}