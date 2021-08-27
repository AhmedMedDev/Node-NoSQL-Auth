
module.exports = {
    saveFile (path, file) 
    {
        let today = new Date();
        let date = today.getFullYear()+';'+(today.getMonth()+1)+';'+today.getDate();
        let time = today.getHours() + "," + today.getMinutes() + "," + today.getSeconds();
        let dateTime = `${date}${time}`;

        let filename = `${dateTime}${file.name}`

        file.mv(`./public/uploads/${path}/${filename}`);

        return filename;
    }
};