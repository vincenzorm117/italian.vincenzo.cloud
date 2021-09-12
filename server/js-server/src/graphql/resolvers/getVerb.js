const connection = require('../../mysql/connection')
const { verbFields } = require('../../core/verbs')
const { isEmpty } = require('lodash')

module.exports = (gqlArgs, req, gqlParams) =>
    new Promise((resolve, reject) => {
        const { selections } = gqlParams.fieldNodes[0].selectionSet
        const sqlFields = selections.map(s => s.name.value)

        const invalidFields = sqlFields.filter(f => !verbFields.has(f))
        if (!isEmpty(invalidFields)) {
            throw new Error(`invalid fields: ${invalidFields.join(', ')}`)
        }

        // [Step] Construct query
        let query = `SELECT ${sqlFields.join(', ')} FROM Verbs`
        const sqlParams = []

        if (gqlArgs.hasOwnProperty('id')) {
            query += ' WHERE id = ?'
            sqlParams.push(gqlArgs.id)
        } else if (gqlArgs.hasOwnProperty('infinitive')) {
            query += ' WHERE Infinitive = ?'
            sqlParams.push(gqlArgs.infinitive)
        }

        query += ' LIMIT 1'

        // connection.connect()

        connection
            .query(query, sqlParams, function (error, results, fields) {
                resolve(results[0])
            })
            .on('error', error => {
                reject(error)
            })

        // connection.end()
    })
