var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
    http = require('http'),

    server = http.createServer(function (req, res) {
    if (req.method === 'POST') {
        var body = '';

        req.on('data', function(chunk) {
            body += chunk;
        });

        req.on('end', function() {
            if (req.url === '/') {
                log('Received message: ' + body);
            } else if (req.url = '/scheduled') {
                log('Received task ' + req.headers['x-aws-sqsd-taskname'] + ' scheduled at ' + req.headers['x-aws-sqsd-scheduled-at']);
            }

            res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
            res.end();
        });
    } else {
        res.writeHead(200);
        res.write(html);
        res.end();
    }
});

app.use("/js", express.static("public/js"));
app.use("/css", express.static("public/css"));
app.use("/img", express.static("public/img"));
app.use("/fonts", express.static("public/fonts"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

var log = function(entry) {
    fs.appendFileSync('/tmp/javascriptNYC.log', new Date().toISOString() + ' - ' + entry + '\n');
};

app.listen(PORT, function() {
  console.log("Listening on port %s", PORT);
});
