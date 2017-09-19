"use strict";
const configure_app = require('./configure_app.js');
const port = (process.env.PORT || 8080);
const router = require('./routes/routing.js') 
const startSocket = require('./socket.js')


// Create / configure the app.
let app = configure_app();

// Setup routes for request-based signalling
app.use('/', router);

// Start listening for connections.
const server = app.listen(port);

// Start up a socket for duplex signalling
startSocket(server)

// Print a message indicating readiness.
console.log(`point browser to http://localhost:${port}`)

