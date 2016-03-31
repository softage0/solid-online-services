import Koa from 'koa'
import convert from 'koa-convert'
import webpack from 'webpack'
import webpackConfig from '../build/webpack.config'
import historyApiFallback from 'koa-connect-history-api-fallback'
import serve from 'koa-static'
import proxy from 'koa-proxy'
import route from 'koa-route'
import parse from 'co-body'
import monk from 'monk'
import wrap from 'co-monk';
import _debug from 'debug'
import config from '../config'
import webpackDevMiddleware from './middleware/webpack-dev'
import webpackHMRMiddleware from './middleware/webpack-hmr'

const debug = _debug('app:server')
const paths = config.utils_paths
const app = new Koa()
const db = monk(config.db_uri)
const account_collection = db.get('accounts')
const Accounts = wrap(account_collection);

account_collection.index('id', { unique: true })


// Enable koa-proxy if it has been enabled in the config.
if (config.proxy && config.proxy.enabled) {
  app.use(convert(proxy(config.proxy.options)))
}

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement isomorphic
// rendering, you'll want to remove this middleware.
app.use(convert(historyApiFallback({
  verbose: false
})))

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  // Enable webpack-dev and webpack-hot middleware
  const { publicPath } = webpackConfig.output

  app.use(webpackDevMiddleware(compiler, publicPath))
  app.use(webpackHMRMiddleware(compiler))

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(convert(serve(paths.client('static'))))
} else {
  debug(
    'Server is being run outside of live development mode. This starter kit ' +
    'does not provide any production-ready server functionality. To learn ' +
    'more about deployment strategies, check out the "deployment" section ' +
    'in the README.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(convert(serve(paths.base(config.dir_dist))))
}


// ------------------------------------
// REST API
// ------------------------------------

// create new account
app.use(convert(route.post('/api/account', function*() {
  let newAccount = yield parse(this);
  let existence = yield Accounts.findOne({id:newAccount.id});
  if (existence) {
    this.throw(409, "Conflict: duplicate id");
  }

  newAccount.created_at = new Date;
  yield Accounts.insert(newAccount);

  this.body = 'Success';
})));

// show all account list
// POST is used instead of GET since React-router eats all GET request.
// It would rather split api domain and use GET request.
app.use(convert(route.post('/api/account_list', function*() {
  this.body = yield Accounts.find({});
})));

// show account list by id
// POST is used instead of GET since React-router eats all GET request.
// It would rather split api domain and use GET request.
app.use(convert(route.post('/api/account/:id', function*(id) {
  let account = yield Accounts.findOne({_id:id});
  if (!account) this.throw(404, 'invalid account id');
  this.body = account;
})));

// modify account detail
app.use(convert(route.put('/api/account', function *() {
  let modifiedAccount = JSON.parse(yield parse(this));
  modifiedAccount.modified_at = new Date;

  var updated = yield Accounts.updateById(modifiedAccount._id, modifiedAccount);
  if(!updated) {
    this.throw(405, "Unable to update account %s", modifiedAccount._id);
  }

  this.body = updated;
})));

// login
app.use(convert(route.post('/api/login', function*() {
  let credential = yield parse(this);
  let account = yield Accounts.findOne({id:credential.id});
  if(!account || account.password !== credential.password) {
    this.throw(401, "Invalid credential");
  }
  this.body = 'Login Success';
})));


export default app
