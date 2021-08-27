const jwtServiceProvider = require("../../../Providers/jWTServiceProvider")

class RefreshController
{
    /**
     * Generate a new token 
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    refresh (req, res)
    {
        const accessToken = jwtServiceProvider.generateAccessToken(req.payload.data)

        return jwtServiceProvider.respondWithToken(accessToken, req.payload.data, res)
    }

}

module.exports = new RefreshController