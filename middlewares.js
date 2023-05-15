require('dotenv').config({ path: './.env.local' })
const fs = require('fs')

function makeCopy() {
  const jsonString = fs.readFileSync(process.env.JSON_DB_PATH, 'utf8')

  fs.writeFileSync(
    `${process.env.JSON_DB_PATH.replace('.json', '_copy.json')}`,
    jsonString
  )
}

module.exports = (req, res, next) => {
  // const entriesQuery = Object.entries(req.query)
  // const hasNull = entriesQuery.some(([_, value]) => value === 'null')
  // const stepTasks = req.url === '/steptasks?dashboard=true'

  if (
    req.method === 'DELETE' ||
    req.method === 'PATCH' ||
    req.method === 'PUT'
  ) {
    makeCopy()
  }

  next()
}
