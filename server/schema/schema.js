const graphql = require('graphql')
    ,   { 
            GraphQLObjectType, 
            GraphQLString, 
            GraphQLSchema,
            GraphQLID
        } = graphql
    ,   _ = require('lodash')
    ,   AuthorType = require('./author/author')
    ,   ArticleType = require('./article/article')

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

const authors = [
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
        },
        author: { 
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, {
                    id: args.id
                })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})