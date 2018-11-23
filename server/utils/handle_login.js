const router = require('express').Router();
const axios = require('axios');

const baseUrl = 'https://cnodejs.org/api/v1';

router.post('/login', function (req, res, next) {
  axios.post(`${baseUrl}/accesstoken`, {
    accesstoken: req.body.accessToken
  }).then(resp => {
    if (resp.status === 200 && resp.data.success) {
      req.session.user = {
        accessToken: req.body.accessToken,
        loginName: resp.data.loginname,
        id: resp.data.id,
        avatarUrl: resp.data.avatarurl
      }
    }
    res.json({
      success: true,
      data: resp.data
    })
  }).catch(e => {
    console.log('error' + e);
    if (e.ressponse) {
      res.json({
        success: false,
        data: e.ressponse.data
      })
    } else {
      next(e);
    }
  })
});
module.exports = router;
