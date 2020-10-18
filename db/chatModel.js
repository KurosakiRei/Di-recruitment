const mongoose = require('./db')

const chatSchema = mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    chat_id: {
        type: String,
        required: true
    },
    create_time: {
        type: Number
    },
    read: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('chat', chatSchema)