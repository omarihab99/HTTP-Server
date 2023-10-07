const net = require("net");
const LOGGER = require("./logger");
// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const createResponse = ({method, path, version, headers}) => {
  if(path === "/") {
    return `${version} 200 OK\r\n\r\n`;
  }
  const[_,echo] = path.split("/echo/");
  if(path.startsWith("/echo/")) {
    const[_,echo] = path.split("/echo/");
    return `${version} 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${echo.length}\r\n\r\n${echo}`;
  }
  if(path==="/user-agent" && headers["User-Agent"]) {
    return `${version} 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${headers["user-agent"].length}\r\nUser-Agent: ${headers["user-agent"]}\r\n\r\n`;
  }
  return `${version} 404 Not Found\r\n\r\n`;
}
const parseRequest = (data) => {
    const [request, ...requestHeaders] = data.split("\r\n");
    const [method, path , version] = request.split(" ");
    const headers = {};
    requestHeaders.forEach((header) => {
        if(!header) return;
        const [key, value] = header.split(": ");
        headers[key] = value;
    });
    LOGGER.path(path);
    LOGGER.method(method);
    LOGGER.version(version);
    LOGGER.header(headers);
    return {method, path, version, headers};
    
}
const server = net.createServer((socket) => {
  console.log("SERVER: Starting");  
  socket.on("close", () => {
    socket.end();
    server.close();
  });
  socket.on("data", (data) => {
    const info = parseRequest(data.toString());
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
