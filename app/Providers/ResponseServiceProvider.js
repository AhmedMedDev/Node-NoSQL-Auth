const Cache = require("../../config/cache")

class ResponseServiceProvider
{
    /** 
     * Resource is't exist 
     * 
     * @param {*} res 
     * @returns 
     */
    static notFoundResource (res) 
    {
        return res.status(404).json({
            success : false,
            payload : "Resource not found"
        })
    }

    /**
     * Server Error Response 
     * 
     * @param {*} res 
     * @param {*} err 
     * @returns 
     */
    static serverError (res,err) 
    {
        return res.status(500).json({
            success : false,
            payload : err
        })
    }

    /**
     * unauthorized Response 
     * 
     * @param {*} res 
     * @param {*} err 
     * @returns 
     */
    static unauthorized (res) 
    {
        return res.status(500).json({
            success : false,
            payload : "Unauthorized"
        })
    }

    /**
     * Cached Response 
     * 
     * @param {*} res 
     * @param {*} err 
     * @returns 
     */
    static cache (res, key) 
    {
        return res.status(200).json({
            success : true,
            payload : Cache.get(key)
        })
    }
}

module.exports = ResponseServiceProvider