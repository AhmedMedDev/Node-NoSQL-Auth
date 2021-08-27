module.exports = {

    optionalImage (data)
    {
        return (data.files) 
        ? (data.files.img && 
            (data.files.img.mimetype == "image/jpeg" || 
            data.files.img.mimetype == "image/png"  || 
            data.files.img.mimetype == "image/gif"  )) 
        : true
    }
}