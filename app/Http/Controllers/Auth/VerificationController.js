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
            let user = await User.find({
                verify_code : req.params.verification_code
            })

            // - - - Not Found Response
            if (!user[0]) return ResponseServiceProvider
                                .notFoundResource(res)
            
            // Make sure That he hasn't been verified before
            if (user[0].email_verified_at) {
                
                return res.status(200).json({
                    success : true,
                    payload : 'Your email has already been verified before'
                })
            }

            // Confirm the user's email
            User.updateOne(
                { _id: user[0].id},
                { $set: {
                    email_verified_at : new Date()
                }}
            )

            return res.status(200).json({
                success : true,
                payload : "Your account has been verified"
            })

        } catch (error) {
            return ResponseServiceProvider.serverError(res, error)
        }
    }
}

module.exports = new VerificationController