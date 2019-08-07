const graphql = require('graphql')
    ,   { 
            GraphQLObjectType, 
            GraphQLString, 
            GraphQLSchema,
            GraphQLID,
            GraphQLList
        } = graphql
    ,   _ = require('lodash')
    // ,   AuthorType = require('./author/author')
    // ,   ArticleType = require('./article/article')

const articles = [
    {
        name: 'Quantum mechanics in the field of thermoenergy',
        field: 'Physics',
        id: '1',
        author_id: '2'
    },
    {
        name: 'Implementing graph-like structures in algorithms',
        field: 'Software Engineering',
        id: '2',
        author_id: '1'
    },
    {
        name: 'Photosyntesis in the early pilo stage',
        field: 'Biology',
        id: '3',
        author_id: '3'
    },
    {
        name: 'Development of pre-frontal cortex',
        field: 'Biology',
        id: '3',
        author_id: '3'
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

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        title: { type: GraphQLString },
        articles: {
            type: new GraphQLList(ArticleType),
            resolve(parent, args) {
                return _.filter(articles, { author_id: parent.id })
            }
        }
    })
})

const ArticleType = new GraphQLObjectType({
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
        articles: {
            type: new GraphQLList(ArticleType),
            resolve(parent, args) {
                return articles
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
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})