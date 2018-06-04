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
  pool.query('INSERT INTO', (err, res) => {
    console.log(err, res)
    pool.end()
  })
});
