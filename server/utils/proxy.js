const axios = require('axios');

const baseUrl = 'https://cnodejs.org/api/v1';

module.exports = function (req, res, next) {
  const path = req.path;
  const user = req.session.user || {};
  const needAccessToken = req.query.needAccessToken;

  if (needAccessToken && !user.accessToken) {
    res.status(401).send({
      success: false,
      msg: 'need login'
    })
  }

  const query = {
    ...req.query,
    ...{
      accesstoken: (req.needAccessToken && req.method === 'GET') ? user.accessToken : ''
    }
  };
  query.needAccessToken && delete query.needAccessToken;

  axios(`${baseUrl}${path}`, {
    method: req.method,
    params: query,
    data: {
      ...req.body,
      ...{
        accesstoken: (req.needAccessToken && req.method === 'POST') ? user.accessToken : ''
      }
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(resp => {
    if (resp.status === 200) {
      res.send(resp.data);
    } else {
      res.status(resp.status).send(resp.data);
    }
  }).catch(e => {
    if (e.response) {
      res.status(500).send(e.response.data);
    } else {
      res.status(500).send({
        success: false,
        msg: '未知错误'
      })
    }
  })
}
