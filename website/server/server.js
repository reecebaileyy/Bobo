const { instrument } = require("@socket.io/admin-ui");
const httpServer = require("http").createServer();

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

instrument(io, {
    auth: false,
    mode: "development",
  });
  
  httpServer.listen("https://gentle-plains-30378.herokuapp.com" || 3001);
