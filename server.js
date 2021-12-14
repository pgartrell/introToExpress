//Since express is a core module we do not have to give a path it will look in node_modules automatically
const express = require("express");

const hostname = "localhost";
const port = 3000;

//This returns an express server application that will be available under this variable name
const app = express();

app.use((req, res) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
