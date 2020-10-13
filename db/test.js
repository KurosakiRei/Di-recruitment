const userModel = require('./userModel')
const md5 = require('blueimp-md5')

userModel.findOne({ username: 'Kurosakirei' }, (err, doc) => {
    if (err) {
        console.log(err)
    } else {
        if (doc === null) {
            console.log('There is no match data in the database')
        } else {
            console.log(doc)
        }
    }

})