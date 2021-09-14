const User = require("../../../Models/User")

class MeController
{
    /**
     * Get the authenticated User.
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns Payload information
     */
    async me (req, res)
    {
        const user = await User.findById(req.payload.data.user_id)

        return res.status(200).json({
            success : true,
            payload: {
                id:     user.id,
                name:   user.name,
                email:  user.email,
                avatar: user.avatar,
            },
        })
    }

}

module.exports = new MeController