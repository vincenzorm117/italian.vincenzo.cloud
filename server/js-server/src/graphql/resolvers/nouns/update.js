const { connection } = require('../../../mysql')

module.exports = (gqlArgs, req, gqlParams) =>
    new Promise((resolve, reject) => {
        // Update Verb

        // [Step] Check fields from return result
        const { selections } = gqlParams.fieldNodes[0].selectionSet
        const sqlFields = selections.map(s => s.name.value)

        // [Step] Prep query and arguments
        const updateFieldKeys = []
        const updateFieldValues = []
        for (const [key, value] of Object.entries(gqlArgs.noun)) {
            if (key !== 'id') {
                updateFieldKeys.push(key)
                updateFieldValues.push(value)
            }
        }

        const querySetClause = updateFieldKeys.map(x => `${x} = ?`).join(',')
        const updateQuery = `UPDATE Nouns SET ${querySetClause} where id = ?;`
        const updateSqlParams = updateFieldValues.concat(gqlArgs.verb.id)

        connection
            .query(updateQuery, updateSqlParams, (error, results, fields) => {
                console.log(error, results, fields)

                // [Step] Construct query
                let selectQuery = `SELECT ${sqlFields.join(', ')} FROM Nouns`
                const sqlParams = []

                selectQuery += ' WHERE id = ?'
                sqlParams.push(gqlArgs.verb.id)

                selectQuery += ' LIMIT 1'

                // connection.connect()

                connection
                    .query(
                        selectQuery,
                        sqlParams,
                        function (error, results, fields) {
                            resolve(results[0])
                        }
                    )
                    .on('error', error => {
                        reject(error)
                    })

                // connection.end()
            })
            .on('error', error => {
                reject(error)
            })
    })
