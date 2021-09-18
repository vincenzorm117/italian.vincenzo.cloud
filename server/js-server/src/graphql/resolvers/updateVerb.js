const { connection } = require('../../mysql/connection')
const { verbFields } = require('../../core/verbs')
const { isEmpty } = require('lodash')

module.exports = (gqlArgs, req, gqlParams) =>
    new Promise((resolve, reject) => {
        // Update Verb

        // [Step] Check fields that require updating
        let invalidFields = Object.keys(gqlArgs.verb).filter(
            f => !verbFields.has(f)
        )
        if (!isEmpty(invalidFields)) {
            return reject(
                new Error(`invalid fields: ${invalidFields.join(', ')}`)
            )
        }

        // [Step] Check fields from return result
        const { selections } = gqlParams.fieldNodes[0].selectionSet
        const sqlFields = selections.map(s => s.name.value)

        invalidFields = sqlFields.filter(f => !verbFields.has(f))
        if (!isEmpty(invalidFields)) {
            throw new Error(`invalid fields: ${invalidFields.join(', ')}`)
        }

        // [Step] Prep query and arguments
        const updateFieldKeys = []
        const updateFieldValues = []
        for (const [key, value] of Object.entries(gqlArgs.verb)) {
            if (key !== 'id') {
                updateFieldKeys.push(key)
                updateFieldValues.push(value)
            }
        }

        const querySetClause = updateFieldKeys.map(x => `${x} = ?`).join(',')
        const updateQuery = `UPDATE Verbs SET ${querySetClause} where id = ?;`
        const updateSqlParams = updateFieldValues.concat(gqlArgs.verb.id)

        connection
            .query(updateQuery, updateSqlParams, (error, results, fields) => {
                console.log(error, results, fields)

                // [Step] Construct query
                let selectQuery = `SELECT ${sqlFields.join(', ')} FROM Verbs`
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
