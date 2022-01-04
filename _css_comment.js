const fs = require('fs');
const file = "dist/material.min.css";
const data = fs.readFileSync(file); 
const fd = fs.openSync(file, 'w+');
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
