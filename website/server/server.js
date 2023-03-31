const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

httpServer.listen(3001);
io.on('connection', socket => {
    socket.on('send-message', ({ name, message }) => {
       io.emit('receive-message', { name, message }); // Pass the data object
    });

})
