const { Pool } = require('pg')
const { postgres } = require('../config')

let dbClient
let dbReleaseCallback

const pool = new Pool(postgres)

process.on('exit', () => {
  console.log('closing database connection')
  // Docs: https://node-postgres.com/api/pool#releaseCallback
  if (dbClient) dbClient.release(dbReleaseCallback)
  pool.end()
})

exports.init = (callback) => {
  if (dbClient) return callback(null, dbClient)

  pool.connect((err, client, release) => {
    if (err) return callback(err)

    dbClient = client
    dbReleaseCallback = release
    callback(null, dbClient)
  })
}

exports.query = (query) => {
  return new Promise((resolve, reject) => {
    if (!dbClient) return reject(new Error('DB is not initialized'))

    pool.query(query, (err, res) => {
      if (err) return reject(err)
      resolve(res)
    })
  })
}

