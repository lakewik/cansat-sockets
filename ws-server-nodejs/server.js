var WebSocketServer = require('./index.js').Server;
var express = require('express');
var path = require('path');
var app = express();
var server = require('http').createServer();

app.use(express.static(path.join(__dirname, '/public')));

var wss = new WebSocketServer({server: server});

function calcHeight() {
	var T = 293.15;
	var u = 0.028944;
	var R = 8.31;
	var g = 9.81;
	
	var po = 100865;
	var p = 97846;
	
	var finalHeight = ((R*T)/(g*u)) * Math.log(parseFloat(p)/parseFloat(po));
	
	return finalHeight;
}

wss.on('connection', function (ws) {
  console.log('started client interval');
  ws.on('close', function () {
    console.log('stopping client interval');
    clearInterval(id);
  });
	
var lastHeight;
var currHeight;
var currSpeed;
   ws.on('message', function incoming (eventmsg){
	   // TEMP1|TEMP2|TEMP3|COMPASS|PRESSURE|HUMIDITY|LIGHT|CPUTEMP|ACCX|ACCY|ACCZ|COMPASSX|COMPASSY|COMPASSZ|ALTITUDE_BMP280
	   // liczymy prędkość z akceleracji
	   // |v| = SQRT(POW(Vx) + POW(Vy) + POW(Vz))
	   // liczyly pitch i roll
	   //var pitchC = (Math.atan2(R_x,Math.sqrt(R_y*R_y+R_z*R_z)) * 180.0) / Math.PI;
	   //var rollC = (Marh.atan2(R_y,(Math.sqrt(R_x*R_x+R_z*R_z))) * 180.0) / Math.PI;
	   //var currentHeight = calcHeight();
	   // speed calculation - methode 1 in server
	   
	   var currHeight = splittedMessage[14];
	   currSpeed = currHeight - lastHeight;
	   var splittedMessage = eventmsg.split("|");
	   var msg = {
    			temperature1: splittedMessage[0],
		   	temperature2: splittedMessage[1],
		        temperature3: splittedMessage[2],
    			pressure: splittedMessage[4],
    			humidity: splittedMessage[5],
		        lightlevel: splittedMessage[6],
    			height: splittedMessage[14],
		   	pitch: pitchC,
		   	roll: rollC,
		   	cputemp: splittedMessage[7],
		   	speed: speed_calculated,
			compass: splittedMessage[3],
	  		orientation: {
				x: splittedMessage[11],
				y: splittedMessage[12],
				z: splittedMessage[13]
			},
			acceleration: {
				x: splittedMessage[8],
				y: splittedMessage[9],
				z: splittedMessage[10]
			},
		   	speed: currSpeed
			
	    };   
	  var lastHeight = splittedMessage[14];
	   
	   
	   ws.send(JSON.stringify(msg), function () { /* ignore errors */ });
   });
});

server.on('request', app);
server.listen(8080, function () {
  console.log('Listening on http://localhost:7777');
});
