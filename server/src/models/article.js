const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    name: String,
    field: String,
    author_id: String
})

module.exports = mongoose.model('Article', articleSchema)