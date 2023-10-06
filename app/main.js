const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const createResponse = (info) => {
    return "HTTP/1.1 " + info + " \r\n\r\n";
}
const handleRequest = (data) => {
    const [info, _] = data.split("\r\n");
    const [__, path] = info.split(" ");
    if(path==="/"){
        return "200 OK";
    }
    return "404 Not Found";
}
const server = net.createServer((socket) => {
  console.log("SERVER: Starting");  
  socket.on("close", () => {
    socket.end();
    server.close();
  });
  socket.on("data", (data) => {
    const info = handleRequest(data.toString());
    const res = createResponse(info);
    socket.write(res);
    socket.end();
  });
  socket.on("end", () => {
    socket.end();
    console.log("SERVER: socket end");    
  });
});

server.listen(4221, "localhost");
