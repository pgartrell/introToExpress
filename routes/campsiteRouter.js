const express =  require('express')
const campsiteRouter = express.Router()

//Chain all methods with same path together. removing the word "app" and '/campsites' because it is already defined in the route and server.js
campsiteRouter.route('/')

.all((req, res, next) => { //catch all routing method. Any http req will trigger this method
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain') //send back plain text in response body
    next() //Pass control to the next available routing method
})

//No need for setHeader or statusCode bc we did this above
.get((req, res) => {
    res.end('Will send all the campsites to you')//Sends message back to the client 
})

.post((req, res) => {
    res.end(`Will add the the campsite: ${req.body.name} with description: ${req.body.description}`)
})

.put((req, res) => {
    res.statusCode = 403
    res.end('PUT operation not supported on /campsites')
})

.delete((req, res) => {
    res.end('Deleting all campsites')
});

module.exports = campsiteRouter