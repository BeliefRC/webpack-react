const axios = require('axios')

const baseUrl = 'http://cnodejs.org/api/v1'

module.exports = (req, res, next) => {
  const path = req.path
  const user = req.session.user || {}
  const needAccessToken = req.query.needAccessToken
  if (needAccessToken && !user.accessToken) {
    res.status(401).send({
      success: false,
      msg: 'need login'
    })
  }
  const query = Object.assign({}, req.query)
  if (query.needAccessToken) delete query.needAccessToken
  axios(`${baseUrl}${path}`, {
    method: req.method,
    params: query,
    data: Object.assign({}, req.body, {
      accesstoken: user.accessToken
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencode'
    }
  }).then(
    resData => {
      if (resData.status === 200) {
        res.send(resData.data)
      } else {
        res.status(resData.status).send(resData.data)
      }
    }).catch(e => {
    if (e.response) {
      res.status(500).send(res.response.data)
    } else {
      res.status(500).send({success: false, msg: '未知错误'})
    }
  })
}
