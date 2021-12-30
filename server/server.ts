import path from 'path'
import express from 'express'
import http from 'http'

import 'dotenv/config'

import './aliases'

import 'database/database'

import middlewares from 'middlewares/middlewares'

import routes from 'routes/routes'

const app = express()
const server = http.createServer(app)

middlewares.initializeMiddlewares(app, server)

routes(app)

middlewares.errorHandler(app)

const buildPath = process.env.NODE_ENV === 'production' ? '../../client/build' : '../client/build'

app.use(express.static(path.resolve(__dirname, buildPath)))

app.get('*', (_, res) => res.sendFile(path.resolve(__dirname, buildPath, 'index.html')))

const port = process.env.PORT || 3001

server.listen(port, () => console.log(`The server has been started on port ${port}`))
