import express from 'express'
const bodyParser = require('body-parser')
const cookeParser = require('cookie-parser')
const models = require('./model')
const Chat = models.getModel('chat')
const app = express()
const path = require('path')
import React from 'react'
import csshook from 'css-modules-require-hook/preset' // import hook before routes
import assethook from 'asset-require-hook'
import staticPath from '../build/asset-manifest.json'


assethook({
    extensions:['png']
})
import { renderToString } from 'react-dom/server'
// work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import { StaticRouter } from 'react-router-dom'

import reducers from '../src/reducer'
import App from '../src/app'
io.on('connection', function (socket) {
    //socket  当前请求连接
    console.log('user login')
    socket.on('sendmsg', function (data) {
        
        const {from, to, msg} = data;
        const chatid = [from,to].sort().join('_')
        Chat.create({chatid,from,to,content:msg}, function (err,doc) {

            io.emit('recvmsg', Object.assign({},doc._doc))
        })
        
        // console.log(data)
        // io.emit('recvmsg', data)
    })
})

const userRouter = require('./user')



app.use(cookeParser())
app.use(bodyParser.json())

app.use('/user',userRouter)
app.use(function (req,res,next) {
    if(req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
        return next()
    }
    const store = createStore(reducers, compose(
        applyMiddleware(thunk)
    ))
    let context = {}
    const markup = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <App></App>
            </StaticRouter>
        </Provider>
    )
    const obj = {
        '/msg': 'React聊天消息列表'
    }
    const pageHtml = `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <meta name="theme-color" content="#000000">
                <title>React App</title>
                <link rel="stylesheet" href="/${staticPath['main.css']}" />
              </head>
              <body>
                <noscript>
                  You need to enable JavaScript to run this app.
                </noscript>
                <div id="root">${markup}</div>
                <script src="/${staticPath['main.js']}"></script>
              </body>
            </html>
        `

    res.send(pageHtml)
})
app.use('/',express.static(path.resolve('build')))
server.listen(9093,function () {
    console.log('Node app start at port 9093')
})