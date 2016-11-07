var fs = require('fs');
var querystring = require('querystring');

var message = 'I am so happy to be part of the Node Girls workshop!';

function handler (request, response) {
  var endpoint = request.url;
  var method = request.method;
  var extension = endpoint.split('.')[1];
  console.log(endpoint);

  if (endpoint === '/') {
    response.writeHead(200, {'content-type': 'text/html'});

    fs.readFile(__dirname + '/../public/index.html', function(error, file) {
      response.end(file);
    });
  } else if (endpoint === '/create-post') {
    var allTheData = '';
    response.writeHead(301, {'location': '/'});
    request.on('data', function (chunkOfData) {
      allTheData += chunkOfData;
    });

    request.on('end', function () {
      var convertedData = querystring.parse(allTheData);
      console.log(convertedData);
      response.end();
    });

  } else if (endpoint === '/node') {
    response.writeHead(200, {'content-type': 'text/html'});
    response.write('Endpoint is /node');
    response.end();

  } else if (endpoint === '/girls') {
    response.writeHead(200, {'content-type': 'text/html'});
    response.write('<h1>Endpoint is /girls</h1>');
    response.end();
  } else {
    response.writeHead(200, {'content-type': 'text/' + extension});
    console.log(endpoint,'endpoint');
    fs.readFile(__dirname +'/../public'+ endpoint, function(error, file) {
      response.end(file);
    });
  }
}

module.exports = handler;
