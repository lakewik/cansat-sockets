var WebSocketServer = require('./index.js').Server;
var express = require('express');
var path = require('path');
var app = express();
var server = require('http').createServer();

app.use(express.static(path.join(__dirname, '/public')));

var wss = new WebSocketServer({server: server});
wss.on('connection', function (ws) {
 /*
	var id = setInterval(function () {
  var msg = {
    temperature: "20.30",
    pressure: "1000 hPa",
    humidity: "30%",
    height: "1000 m",
	  orientationx: "40",
          orientationy: "45",
          orientationx: "20",
    

};
    ws.send(JSON.stringify(msg), function () { /* ignore errors  });

  }, 100);
*/
  console.log('started client interval');
  ws.on('close', function () {
    console.log('stopping client interval');
    clearInterval(id);
  });
	
   ws.on('message', function incoming (eventmsg){
	   // TEMP1|TEMP2|TEMP3|COMPASS|PRESSURE|HUMIDITY|LIGHT|CPUTEMP|ACCX|ACCY|ACCZ|COMPASSX|COMPASSY|COMPASSZ
	   // liczymy prędkość z akceleracji
	   // |v| = SQRT(POW(Vx) + POW(Vy) + POW(Vz))
	   // liczyly pitch i roll
	   var pitchC = (Math.atan2(R_x,Math.sqrt(R_y*R_y+R_z*R_z)) * 180.0) / Math.PI;
	   var rollC = (Marh.atan2(R_y,(Math.sqrt(R_x*R_x+R_z*R_z))) * 180.0) / Math.PI;
	   var msg = {
    			temperature: "20.30",
    			pressure: "1000",
    			humidity: "30%",
		        lightlevel: "1000",
    			height: "1000 m",
		   	pitch: pitchC,
		   	roll: rollC,
		   	cputemp: cputempR,
		   	speed: speed_calculated,
			compass: compass,
	  		orientation: {
				x: "40",
				y: "45",
				z: "20"
			},
			acceleration: {
				x: "40",
				y: "45",
				z: "20"
			}
			
	    };   
	   
	   ws.send(JSON.stringify(msg), function () { /* ignore errors  });
   });
});

server.on('request', app);
server.listen(8080, function () {
  console.log('Listening on http://localhost:7777');
});
