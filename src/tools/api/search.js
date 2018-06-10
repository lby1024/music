import axios from 'axios'

export function get_search_data (keyword, page) {
    let url = ' http://route.showapi.com/213-1'
    let showapi_appid = 61708
    let showapi_sign = '9e08b0b4ba98494dbdd0be29109d4d09'

    url = `${url}?showapi_appid=${showapi_appid}&showapi_sign=${showapi_sign}&keyword=${keyword}&page=${page}`

    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(res=>resolve(res))
            .catch(err=>reject(err))
    })
}

export function get_hot_data () {
    let url = 'http://route.showapi.com/213-4'
    let showapi_appid = 61708
    let showapi_sign = '9e08b0b4ba98494dbdd0be29109d4d09'
    let topid = 26

    url = `${url}?showapi_appid=${showapi_appid}&showapi_sign=${showapi_sign}&topid=${topid}`

    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(res=>{
                // console.log(res)
                resolve(res)
            })
            .catch(err=>reject(err))
    })
}

