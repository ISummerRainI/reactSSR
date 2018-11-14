const Koa = require('koa');
const Router = require('koa-router');
const reactSSR = require('react-dom/server');
const path = require('path');
const _static = require('koa-static-router');
const fs = require('fs.promised');

const serverEntry = require('../dist/server_entry.js').default;

const app = new Koa();
const router = new Router();

const main = async function (ctx, next) {
  await next();
  const template = await fs.readFile(path.join(__dirname, '../dist/index.html'), 'utf8');
  ctx.response.body = template.replace('<!-- app -->', reactSSR.renderToString(serverEntry));
}

app.use(_static({
  dir: 'dist',
  router: '/public/'
}));

router.get('/', main);
app.use(router.routes());

app.listen('3000', () => {
  console.log('server is listen: http://127.0.0.1:3000');
});
