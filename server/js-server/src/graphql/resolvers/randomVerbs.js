const mysql = require('../../mysql/connection')
const { verbFields } = require('../../core/verbs')
const { isEmpty } = require('lodash')

module.exports = (gqlArgs, req, gqlParams) =>
    new Promise(async (resolve, reject) => {
        // [Step] Get total
        const [{ total }] = await mysql.query(
            'SELECT COUNT(*) as total FROM Verbs',
            []
        )

        // [Step] Extract fields from the field verbs
        const { selections } = gqlParams.fieldNodes[0].selectionSet

        // If no fields are selected return an empty array
        if (
            !selections ||
            !Array.isArray(selections) ||
            selections.length < 1
        ) {
            return resolve([])
        }

        const sqlFields = selections.map(s => s.name.value)

        const invalidFields = sqlFields.filter(f => !verbFields.has(f))
        if (!isEmpty(invalidFields)) {
            throw new Error(`invalid fields: ${invalidFields.join(', ')}`)
        }

        // [Step] Construct query
        let query = `SELECT ${sqlFields.join(', ')} FROM Verbs`
        const sqlParams = []

        // [Step] Grab count to add to query
        var count = parseInt(gqlArgs?.count)

        if (isNaN(count) || count < 1) {
            count = 5
        }

        for (let i = 0; i < count; i++) {
            sqlParams.push(Math.ceil(Math.random() * total))
        }
        query += ` WHERE id IN (${Array(count).fill('?').join(', ')})`

        // [Step] Execute query
        try {
            const verbs = await mysql.query(query, sqlParams)
            resolve(verbs)
        } catch (error) {
            reject(error)
        }
    })
