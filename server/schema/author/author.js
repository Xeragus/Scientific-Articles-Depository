const graphql = require('graphql')
, {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} = graphql

module.exports = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        title: { type: GraphQLString }
    })
})