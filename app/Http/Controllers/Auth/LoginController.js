const AuthServiceProvider = require("../../../Providers/AuthServiceProvider");
const jwtServiceProvider = require("../../../Providers/jWTServiceProvider");
const ResponseServiceProvider = require("../../../Providers/ResponseServiceProvider");

class LoginController
{
    /**
     * Login :
     * - - Check credentials
     * - - Inject User data in payload
     * - - Generate token 
     * - - Response with token  
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async login (req, res) 
    {
        try {
            // Check Credentials
            const provider = await AuthServiceProvider.attempt(req.body)

            if (!provider.auth) return ResponseServiceProvider.unauthorized(res)

            // Generate Payload 
            const payload = AuthServiceProvider.generatePayload (provider)

            // Generate Token 
            const accessToken = jwtServiceProvider.generateAccessToken(payload)

            return jwtServiceProvider.respondWithToken(accessToken, provider.user, res)

        } catch (error) {
            return ResponseServiceProvider.serverError(res, error.message)
        }
    }
}

module.exports = new LoginController