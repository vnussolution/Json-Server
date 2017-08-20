var http = require('http');
var moment = require('moment-timezone');
moment().tz("America/Los_Angeles").format();

var timestamp = 1403454068850,
    date = new Date(timestamp);

var server = http.createServer(function (request, response) {

    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello World! " + moment.tz(date, "America/Los_Angeles").format());

});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);