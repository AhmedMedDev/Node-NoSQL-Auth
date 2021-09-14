require('dotenv').config();

const jwt = require('jsonwebtoken');
const ResponseServiceProvider = require('../../Providers/ResponseServiceProvider');

class AuthenticateToken
{
    static handle(req, res, next) {

        try {
            const authHeader = req.headers['authorization']
    
            const token = authHeader && authHeader.split(' ')[1]

            const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
            req['payload'] = payload
    
            next()
    
        } catch (err) {
            return ResponseServiceProvider.unauthenticated (res) 
        }
    }
}

module.exports = AuthenticateToken