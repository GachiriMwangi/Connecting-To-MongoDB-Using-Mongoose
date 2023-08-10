const {Schema, model} = require('mongoose')

const membersSchema = new Schema({
    name: {
        type: String, 
        required: [true, 'Please insert a name.']
    }, 
    email: {
        type: String, 
        required: [true, 'Please insert an email.']
    }, 
    status: {
        type: String, 
        required: false
    }
})

module.exports = model('members', membersSchema)