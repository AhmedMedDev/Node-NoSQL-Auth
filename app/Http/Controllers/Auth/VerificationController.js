const User = require("../../../Models/User")
const ResponseServiceProvider = require("../../../Providers/ResponseServiceProvider")

class VerificationController 
{
    /**
     * Email Verification 
     * Find user by verification_code
     * - - - Not Found if Not Exist
     * Make sure That he hasn't been verified before
     * Confirm the user's email
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async emailVerification (req, res) 
    {
        try {

            // Find user by verification_code
            let user = await User.findOne({
                verify_code : req.params.verification_code
            })

            if (!user) throw new Error("Verification code is not Correct") 
            
            // Make sure That he hasn't been verified before
            if (user.email_verified_at) 
                    throw new Error("Your email has already been verified before")

            // Confirm the user's email
            await User.updateOne(
            { _id: user.id},
            { $set: { email_verified_at : new Date() }})

            return res.status(200).json({
                success : true,
                payload : "Your account has been verified"
            })

        } catch (error) {
            return ResponseServiceProvider.badRequest(res, error.message)
        }
    }
}

module.exports = new VerificationController