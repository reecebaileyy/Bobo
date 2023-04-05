const httpServer = require("http").createServer();
const PORT = process.env.PORT || 3001;

const io = require("socket.io")(httpServer, {
    cors: {
        origin: ["https://bobovision.vercel.app", "https://admin.socket.io", "http://localhost:3000", "https://www.bobovision.xyz"],
        credentials: true
    }
});

io.on('connection', socket => {
    socket.on('send-message', ({ username, message, colorClass }) => {
       socket.broadcast.emit('receive-message', { username, message, colorClass }); // Pass the data object
       console.log(`${username}: ${message}`)
    });

})
  
  httpServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
  
 