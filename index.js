#!/usr/bin/env node
const http = require('http');
const { DEFAULT_KEY } = require('./config');
const { parsed: env } = require('dotenv').config();
const { _ } = require('yargs').argv;

const KEY = _[0] || DEFAULT_KEY;
const CITY = _[1] || env.DEFAULT_CITY;

/* fetch('http://api.weatherstack.com/current' + '?access_key=' + KEY + '&query=' + CITY)
    .then(res => res.json())
    .then(data =>
        console.log(data))
    .catch(err => console.log(err)); */
http.get('http://api.weatherstack.com/current' + '?access_key=' + KEY + '&query=' + CITY, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log(JSON.parse(data));
    })
})
