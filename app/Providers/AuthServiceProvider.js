const User = require("../Models/User")

const bcrypt = require('bcryptjs')

class AuthServiceProvider
{
    /**
     * Check credintionals 
     * 
     * @param {*} data 
     * @returns 
     */
    static async attempt (data)
    {
        // Make sure Email is correct 
        let {email, password} = data

        let user = await User.find({email})

        if (!user[0]) return { auth: false }

        // Make sure password is correct 
        let isMatch = await bcrypt.compare(password, user[0].password);

        if (!isMatch) return { auth: false }

        return {auth: true, user: user[0]}
    }

    /**
     * Handling Register Operation 
     * 
     * @param {*} data 
     * @returns 
     */
    static async register (data)
    {
        let {name, email, password, img} = data

        // Generate Verification Code
        let verify_code = Math.floor(Math.random() * 999999) + 100000;

        // Hash Password
        password = await bcrypt.hash(password, 10)

        // Create a new user
        return User.create({name, email, password, img, verify_code})
    }
}

module.exports = AuthServiceProvider