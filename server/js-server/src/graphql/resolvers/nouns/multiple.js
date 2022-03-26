const mysql = require('../../../mysql')

module.exports = (gqlArgs, req, gqlParams) =>
    new Promise(async (resolve, reject) => {
        // [Step] Get total
        const [{ total }] = await mysql.query(
            'SELECT COUNT(*) as total FROM Nouns',
            []
        )

        // Extract Noun fields
        const selections = gqlParams.fieldNodes[0].selectionSet.selections.find(
            s => s.name.value === 'list'
        )

        const sqlFields = selections.selectionSet.selections.map(
            s => s.name.value
        )

        // [Step] Construct query
        let query = `SELECT ${sqlFields.join(', ')} FROM Nouns`
        const sqlParams = []

        if (gqlArgs.hasOwnProperty('term')) {
            query += ` WHERE English_Singular LIKE ? OR English_Plural LIKE ? OR Italian_Singular LIKE ? OR Italian_Plural LIKE ?`

            sqlParams.push(
                `%${gqlArgs.term}%`,
                `%${gqlArgs.term}%`,
                `%${gqlArgs.term}%`,
                `%${gqlArgs.term}%`
            )
        }

        // [Step] Grab Step and count
        var count = parseInt(gqlArgs?.count)
        var offset = parseInt(gqlArgs?.offset)

        if (isNaN(count) || count < 0) {
            count = null
        }

        if (isNaN(offset) || offset < 0) {
            offset = 0
        }

        if (count !== null && offset !== null) {
            query += ` LIMIT ${offset}, ${count}`
        } else if (count !== null) {
            query += ` LIMIT ${count}`
        }

        // [Step] Execute query
        try {
            const list = await mysql.query(query, sqlParams)
            resolve({
                list,
                count: list.length,
                total,
                offset,
            })
        } catch (error) {
            reject(error)
        }
    })
