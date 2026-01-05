require("dotenv").config();

const http = require("http");
const fs = require("fs");

const PORT = process.env.PORT;
const AppName = process.env.AppName;

function logRequest(req) {
  const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
  fs.appendFile("log.txt", logEntry, (err) => {
    if (err) console.error("Failed to write to log file:", err);
  });
}

const server = http.createServer((req, res) => {
  logRequest(req);

  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Hello, welcome to ${AppName}\n`);
  } else if (req.url === "/health" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "OK" }));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found\n");
  }
});

server.listen(PORT, () => {
  console.log(`${AppName} Server is running on port ${PORT}`);
});
