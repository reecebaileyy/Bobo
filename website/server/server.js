const httpServer = require("http").createServer();
const PORT = process.env.PORT || 3001;

const io = require("socket.io")(httpServer, {
    cors: {
        origin: ["https://gentle-plains-30378.herokuapp.com", "https://admin.socket.io"],
        credentials: true
    }
});

io.on('connection', socket => {
    socket.on('send-message', ({ username, message }) => {
       socket.broadcast.emit('receive-message', { username, message }); // Pass the data object
       console.log(`${username}: ${message}`)
    });

})
  
  httpServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });