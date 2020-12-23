const mongoose = require('mongoose')

const mainSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    specializations: {type: String, required: true},
    phone: String, 
    email: String,
    time: String, 
    image: String,
})

const Main = mongoose.model('Main', mainSchema)

module.exports = Main