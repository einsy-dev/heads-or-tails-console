#!/usr/bin/env node

const { _ } = require('yargs').argv;
const prompt = require('prompt-sync')();
const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, _[0] + '.json' || 'highscore.json');

while (true) {
    const number = Math.floor(Math.random() * 2);
    let attempt = prompt("Орел или решка? [y/n]: ");

    if (attempt === null) break;
    if (/^[^yn]$/.test(attempt)) continue;

    if (attempt === 'y' && number == 1) {
        console.log('Орел! Поздравляю! Сыграй ещё!');
        saveScore(1);
        continue
    } else if (attempt === 'n' && number == 0) {
        console.log('Решка! Поздравляю! Сыграй ещё!');
        saveScore(1);
        continue
    } else {
        console.log('Неверно! Попытайся снова!');
        saveScore(0);
        continue;
    }
}

function saveScore(result) {
    if (fs.existsSync(file)) {
        const arr = JSON.parse(fs.readFileSync(file, 'utf-8'));
        result ? arr.wins += 1 : arr.loses += 1;
        fs.writeFileSync(file, JSON.stringify(arr), 'utf-8');
    } else {
        fs.writeFileSync(file, JSON.stringify({ wins: result === 1 ? 1 : 0, loses: result === 0 ? 1 : 0 }), 'utf-8');
    }
}
