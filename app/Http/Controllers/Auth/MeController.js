
class MeController
{
    /**
     * Get the authenticated User.
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns Payload information
     */
    me (req, res)
    {
        return res.status(200).json({
            success : true,
            payload: req.payload.data,
        })
    }

}

module.exports = new MeController