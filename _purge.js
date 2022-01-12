const https = require("https");

const files = ["material.min.css", "material.min.js", "material.css"];

files.forEach((file) => {
    https.get(`https://cdn.jsdelivr.net/npm/@material/material@${file}`, (res) => {
        res.setEncoding("utf8");
        let body = '';
        res.on("data", () => {
            body += `${file.toString()}`;
        });
        res.on("end", () => {
            console.log('\x1b[34m',`Purged cache for file ${body}`);
        });
    });
});