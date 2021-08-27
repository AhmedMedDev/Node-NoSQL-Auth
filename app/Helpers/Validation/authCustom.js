const User = require("../../Models/User");

module.exports = {

    isExistEmail (email) 
    {
        return User
        .find({email})
        .then( response => {
            if (response[0]) return Promise
                .reject('E-mail already in use');
        })
    }
}