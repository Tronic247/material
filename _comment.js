const fs = require('fs');
const file = "dist/material.min.css";
const data = fs.readFileSync(file); 
const fd = fs.openSync(file, 'w+');

const file2 = "dist/material.min.js";
const data2 = fs.readFileSync(file2); 
const fd2 = fs.openSync(file2, 'w+');

const buffer = new Buffer(
 `/*
 * Tronic247 Material design - v3.0
 * https://material.tronic247.com
 *
 * Copyright (C) 2021 "Tronic247" Posandu Mapa
 * licensed under the MIT license.
 * https://github.com/Tronic247/material/blob/Main/LICENSE
 */`+"\n"
);

fs.writeSync(fd, buffer, 0, buffer.length, 0);
fs.writeSync(fd, data, 0, data.length, buffer.length); 
fs.appendFileSync(file, "\n \n /*# sourceMappingURL=material.css.map */");
fs.close(fd);

fs.writeSync(fd2, buffer, 0, buffer.length, 0);
fs.writeSync(fd2, data2, 0, data2.length, buffer.length); 
fs.appendFileSync(file2, "\n \n /*# sourceMappingURL=material.css.map */");
fs.close(fd2);
