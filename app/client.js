const net = require("net");

function sendRequest(request) {
  const client = new net.Socket();

  client.connect(4221, "localhost", () => {
    console.log("Connected to server");
    client.write(request);
  });

  client.on("data", (data) => {
    console.log("Received response from server:");
    console.log(data.toString());
    client.destroy(); // Close the connection
  });

  client.on("close", () => {
    console.log("Connection closed");
  });

  client.on("error", (error) => {
    console.error("Error occurred:", error);
    client.destroy(); // Close the connection
  });
}

// Example GET request
const getRequest = "GET / HTTP/1.1\r\nHost: localhost:4221\r\n\r\n";
sendRequest(getRequest);

// Example POST request
const postRequest = "POST /files/sample.txt HTTP/1.1\r\nHost: localhost:4221\r\nContent-Length: 11\r\n\r\nHello, file";
sendRequest(postRequest);