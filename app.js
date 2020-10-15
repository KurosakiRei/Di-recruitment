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

    // Add the data into the database
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

    // Check if there is matching data in the database
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

app.post('/update', (req, res) => {
    const { userid } = req.cookies
    if (!userid) {
        res.send({ code: 1, msg: 'Please login first' })
    } else {
        userModel.findByIdAndUpdate({ _id: userid }, req.body, filter, (err, data) => {
            const { _id, username, userType } = data
            if (err) {
                res.send({ code: 1, msg: err })
            } else {
                res.send({ code: 0, data: Object.assign(req.body, { _id, username, userType }) })
            }
        })
    }

})

app.get('/user', (req, res) => {
    const { userid } = req.cookies
    if (!userid) {
        res.send({ code: 1, msg: 'Please login first' })
    } else {
        userModel.findById({ _id: userid }, filter, (err, data) => {
            if (err) {
                res.send({ code: 1, msg: err })
            } else {
                res.send({ code: 0, data })
            }
        })
    }
})



module.exports = app;