const express = require('express');
const path = require('path');
const app = express();

const isDev = process.env.NODE_ENV === 'development';

if (!isDev) {
  const fs = require('fs');
  const reactSSR = require('react-dom/server')；
  const serverEntry = require('../dist/server_entry.js').default;
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');

  app.use('/public', express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.send(template.replace('<!-- app -->', reactSSR.renderToString(serverEntry)));
  });
} else {
  const devStatic = require('./utils/dev_static');
  devStatic(app);
}

app.listen(3001, () => {
  console.log('server is listen: http://127.0.0.1:3001');
});
