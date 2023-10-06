const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const createResponse = (info) => {
    if(info===""){
        return "HTTP/1.1  404 Not Found\r\n\r\n";
    }
    if(info==="/"){
        return "HTTP/1.1  200 OK\r\n\r\n";
    }
    return "HTTP/1.1  200 OK\r\nContent-Type: text/plain\r\nContent-Length:" + info.length + "\r\n\r\n" + info;
}
const handleRequest = (data) => {
    const [info, _] = data.split("\r\n");
    const [__, path] = info.split(" ");
    if(path==="") return createResponse("");
    if(path==="/") return createResponse("/");
    const pathArr = path.split("/");
    if(pathArr[1]!=="echo") return createResponse("");
    const randomString = pathArr[2];
    return createResponse(randomString);
}
const server = net.createServer((socket) => {
  console.log("SERVER: Starting");  
  socket.on("close", () => {
    socket.end();
    server.close();
  });
  socket.on("data", (data) => {
    const res = handleRequest(data.toString());
    socket.write(res);
    socket.end();
  });
  socket.on("end", () => {
    socket.end();
    console.log("SERVER: socket end");    
  });
});

server.listen(4221, "localhost");
