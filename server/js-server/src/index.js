const connection = require('./mysql/connection')

const app = require('express')()

connection.connect()

app.use('/graphql', require('./graphql'))

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql')).on(
    'close',
    () => connection.end()
)
