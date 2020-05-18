const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

app.get('/', function (req, res) {
    const pathtoHtmlfile = path.resolve(__dirname, '../dist/index.html');
    const contentFromHtmlfile = fs.readFileSync(pathtoHtmlfile, 'utf-8');
    res.send(contentFromHtmlfile);
});

app.use('/static', express.static(path.resolve(__dirname, '../dist')))

app.listen(3000, function() {
    console.log('runnr!')
})