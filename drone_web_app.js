var express = require('express');
var arDrone = require('ar-drone');
var fs = require('fs');

var client = arDrone.createClient({ip: "192.168.0.69"}); //for wpa2 connection
//var client = arDrone.createClient(); //for drone wifi connection

var app = express();
app.use(express.static('assets'));
var path = require('path');

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/droneOut.html'));
});

app.get('/land', function(req, res){
  client.stop(0);
  client.land();
  console.log("drone landing");
});

app.get('/takeoff', function(req, res){
  client.takeoff();
  console.log("drone taking off");
});

app.get('/calibrate', function(req, res){
  client.calibrate(0);
  console.log("drone calibrating");
});

app.get('/hover', function(req, res){
  client.stop(0);
  console.log("drone hovering");
});

app.get('/up', function(req, res){
  client.up(0.6);
  console.log("drone up");
});

app.get('/down', function(req, res){
  client.down(0.6);
  console.log("drone down");
});

app.get('/front', function(req, res){
  client.front(0.6);
  console.log("drone forward");
});

app.get('/back', function(req, res){
  client.back(0.6);
  console.log("drone backward");
});

app.get('/right', function(req, res){
  client.right(0.6);
  console.log("drone right");
});

app.get('/left', function(req, res){
  client.left(0.6);
  console.log("drone left");
});

app.get('/clockwise', function(req, res){
  client.clockwise(0.6);
  console.log("drone spinning cockwise");
});

app.get('/counterClockwise', function(req, res){
  client.counterClockwise(0.6);
  console.log("drone spinning cockwise");
});

app.get('/photos', function(req, res){
  console.log("drone taking sick pics");
  require('ar-drone-png-stream')(client, { port: 8000 });
  var pngStream = client.getPngStream();
  var period = 100; // save sick pic every x ms
  var lastFrameTime = 0;
  var count = 0;
  var pngName = "";
  var fs = require('fs');
  var logger = fs.createWriteStream('rgb.txt', {
    flags: 'a' // 'a' means appending (old data will be preserved)
  });

  pngStream
    .on('error', console.log)
    .on('data', function(pngBuffer){
      var now = (new Date()).getTime();
      if (now - lastFrameTime > period){
        lastFrameTime = now;
        timestamp = insertDecimal(now);
        count = count + 1;
        pngName = ('drone_image_' + count + '.png');
        logger.write(timestamp + " rgb/" + pngName + "\n"); // append string to your file
        fs.writeFile((__dirname + '/dronePics/' + pngName), pngBuffer,
          function(err){
            if (err) {
              console.log("Error saving PNG: " + err);
            }
          });
        }
    });
    //logger.end() // close string
});

function insertDecimal(num) {
   return Number.parseFloat(num / 1000).toFixed(3);
}

app.listen(3000, function (){
});

// app.get('/', (req, res) => res.send('Hello World!'))
//
// app.listen(3000, () => console.log('Example app listening on port 3000!'))
