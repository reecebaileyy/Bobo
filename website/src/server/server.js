const io = reuire('server.io')(3001)

io.on('connection', socket => {
    console.log(socket.id)
})