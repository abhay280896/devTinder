1) why we need express ? to start node application ?

🔹 Node.js without Express

Node itself already has an in-built HTTP module.
You can start a basic server like this:


const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from plain Node.js server!");
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

This works fine for simple cases. But when your app grows, handling routes, middleware, static files, error handling, etc., becomes messy.
