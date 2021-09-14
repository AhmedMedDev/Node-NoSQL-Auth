const { saveFile } = require("../../../Helpers/Fileupload");
const User = require("../../../Models/User");
const RegisterObserver = require("../../../Observers/RegisterObserver");
const AuthServiceProvider = require("../../../Providers/AuthServiceProvider");
const ResponseServiceProvider = require("../../../Providers/ResponseServiceProvider");


class RegisterController 
{
    /**
     * Register a new user
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async register (req, res) 
    {
        try {
            if (req.files)
            req.body.avatar = `uploads/users/avatar/${saveFile('users/avatar', req.files.avatar)}`

            const user = await AuthServiceProvider.register(req.body);

            req.body.userID = user.id
            req.body.verify_code = user.verify_code
            
            // Inject Observer 
            RegisterObserver.registered(req.body)

            return res.status(200).json({
                success : true,
                payload : "Check Your Email"
            })

        } catch (error) {
            return ResponseServiceProvider.serverError(res, error.message)
        }
    }
}

module.exports = new RegisterController