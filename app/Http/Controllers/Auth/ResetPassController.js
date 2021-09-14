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
    async createPincode (req, res)  
    {
        try {
            
            // Make sure this email is valid
            const user = await User.findOne({
                email: req.body.email
            }) 

            // Get Email
            const email = user.email

            // Create Pincode 
            const pincode = Math.floor(Math.random() * 999999) + 100000;
    
            // Store pincode 
            ResetPassword.create({email, pincode})

            // Inject Observer 
            ResetPassObserver.createPincode({user, pincode})

            return res.status(200).json({
                success : true,
                payload : "Check Your Email"
            })

        } catch (error) {
            return ResponseServiceProvider.unauthenticated(res)
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
            let resetpassRow = await ResetPassword.findOne({
                pincode: req.body.pincode
            })

            return (resetpassRow)
            ? res.status(200).json({
                success : true,
                payload : "Proceed to the next process"
             })
            : ResponseServiceProvider.unauthenticated(res)

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
            let resetpassRow = await ResetPassword.findOne({
                pincode: req.body.pincode
            })

            // GEt Email
            const email = resetpassRow.email

            // Hash Password
            const password = await bcrypt.hash(req.body.newPassword, 10)

            // Change password  
            await User.updateOne(
            { email}, {$set: { password }})

            // Inject Observer 
            ResetPassObserver.resetPassword({email})

            return res.status(200).json({success: true})

        } catch (error) {
            return ResponseServiceProvider.unauthenticated(res)
        }
    }
}

module.exports = new ResetPassController