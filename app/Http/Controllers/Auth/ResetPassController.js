const ResetPassword = require("../../../Models/ResetPassword");
const User = require("../../../Models/User");
const ResetPassObserver = require("../../../Observers/ResetPassObserver");
const bcrypt = require('bcryptjs')
const ResponseServiceProvider = require("../../../Providers/ResponseServiceProvider");


class ResetPassController
{
    /**
     * Handling some operation before reset password 
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async preResetPassword (req, res)  
    {
        try {
            
            // Make sure this email is valid
            let user = await User.find({
                email: req.body.email
            }) 

            if (!user[0])
                return ResponseServiceProvider.notFoundResource(res)
    
            // Create Pincode 
            let pincode = Math.floor(Math.random() * 999999) + 100000;
    
            // Store pincode 
            ResetPassword.create({
                email: user[0].email,
                pincode
            })

            // Inject Observer 
            ResetPassObserver.preResetPassword({user, pincode})

            return res.status(200).json({
                success : true,
                payload : "Check Your Email"
            })

        } catch (error) {
            return ResponseServiceProvider.serverError(res, error)
        }
    }

    /**
     * Make sure pincode is correct 
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async confirmPincode (req, res)
    {
        try {

            // Make sure this pincode is valid
            let resetpassRow = await ResetPassword.find({
                pincode: req.body.pincode
            })

            if (!resetpassRow[0]) 
                return ResponseServiceProvider.notFoundResource(res)

            return res.status(200).json({
                success : true,
                payload : "Proceed to the next process"
            })

        } catch (error) {
            return ResponseServiceProvider.serverError(res, error)
        }
    }

    /**
     * Reset Password 
     * Make sure pincode is correct 
     * update password
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async resetPassword (req, res)
    {
        try {

            // Make sure this pincode is valid
            let resetpassRow = await ResetPassword.find({
                pincode: req.body.pincode
            })

            if (!resetpassRow[0]) 
                return ResponseServiceProvider.notFoundResource(res)


            // Hash Password
            const password = await bcrypt.hash(req.body.newPassword, 10)

            // Change password  
            await User.updateOne(
                { email: resetpassRow[0].email},
                { $set: { password }})

            // Inject Observer 
            ResetPassObserver.resetPassword({
                email: resetpassRow[0].email
            })

            return res.status(200).json({success : true})

        } catch (error) {
            return ResponseServiceProvider.serverError(res, error)
        }
    }
}

module.exports = new ResetPassController