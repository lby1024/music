// import jsonp from '../../../node_modules/jsonp/index.js'
import jsonp from 'jsonp'

export function jsp (url, data, param) {
  // 1: 数据整理==>>将data数据添加到url里面
  url = url + '?' + dataString(data)
  // 2: 请求数据
  return new Promise((resolve, reject) => {
    jsonp(url, param, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        console.log('请求数据失败')
        reject(err)
      }
    })
  })
}

export function dataString (data) {
  let url = ''
  for (var k in data) {
    url += '&' + k + '=' + encodeURIComponent(data[k])    // encodeURIComponent() 函数作用：可把字符串作为URI 组件进行编码
  }
  return url.substring(1)   // 去掉开头多余的'&'==>>方便和前面的问号链接==>>&id=1&age=22==>>id=1&age=22
}