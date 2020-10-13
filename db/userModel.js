const mongoose = require('./db')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    userType: {
        type: String,
        required: true,
        enum: ['seeker', 'recruiter']
    },
    avatar: {
        type: String
    },
    position: {
        type: String
    },
    info: {
        type: String
    },
    company: {
        type: String
    },
    salary: {
        type: String
    }
})

module.exports = mongoose.model('user', userSchema)