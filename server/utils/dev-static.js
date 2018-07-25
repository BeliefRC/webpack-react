const path = require('path')
const axios = require('axios')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const proxy=require('http-proxy-middleware')
const ReactDomServer = require('react-dom/server')
const serverConfig = require('../../build/webpack.config.server')
//获取html模板
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/index.html')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

//获取module的构造函数
const Module = module.constructor

//从内存中读取数据的fs模块
const mfs = new MemoryFs
// webpack为node提供将配置文件作为模块调用的功能
const serverCompiler = webpack(serverConfig)
//更改输出文件到内存中，而不是硬盘，加快开发效率
serverCompiler.outputFileSystem = mfs
let serverBundle
//监听模块打包的过程
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warning => console.warn(warning))

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )
  //读写出的数据为字符串
  const bundle = mfs.readFileSync(bundlePath, 'utf8')
  //字符串转换为模块
  const m = new Module()
  //第二个参数为模块名
  m._compile(bundle, 'server-entry.js')
  serverBundle = m.exports.default

})
module.exports = (app) => {
  app.use('/public',proxy({
    target:'http://localhost:8888'
  }))
  app.get('*', (req, res) => {
    getTemplate().then(template => {
      const content = ReactDomServer.renderToString(serverBundle)
      res.send(template.replace('<!-- app -->', content))
    })
  })

}