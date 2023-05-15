const jsonServer = require('json-server')
require('dotenv').config({ path: './.env.local' })
const myMiddlewares = require('./middlewares.js')

if (process.env.JSON_DB_PATH) {
  const server = jsonServer.create()
  const router = jsonServer.router(process.env.JSON_DB_PATH)
  const middlewares = jsonServer.defaults()

  server.use(middlewares)
  server.use(myMiddlewares)
  server.use(router)
  server.listen(process.env.BACK_PORT || 4000, () => {
    console.log('JSON Server is running on port 4011')
  })
}
