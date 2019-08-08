const express = require('express')
const app = express()
const graphqlHTTP = require('express-graphql')
const schema = require('./src/schema/schema')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/scidepo', { useNewUrlParser: true })

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(3000, () => {
    console.log('SciDepo API is running on port 3000')
})