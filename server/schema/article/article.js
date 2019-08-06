const graphql = require('graphql')
,   {
        GraphQLObjectType,
        GraphQLString,
        GraphQLID
    } = graphql
,   AuthorType = require('../author/author')
,   _ = require('lodash')
,   authors = [
    {
        id: '1',
        name: 'Joe Doe',
        title: 'PhD in Physics'
    },
    {
        id: '2',
        name: 'Mark Gwen',
        title: 'PhD in Computer Science and Engineering',
    },
    {
        id: '3',
        name: 'Angela Blade',
        title: 'PhD in Microbiology'
    }
]

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