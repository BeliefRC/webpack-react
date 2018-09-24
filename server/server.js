const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const ReactSSR = require('react-dom/server')
const favicon = require('serve-favicon')

const isDev = process.env.NODE_ENV === 'development'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(session({
  maxAge: 10 * 60 * 1000, // 10min
  name: 'tid', // cookie id
  resave: false, // 是否每次请求都生成cookie id
  saveUninitialized: false,
  secret: 'react'
}))

app.use(favicon(path.join(__dirname, '../favicon.ico')))

app.use('/api/user', require('./utils/handle.login'))
app.use('/api', require('./utils/proxy'))
if (!isDev) {
  const serverEntry = require('../dist/server-entry').default
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
  app.use('/public', express.static(path.join(__dirname, '../dist')))
  app.get('*', (req, res) => {
    const appString = ReactSSR.renderToString(serverEntry)
    res.send(template.replace('<!-- app -->', appString))
  })
} else {
  const devStatic = require('./utils/dev-static.js')
  devStatic(app)
}
app.listen(3333, () => {
  console.log('server is listening on 3333')
})
