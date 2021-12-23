import path from 'path'

import dotenv from 'dotenv'
const envPath = process.env.NODE_ENV === 'production' ? '../../.env' : '../.env'
dotenv.config({ path: path.resolve(__dirname, envPath) })

import express from 'express'
import http from 'http'

import 'database/database'

import middlewares from 'middlewares'

import routes from 'routes/routes'

const app = express()
const server = http.createServer(app)

middlewares.init(app, server)

routes(app)

middlewares.errorHandler(app)

const buildPath = process.env.NODE_ENV === 'production' ? '../../build' : '../build'

app.use(express.static(path.resolve(__dirname, buildPath)))

app.get('*', (_, res) => res.sendFile(path.resolve(__dirname, buildPath, 'index.html')))

const port = process.env.PORT || 3001

server.listen(port, () => console.log(`The server has been started on port ${port}`))
