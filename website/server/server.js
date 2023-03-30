const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

httpServer.listen(3001);
io.on('connection', socket => {
    console.log(socket.id)
    socket.on('send-message', message => {
        console.log(message)
    })
})
