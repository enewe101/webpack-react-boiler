"use strict";
const configure_app = require('./configure_app.js');
const port = (process.env.PORT || 8080);
const provide_routing = require('./routes/routing.js')

// Create / configure the app.
let app = configure_app();

// Setup routes.
provide_routing(app);

// Start listening for connections.
app.listen(port)

// Print a message indicating readiness.
console.log(`point browser to http://localhost:${port}`)

