const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false,
        default: "uploads/users/avatar/default.png"
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    },
    verify_code: {
        type: String,
        required: true
    },
    email_verified_at: {
        type: Date,
        required: false
    }
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema, 'users')