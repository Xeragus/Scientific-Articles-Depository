const graphql = require('graphql')
,   {
        GraphQLObjectType,
        GraphQLString,
        GraphQLID
    } = graphql
,   AuthorType = require('../author/author')
,   _ = require('lodash')

module.exports = new GraphQLObjectType({
    name: 'Article',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        field: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.author_id })
            }
        }
    })
})