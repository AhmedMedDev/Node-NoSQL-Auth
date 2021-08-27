const jwt = require('jsonwebtoken')

class jwtServiceProvider
{
    /**
     * Generate token 
     * 
     * @param {*} payload 
     * @returns Access Token
     */
    static generateAccessToken (payload) 
    {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
    }

    /**
     * Respones with token 
     * 
     * @param {*} accessToken 
     * @param {*} userInfo 
     * @param {*} res 
     * @returns 
     */
    static respondWithToken (accessToken, userInfo, res)
    {
        return res.status(200).json({
            success : true,
            token: accessToken,
            token_type: 'bearer',
            expires_in: '30m',
            user : userInfo
        })
    }

}

module.exports = jwtServiceProvider