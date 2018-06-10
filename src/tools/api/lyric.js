import axios from 'axios'

export function get_lyric (songmid) {
    let url = 'http://route.showapi.com/213-2'
    let showapi_appid = 61708
    let showapi_sign = '9e08b0b4ba98494dbdd0be29109d4d09'
    let musicid = songmid

    url = `${url}?showapi_appid=${showapi_appid}&showapi_sign=${showapi_sign}&musicid=${songmid}`

    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(res=>resolve(res.data.showapi_res_body.lyric))
            .catch(err=>reject(err))
    })
}
