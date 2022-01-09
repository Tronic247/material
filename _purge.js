const https = require("https");

const files = ["material.min.css", "material.min.js", "material.css"];

files.forEach((file) => {
    https.get(`https://purge.jsdelivr.net/gh/tronic247/material/dist/${file}`, (res) => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", (data) => {
            body += data;
        });
        res.on("end", () => {
            fs.writeFile(file, body, (err) => {
                if (err) throw err;
                console.log(`Purged cache for ${file}`);
            });
        });
    });
});
