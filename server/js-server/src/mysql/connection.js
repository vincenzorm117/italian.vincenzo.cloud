const mysql = require('mysql')

const connection = mysql.createConnection({
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DB,
})

const query = (query, params = undefined) =>
    new Promise((resolve, reject) => {
        if (typeof query !== 'string' || query.length <= 0) {
            reject(new Error('Query must not be empty.'))
        } else {
            connection
                .query(query, params, (error, results, fields) => {
                    if (error !== null) {
                        return reject(error)
                    }
                    return resolve(results)
                })
                .on('error', error => reject(error))
        }
    })

exports.connection = connection
exports.query = query
