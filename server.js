//Since express is a core module we do not have to give a path it will look in node_modules automatically
const express = require("express");
const morgan = require('morgan'); //morgan logs req information
const campsiteRouter = require('./routes/campsiteRouter')
const promotionRouter = require('./routes/promotionRouter')
const partnerRouter = require('./routes/partnerRouter')

const hostname = "localhost";
const port = 3000;

//This returns an express server application that will be available under this variable name
const app = express();
app.use(morgan('dev')); //configures morgan using the development version
app.use(express.json()) //This will parse json data into js objects so we can use the data in js

app.use('/campsites', campsiteRouter)
app.use('/promotions', promotionRouter)
app.use('/partners', partnerRouter)

//Setting up express to serve files from public folder
app.use(express.static(__dirname + '/public')) //__dirname refers to the absolute path of the current directory of the file that its in

app.use((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
