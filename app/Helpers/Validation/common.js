module.exports = {

    optionalImage (data)
    {
        return (data.files) 
        ? (data.files.avatar && 
            (data.files.avatar.mimetype == "image/jpeg" || 
             data.files.avatar.mimetype == "image/png"  || 
             data.files.avatar.mimetype == "image/gif"  )) 
        : true
    }
}