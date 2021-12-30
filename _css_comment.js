const fs = require('fs');
const file = "dist/material.min.css";
var data = fs.readFileSync(file); //read existing contents into data
var fd = fs.openSync(file, 'w+');
var buffer = new Buffer(
 `/*
 * Tronic247 Material design - v3.0
 * https://material.tronic247.com
 *
 * Copyright (C) 2021 "Tronic247" Posandu Mapa
 * licensed under the MIT license.
 * https://github.com/Tronic247/material/blob/Main/LICENSE
 */`+"\n"
);

fs.writeSync(fd, buffer, 0, buffer.length, 0); //write new data
fs.writeSync(fd, data, 0, data.length, buffer.length); //append old data
// or fs.appendFile(fd, data);
fs.close(fd);
