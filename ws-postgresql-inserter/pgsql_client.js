const { Pool, Client } = require('pg')
const WebSocket = require('ws');
var express = require('express');
var path = require('path');
var app = express();

const ws = new WebSocket('ws://localhost:7777');

ws.on('open', function open() {
});

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cansat',
  password: 'kotek',
  port: 3211,
});

ws.on('connection', function (ws) {
  console.log('started client interval');
  ws.on('close', function () {
    console.log('stopping client interval');
    //clearInterval(id);
  });
 
ws.on('message', function incoming(data) {
  console.log(data);
  // insert temperatures
  pool.query('INSERT INTO temperature (temp1, temp2, temp3, tempcpu, date) VALUES ('+data.temperature1+','+data.temperature2+','+data.temperature3+', current_timestamp)', (err, res) => {
    console.log(err, res);
    pool.end();
  });
 // insert RSSI
 pool.query('INSERT INTO rssi (value, date) VALUES ('+data.rssi+', current_timestamp)', (err, res) => {
    console.log(err, res);
    pool.end();
  });
 pool.query('INSERT INTO pressure (value, date) VALUES ('+data.pressure+', current_timestamp)', (err, res) => {
    console.log(err, res);
    pool.end();
  });
 pool.query('INSERT INTO light (light, date) VALUES ('+data.lightlevel+', current_timestamp)', (err, res) => {
    console.log(err, res);
    pool.end();
  });
 pool.query('INSERT INTO humidity (value, date) VALUES ('+data.humidity+', current_timestamp)', (err, res) => {
    console.log(err, res);
    pool.end();
  });
 pool.query('INSERT INTO acceleration (accelerationx, accelerationy, accelerationz, acceleration, date) VALUES ('+data.acceleration.x+','+data.acceleration.y+','+data.acceleration.z+','+data.acceleration+', current_timestamp)', (err, res) => {
    console.log(err, res);
    pool.end();
  });
 pool.query('INSERT INTO orientation (orientationx, orientationy, orientationz, date) VALUES ('+data.orientation.x+','+data.orientation.y+','+data.orientation.z+', current_timestamp)', (err, res) => {
    console.log(err, res);
    pool.end();
  });
 pool.query('INSERT INTO height (value, date) VALUES ('+data.height+', current_timestamp)', (err, res) => {
    console.log(err, res);
    pool.end();
  })
 pool.query('INSERT INTO speed (value, date) VALUES ('+data.speed+', current_timestamp)', (err, res) => {
    console.log(err, res);
    pool.end();
  });
});
});

