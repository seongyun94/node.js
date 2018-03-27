var express = require('express');
var app = express();
var json2csv = require('json2csv');

mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'me',
    password: 'mypassword',
    database: 'mydb'
})
connection.connect();


app.get("/data", function(req, res) {
    console.log("param=" + req.query);
      
    var qstr = 'select * from sensors ';
    connection.query(qstr, function(err, rows, cols) {
        if (err) {
            throw err;
            res.send('query error: '+ qstr);
            return;
        }
                                            
        console.log("Got "+ rows.length +" records");
        html = ""
        for (var i=0; i< rows.length; i++) {
            html += JSON.stringify(rows[i]);
        }
        res.send(html);
    });      
});

app.get("/download", (req, res) => {
    console.log('Download');

    var qstr = 'select * from sensors ';
    var query = connection.query(qstr, function(err, rows) {
        if (err) {
            throw err;
            res.send('query error: '+ qstr);
            return;
        }
        var csv = json2csv.parse(rows)
        res.attachment('data.csv');
        res.status(200).send(csv);
    });
});


var server = app.listen(8083, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('listening at http://%s:%s', host, port)
});
