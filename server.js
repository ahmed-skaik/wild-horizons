import http from "node:http";

const PORT = 8000;

const server = http.createServer((req, res) => {
  res.end("Hello from Node JS server");
});

server.listen(PORT, () => console.log(`This Server runs on port : ${PORT}`));
