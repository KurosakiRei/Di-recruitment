var express = require('express');
var cookieParser = require('cookie-parser');
const md5 = require('blueimp-md5')

const userModel = require('./db/userModel')

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const filter = { password: 0, __v: 0 }

app.post('/register', (req, res) => {
    const { username, password, userType } = req.body

    new userModel({ username, password: md5(password), userType }).save((err, data) => {
        if (err) {
            res.send({
                code: 1,
                msg: err
            })
        } else {
            res.cookie('userid', data._id, { maxAge: 1000 * 60 * 60 * 24 * 7 })
            res.send({
                code: 0,
                data: {
                    _id: data._id,
                    username,
                    userType
                }
            })
        }
    })

})

app.post('/login', (req, res) => {
    const { username, password } = req.body

    userModel.findOne({ username, password: md5(password) }, filter, (err, data) => {
        if (!data) {
            res.send({
                code: 1,
                msg: 'The username or password is incorrect'
            })
        } else {
            res.cookie('userid', data._id, { maxAge: 1000 * 60 * 60 * 24 * 7 })
            res.send({
                code: 0,
                data
            })

        }
    })

})

module.exports = app;