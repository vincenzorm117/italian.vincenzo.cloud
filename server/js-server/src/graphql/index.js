const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const fs = require('fs')
const path = require('path')
const resolvers = require('./resolvers/_index')

const schemaFileContent = fs
    .readFileSync(path.resolve(__dirname, './type-definitions.gql'))
    .toString()

const schema = buildSchema(schemaFileContent)

module.exports = graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
})
