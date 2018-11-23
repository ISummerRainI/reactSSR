const axios = require('axios');
const path = require('path');
const webpack = require('webpack');
const MemoryFs = require('memory-fs');
const proxy = require('http-proxy-middleware');
const serverRender = require('./server_render');

const serverConfig = require('../../build/webpack.config.server');

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://127.0.0.1:3000/public/server.ejs').then(res => {
      resolve(res.data);
    }).catch(reject);
  })
}

const NativeModule = require('module');
const vm = require('vm');
const getModuleFromString = (bundle, filename) => {
  const m = { exports: {} };
  const wrapper = NativeModule.wrap(bundle);
  const script = new vm.Script(wrapper, {
    filename: filename,
    displayErrors: true
  });
  const result = script.runInThisContext();
  result.call(m.exports, m.exports, require, m);
  return m;
}

const mfs = new MemoryFs();
const serverCompiler = webpack(serverConfig);

serverCompiler.outputFileSystem = mfs;
let serverBundle;
serverCompiler.watch({}, (err, status) => {
  if (err) throw err;
  status = status.toJson();
  status.errors.forEach(err => { console.error(err) });
  status.warnings.forEach(warn => { console.error(warn) });

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  );
  const bundle = mfs.readFileSync(bundlePath, 'utf8');
  const m = getModuleFromString(bundle, 'server_entry.js')
  serverBundle = m.exports;
})

module.exports = function (app) {
  app.use('/public', proxy({
    target: 'http://127.0.0.1:3000'
  }));
  app.get('*', (req, res, next) => {
    if (!serverBundle) {
      return res.send('wating for compile, refresh later');
    }
    getTemplate().then(template => {
      return serverRender(serverBundle, template, req, res);
    }).catch(next)
  });
}
