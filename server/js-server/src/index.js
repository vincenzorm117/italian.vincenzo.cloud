const { connection } = require('./mysql')

const app = require('express')()

app.use(require('cors')())

connection.connect()

app.use('/graphql', require('./graphql'))

app.listen(process.env.SERVER_PORT, () => {
    console.log(
        `Now browse to http://localhost:${process.env.SERVER_PORT}/graphql`
    )
}).on('close', () => {
    connection.end()
})
