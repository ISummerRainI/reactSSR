const serialize = require('serialize-javascript')
const ejs = require('ejs');
const asyncBootstrap = require('react-async-bootstrapper');
const reactDomServer = require('react-dom/server');
const Helmet = require('react-helmet').default;

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    console.log(stores[storeName])
    result[storeName] = stores[storeName].toJson();
    return result;
  }, {})
}

module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) => {
    const createStoreMap = bundle.createStoreMap;
    const createApp = bundle.default;
    const routerContext = {};
    const stores = createStoreMap();
    const app = createApp(stores, routerContext, req.url);

    asyncBootstrap(app).then(() => {
      if (routerContext.url) {
        res.status(302).setHeader('Location', routerContext.url);
        res.send();
        return;
      }
      const helmet = Helmet.rewind();
      const state = getStoreState(stores);
      const content = reactDomServer.renderToString(app);

      const html = ejs.render(template, {
        appString: content,
        initialState: serialize(state),
        meta: helmet.meta.toString(),
        title: helmet.title.toString(),
        style: helmet.style.toString(),
        link: helmet.link.toString()
      })
      res.send(html);
      // res.send(template.replace('<!-- app -->', content));
      resolve();
    }).catch(reject);
  })
}
