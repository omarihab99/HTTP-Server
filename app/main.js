import net from "node:net";
import LOGGER from "./logger";
const {getFileContent, writeFileContent} = require("./readfile").default;
import p from "node:path";
import fs from "node:fs";


function createResponse({ method, path, version, headers, body }) {
  const STATUS_CODES = {
    200: "OK",
    404: "Not Found",
    201: "Created",
  };
  /*
    This switch statement is used to handle different requests based on the path.
  */
  switch (path) {
    // If the path is /, the response will be nothing but a 200 OK.
    case "/":
      return `${version} 200 OK\r\n\r\n`;
    // If the path is /echo, the response will be the body of the request.
    case "/echo":
      return `${version} 200 ${STATUS_CODES[200]}\r\nContent-Type: text/plain\r\nContent-Length: ${body.length}\r\n\r\n${body}`;
    // If the path is /user-agent, the response will be the user-agent header sent by the client.
    case "/user-agent":
      return `${version} 200 ${STATUS_CODES[200]}\r\nContent-Type: text/plain\r\nContent-Length: ${headers["User-Agent"].length}\r\n\r\n${headers["User-Agent"]}`;
    /*  If the path is /files, this is an indication that the client wants to make some kind of file operation.
        if the method is GET, the response will be the content of the file.
        if the method is POST, the response will be a 201 Created.
    */
    case "/files/":
      const directory = process.argv[3];
      if (!directory) {
        return `${version} 404 ${STATUS_CODES[404]}\r\n\r\n`;
      }
      const [_, fileName] = path.split("/files/");
      const fullPath = p.resolve(directory, fileName);
      if (method === "GET") {
        if (!fs.existsSync(fullPath)) {
          return `${version} 404 ${STATUS_CODES[404]}\r\nContent-Type: text/plain\r\nContent-Length: 9\r\n\r\nNot Found`;
        }
        const content = getFileContent(fullPath);
        if (!content) {
          return `${version} 200 ${STATUS_CODES[200]}\r\nContent-Type: application/octet-stream\r\nContent-Length: 0\r\n\r\n`;
        }
        return `${version} 200 ${STATUS_CODES[200]}\r\nContent-Type: application/octet-stream\r\nContent-Length: ${content.length}\r\n\r\n${content}`;
      }
      if (method === "POST" && body !== null) {
        writeFileContent(fullPath, body);
        return `${version} 201 ${STATUS_CODES[200]}\r\nContent-Type: text/plain\r\nContent-Length: 0\r\n\r\n`;
      }
    default:
      break;
  }
  return `${version} 404 ${STATUS_CODES[404]}\r\n\r\n`;
}


const parseRequest = (data) => {
  const [request, ...requestHeaders] = data.split("\r\n");
  let body = null;
  
  const n = requestHeaders.length;
  /*
    This if statement is used to handle POST requests with content in the body.
    Data splitted by \r\n will result in empty string and body in the last two elements of the array;
    Example:
      POST / HTTP/1.1
      Host: localhost:4221
      User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.207.132.170 Safari/537.36
      Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*\/*;q=0.8,application/signed-exchange;v=b3;q=0.9
      Accept-Encoding: gzip, deflate
      Accept-Language: en-US,en;q=0.9
      Connection: keep-alive

      BODY
  */
  if(requestHeaders[n-2] == " "){ 
    body = requestHeaders.pop();
    requestHeaders.pop();
  }
  const [method, path, version] = request.split(" ");
  const headers = {};
  requestHeaders.forEach((header) => {
    if (!header) return;
    const [key, value] = header.split(": ");
    headers[key] = value;
  });
  LOGGER.path(path);
  LOGGER.method(method);
  LOGGER.version(version);
  LOGGER.header(headers);
  return { method, path, version, headers, body };
};
const server = net.createServer((socket) => {
  console.log("SERVER: Starting...");
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
    console.log("SERVER: socket end...");
  });
});

server.listen(4221, "localhost");
