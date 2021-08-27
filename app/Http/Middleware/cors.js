class CORS
{
    static handle(req, res, next) {

        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods", "*")
        res.header("Access-Control-Allow-Headers", 
        "Origin, X-Reuested-With, Content-Type, Accept", "Authorization")
        
        next()
    }
}