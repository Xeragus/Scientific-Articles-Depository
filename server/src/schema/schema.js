const graphql = require('graphql')
,   { 
        GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema,
        GraphQLID,
        GraphQLList,
        GraphQLInt
    } = graphql
,   _ = require('lodash')
,   Article = require('../models/article')
,   Author = require('../models/author')


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

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                title: { type: GraphQLString }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    title: args.title
                })
                return author.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})