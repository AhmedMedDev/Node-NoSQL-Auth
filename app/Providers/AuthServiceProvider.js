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
        const {email, password} = data

        const user = await User.findOne({email})

        if (!user) return {auth: false}

        // Make sure password is correct 
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return {auth: false}

        return {auth: true, user: user}
    }

    /**
     * Handling Register Operation 
     * 
     * @param {*} data 
     * @returns 
     */
    static async register (data)
    {
        let {name, email, password, avatar} = data

        // Generate Verification Code
        const verify_code = Math.floor(Math.random() * 999999) + 100000;

        // Hash Password
        password = await bcrypt.hash(password, 10)

        // Create a new user
        return User.create({name, email, password, avatar, verify_code})
    }

    /**
     * Inject User data in payload
     * 
     * @param {*} data 
     * @returns 
     */
    static generatePayload (data)
    {
        const { isAdmin, id } = data.user

        let payload = { data: { user_id: id } }

        if (isAdmin) 
            payload.data.role 
            = process.env.ADMIN_ROLE

        return payload;
    }
}

module.exports = AuthServiceProvider