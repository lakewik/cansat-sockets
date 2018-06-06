const { Pool, Client } = require('pg')
const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:7777');
 
ws.on('open', function open() {
});

const pool = new Pool({
  user: 'postgres',
  host: 'locslhost',
  database: 'cansat',
  password: 'kotek',
  port: 3211,
})

 
ws.on('message', function incoming(data) {
  console.log(data);
  // insert temperatures
  pool.query('INSERT INTO temperature (temp1, temp2, temp3, tempcpu) VALUES ('+data.temperature1+","+data.temperature2+','+data.temperature3+')', (err, res) => {
    console.log(err, res)
    pool.end()
  })
});
