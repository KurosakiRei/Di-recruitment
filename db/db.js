const mongoose = require('mongoose')

mongoose.connect('mongodb://192.168.74.131:27017/direcruitment', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

mongoose.connection.on('connected', () => {
    console.log('The database has connected successfully...')
})

module.exports = mongoose