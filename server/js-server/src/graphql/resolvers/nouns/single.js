const { connection } = require('../../../mysql')

module.exports = (gqlArgs, req, gqlParams) =>
    new Promise((resolve, reject) => {
        const { selections } = gqlParams.fieldNodes[0].selectionSet
        const sqlFields = selections.map(s => s.name.value)

        // [Step] Construct query
        let query = `SELECT ${sqlFields.join(', ')} FROM Nouns`
        const sqlParams = []

        if (gqlArgs.hasOwnProperty('id')) {
            query += ' WHERE id = ?'
            sqlParams.push(gqlArgs.id)
        }

        query += ' LIMIT 1'

        connection
            .query(query, sqlParams, function (error, results, fields) {
                resolve(results[0])
            })
            .on('error', error => {
                reject(error)
            })
    })
