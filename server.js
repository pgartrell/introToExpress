//Since express is a core module we do not have to give a path it will look in node_modules automatically
const express = require("express");
const morgan = require('morgan'); //morgan logs req information

const hostname = "localhost";
const port = 3000;

//This returns an express server application that will be available under this variable name
const app = express();
app.use(morgan('dev')); //configures morgan using the development version
app.use(express.json()) //This will parse json data into js objects so we can use the data in js

app.all('/campsites' , (req, res, next) => { //catch all routing method. Any http req will trigger this method
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain') //send back plain text in response body
    next() //Pass control to the next available routing method
})

//No need for setHeader or statusCode bc we did this above
app.get('/campsites', (req, res) => {
    res.end('Will send all the campsites to you')//Sends message back to the client 
})

app.post('/campsites', (req, res) => {
    res.end(`Will add the the campsite: ${req.body.name} with description: ${req.body.description}`)
})

app.put('/campsites', (req, res) => {
    res.statusCode = 403
    res.end('PUT operation not supported on /campsites')
})

app.delete('/campsites', (req, res) => {
    res.end('Deleting all campsites')
})

//Allow us to store whatever the client sends as part of the path after the / as a route param named campsiteId
app.get('/campsites/:campsiteId', (req, res) => {
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`)
})

app.post('/campsites/:campsiteId', (req, res) => {
    res.statusCode = 403
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
})

app.put('/campsites/:campsiteId', (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
        with description: ${req.body.description}`);
});

app.delete('/campsites/:campsiteId', (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

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
