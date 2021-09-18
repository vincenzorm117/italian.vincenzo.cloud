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

        // Extract fields from the field verbs
        const selections = gqlParams.fieldNodes[0].selectionSet.selections.find(
            s => s.name.value === 'verbs'
        )

        // If no fields are selected return an empty array
        if (!selections) {
            return resolve({ verbs: [], count: 0, offset: 0 })
        }

        // const { selections } =
        // gqlParams.fieldNodes[0].selectionSet?.selectionSet
        const sqlFields = selections.selectionSet.selections.map(
            s => s.name.value
        )

        const invalidFields = sqlFields.filter(f => !verbFields.has(f))
        if (!isEmpty(invalidFields)) {
            throw new Error(`invalid fields: ${invalidFields.join(', ')}`)
        }

        // [Step] Construct query
        let query = `SELECT ${sqlFields.join(', ')} FROM Verbs`
        const sqlParams = []

        if (gqlArgs.hasOwnProperty('infinitive')) {
            query += ' WHERE Infinitive like ?'
            sqlParams.push(`%${gqlArgs.infinitive}%`)
        }

        // [Step] Grab Step and count
        var count = null,
            offset = null

        if (gqlArgs.hasOwnProperty('count') && /-?\d+/.test(gqlArgs.count)) {
            count = parseInt(gqlArgs.count)
            if (isNaN(count) || count < 0) {
                throw new Error('Argument count must be a non-negative number.')
            }

            if (
                gqlArgs.hasOwnProperty('offset') &&
                /-?\d+/.test(gqlArgs.offset)
            ) {
                offset = parseInt(gqlArgs.offset)
                if (isNaN(offset) || offset < 0) {
                    throw new Error(
                        'Argument offset must be a non-negative number.'
                    )
                }
            }
        }

        if (count !== null && offset !== null) {
            query += ` LIMIT ${offset}, ${count}`
        } else if (count !== null) {
            query += ` LIMIT ${count}`
        }

        try {
            const verbs = await mysql.query(query, sqlParams)
            resolve({
                verbs,
                count: verbs.length,
                total,
                offset,
            })
        } catch (error) {
            reject(error)
        }
    })
