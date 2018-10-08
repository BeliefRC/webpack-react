const axios = require('axios')
const path = require('path')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')

const serverRender = require('./server.render')

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

// module.export
const NativeModule = require('module')
const vm = require('vm')

// `(function(exports, require, module, __filename, __dirname){ ...bundle code })`
const getModuleFromString = (bundle, filename) => {
  const m = {exports: {}}
  const wrapper = NativeModule.wrap(bundle)
  const script = new vm.Script(wrapper, {
    filename: filename,
    displayErrors: true
  })
  const result = script.runInThisContext()
  result.call(m.exports, m.exports, require, m)
  return m
}

// 从内存中读取数据的fs模块
const mfs = new MemoryFs()
// webpack为node提供将配置文件作为模块调用的功能
const serverCompiler = webpack(serverConfig)
// 更改输出文件到内存中，而不是硬盘，加快开发效率
serverCompiler.outputFileSystem = mfs
let serverBundle
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
  const m = getModuleFromString(bundle, 'server-entry.js')
  serverBundle = m.exports
})

module.exports = (app) => {
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }))

  app.get('*', function (req, res, next) {
    // 开发过程中可能会存在serverBundle未打包完成的情况
    if (!serverBundle) {
      return res.send('waiting for compile, refresh later')
    }
    getTemplate().then(template => {
      return serverRender(serverBundle, template, req, res)
    }).catch(next)
  })
}
