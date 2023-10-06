const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  console.log("SERVER: Starting");  
  socket.on("close", () => {
    socket.end();
    server.close();
  });
  socket.on("data", (data) => {
    socket.write("HTTP/1.1 200 OK\r\n\r\n");
    socket.end();
  });
  socket.on("end", () => {
    socket.end();
    console.log("SERVER: socket end");    
  });
});

server.listen(4221, "localhost");
