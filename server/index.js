const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const serverRender = require('./utils/server_render');

const isDev = process.env.NODE_ENV === 'development';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'loginInfo',
  resave: false,
  saveUninitialized: false,
  secret: 'react ssr'
}))

app.use(favicon(path.join(__dirname, '../favicon.ico')));

app.use('/api/user', require('./utils/handle_login'));
app.use('/api', require('./utils/proxy'));

if (!isDev) {
  const fs = require('fs');
  const serverEntry = require('../dist/server_entry.js');
  const template = fs.readFileSync(path.join(__dirname, '../dist/server.ejs'), 'utf8');

  app.use('/public', express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res, next) => {
    serverRender(serverEntry, template, req, res).catch(next)
  });
} else {
  const devStatic = require('./utils/dev_static');
  devStatic(app);
}

app.use(function (error, req, res, next) {
  console.error(error);
  res.status(500).send(error);
})

app.listen(3001, () => {
  console.log('server is runing at : http://127.0.0.1:3001');
});
