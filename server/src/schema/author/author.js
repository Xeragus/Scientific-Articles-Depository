const graphql = require('graphql')
,   {
        GraphQLObjectType,
        GraphQLString,
        GraphQLID,
        GraphQLList
    } = graphql
,   ArticleType = require('../article/article')

module.exports = new GraphQLObjectType({
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