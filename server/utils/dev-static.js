const path = require('path')
const axios = require('axios')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const ejs = require('ejs')
const serialize = require('serialize-javascript')
const asyncBootstrap = require('react-async-bootstrapper')
const ReactDomServer = require('react-dom/server')
const serverConfig = require('../../build/webpack.config.server')
// 获取html模板
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/server.ejs')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

// 获取module的构造函数
const Module = module.constructor

// 从内存中读取数据的fs模块
const mfs = new MemoryFs()
// webpack为node提供将配置文件作为模块调用的功能
const serverCompiler = webpack(serverConfig)
// 更改输出文件到内存中，而不是硬盘，加快开发效率
serverCompiler.outputFileSystem = mfs
let serverBundle, createStoreMap
// 监听模块打包的过程
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warning => console.warn(warning))

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )
  // 读写出的数据为字符串
  const bundle = mfs.readFileSync(bundlePath, 'utf8')
  // 字符串转换为模块
  const m = new Module()
  // 第二个参数为模块名
  m._compile(bundle, 'server-entry.js')
  serverBundle = m.exports.default
  createStoreMap = m.exports.createStoreMap
})

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}

module.exports = (app) => {
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }))
  app.get('*', (req, res) => {
    getTemplate().then(template => {
      const routerContext = {}
      const stores = createStoreMap()
      const app = serverBundle(stores, routerContext, req.url)
      asyncBootstrap(app).then(() => {
        if (routerContext.url) {
          res.status(302).setHeader('Location', routerContext.url)
          res.end()
          return
        }
        console.log(stores.appState.count)
        const state = getStoreState(stores)
        const content = ReactDomServer.renderToString(app)
        const html = ejs.render(template, {
          appString: content,
          initialState: serialize(state)
        })
        res.send(html)
        // res.send(template.replace('<!-- app -->', content))
      })
    })
  })
}
