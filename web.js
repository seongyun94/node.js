const express = require('express')
const app = express()
const fs = require('fs')
const readline=require('readline')
/***********과제7***********/
const Json2csvParser = require('json2csv').Parser;


app.get('/', (req, res) => res.send('Hello World!'))

var seq=0
app.get('/log', function(req, res) {

    fs.appendFile('log.txt', JSON.stringify(req.query)+"\n", function (err) {
        if (err) throw err
        console.log("%j", req.query)
        res.end("Got "+ String(seq++) +" "+ JSON.stringify(req.query))
                });
})

app.get('/update', function(req, res) {

//    fs.appendFile('log.txt', JSON.stringify(req.query.api_key)+','+JSON.stringify(req.query.field1)+"\n", function (err) {
    fs.appendFile('log.txt', JSON.stringify(req.query)+"\n", function (err) {
//    fs.appendFile('data.csv', Object.values(req.query)+"\n", function (err) {
        if (err) throw err
        console.log("%j", req.query)
        res.end("Got "+ String(seq++) +" "+ JSON.stringify(req.query))
    });
})

app.get('/get', function(req, res) {
  
    //value = req.query.count;
    //alert(typeof value);
    //console.log("%d", req.query.count);

    /*
    var rl = readline.createInterface({
        input: fs.createReadStream('log.txt')
    });
    
    rl.on('line', function(line) {
        res.send(line);
    */

    fs.readFile('log.txt', 'utf8', function(err,data) {
        if (err) throw err
      //console.log(data);
      //res.send(JSON.parse(data));
      //res.send(data);       
    //var line = data.split('\r\n');
      //value=Number(value);
      //conslole.log(value);
      //for(var i=0; i<value; i++)
    res.send(data);

    });
});

/*
app.get('/download', function(req, res) {
    var file = 'data.csv'
    res.download(file)
    
//    fs.readFile('log.txt', 'utf-8', function(err, data) {
//        if (err) throw err;
        //const json2csvParser = new Json2csvParser(data);
//        fs.appendFile('data.csv', json2csv(data)+"\n", function (err) {
//            if (err) throw err
//        });

    });
    
});
*/

app.listen(3000, () => console.log('Example app listening on port 3000!'))
