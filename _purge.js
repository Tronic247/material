const https = require("https");

const files = ["material.min.css", "material.min.js", "material.css"];

files.forEach((file) => {
    https.get(`https://cdn.jsdelivr.net/npm/@material/material@${file}`, (res) => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", (data) => {
            body += data;
        });
        res.on("end", (r) => {
            console.log(`Purged cache for ${r}`);
        });
    });
});
