const router = require('express').Router()
const axios = require('axios')

const baseUrl = 'http://cnodejs.org/api/v1'

router.post('/login', async (req, res, next) => {
  try {
    const resData = await axios.post(`${baseUrl}/accesstoken`, {
      accesstoken: req.body.accesstoken
    })
    if (resData.status === 200 && resData.data.success) {
      req.session.user = {
        accessToken: req.body.accesstoken,
        loginName: resData.data.loginname,
        id: resData.data.id,
        avatarUrl: resData.data.avatar_url
      }
      res.json({
        success: true,
        data: resData.data
      })
    }
  } catch (e) {
    if (e.response) {
      res.json({
        success: false,
        data: e.response
      })
    } else {
      next(e)
    }
  }
})
module.exports = router
