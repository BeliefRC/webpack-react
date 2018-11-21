import axios from 'axios'

const baseUrl = process.env.API_BASE || ''

const parseUrl = (url, params) => {
  const str = Object.keys(params).reduce((result, key) => {
    result += `${key}=${params[key]}&`
    return result
  }, '')
  return `${baseUrl}/api${url}?${str.substr(0, str.length - 1)}`
}

export const get = (url, params) => new Promise((resolve, reject) => {
  axios.get(parseUrl(url, params))
    .then((response) => {
      const { data } = response
      if (data && data.success === true) {
        resolve(data)
      } else {
        reject(data)
      }
    })
    .catch(reject)
})

export const post = (url, params, data) => new Promise((resolve, reject) => {
  axios.post(parseUrl(url, params), data)
    .then((response) => {
      const resData = response.data
      if (resData && resData.success === true) {
        resolve(resData)
      } else {
        reject(resData)
      }
    })
    .catch((err) => {
      reject(err)
    })
})
