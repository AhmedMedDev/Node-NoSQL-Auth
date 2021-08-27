require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`, 
{ useNewUrlParser: true } , (err)=> {

    if (err) throw err

    console.log('Database Connected Successfully...')
})

