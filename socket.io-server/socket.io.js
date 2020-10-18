module.exports = function(server) {

    const io = require('socket.io')(server)
    const chatModel = require('../db/chatModel')
    io.on('connection', socket => {

        socket.on('sendMsg', ({ from, to, content }) => {

            new chatModel({
                from,
                to,
                content,
                chat_id: [from, to].sort().join('_'),
                create_time: Date.now(),
            }).save((err, message) => {
                if (!err) {
                    io.emit('receiveMsg', message)
                }
            })
        })
    })
}