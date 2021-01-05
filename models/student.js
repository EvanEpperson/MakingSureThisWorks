const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    specializations: {type: String, required: true},
    phone: String,
    email: String,                
    time: String, 
    image: String,
    imageupload: {data: Buffer, contentType: String},
    imagea: String,
    imageb: String,
    linkedin: String,
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student


