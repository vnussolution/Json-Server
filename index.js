// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
//const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));

var port = process.env.PORT || 1337;

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

function isAuthorized() {
    console.log('is authorized');
    return true;
}

server.use((req, res, next) => {
    console.log(req);
    if (isAuthorized(req)) { // add your authorization logic here
        next() // continue to JSON Server router
    } else {
        res.sendStatus(401)
    }
});

server.get('/', (req, res) => {
    res.render('Xin chao cac ban :)');
});

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
    res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now()
    }
    // Continue to JSON Server router
    next()
})

// Use default router
server.use(router)
server.listen(port, () => {
    console.log('JSON Server is running')
})

