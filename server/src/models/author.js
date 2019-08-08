const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: String,
    title: String
})

module.exports = mongoose.model('Author', authorSchema)