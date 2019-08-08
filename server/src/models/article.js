const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    name: String,
    field: String,
    authorId: String
})

module.exports = mongoose.model('Article', articleSchema)