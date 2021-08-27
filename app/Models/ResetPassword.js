const mongoose = require('mongoose')

const resetPasswordSchema = new mongoose.Schema({
    pincode: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
    }
})


module.exports = mongoose.model('ResetPassword', resetPasswordSchema , 'reset_passwords')