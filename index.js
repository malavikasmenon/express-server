const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();



app.use(morgan('dev'));

app.use(bodyParser.json()); //allows us to parse the body of the request message which is encoded in json.

app.all('/dishes', (req, res, next) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    next(); //continue on with the next request.
});

//If the method received is a get method, it will first go into the app method function and res properties will be modified. It will then be carried on to the following app.get method.

app.get('/dishes', (req, res, next) => {
    res.end('Will send all the dishes to you!');
});

app.post('/dishes', (req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + 'with description: ' + req.body.description);
});

app.put('/dishes', (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
});

app.delete('/dishes', (req, res, next) => {
    res.end("Deleting all the dishes");
});

app.get('/dishes/:dishId', (req, res, next) => {
    res.end('Will send the details of the dish ' +
        req.params.dishId + ' to you!');
});

app.post('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/' +
        req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish ' + req.body.name + 'with details ' + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end("Deleting the dish: " + req.params.dishId);
});

app.use((req, res, next) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

app.use(express.static(__dirname + '/public'));

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});