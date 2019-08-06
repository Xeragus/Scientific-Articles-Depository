const graphql = require('graphql')
, {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} = graphql


module.exports = new GraphQLObjectType({
    name: 'Article',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        field: { type: GraphQLString }
    })
})