const graphql = require('graphql')
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID
    } = graphql
const _ = require('lodash')

const articles = [
    {
        name: 'Quantum mechanics in the field of thermoenergy',
        field: 'Physics',
        id: '1'
    },
    {
        name: 'Implementing graph-like structures in algorithms',
        field: 'Software Engineering',
        id: '2'
    },
    {
        name: 'Photosyntesis in the early pilo stage',
        field: 'Biology',
        id: '3'
    },
]

const ArticleType = new GraphQLObjectType({
    name: 'Article',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        field: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        article: {
            type: ArticleType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(articles, {
                    id: args.id
                })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})