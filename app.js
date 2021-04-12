// importing libraries
const express = require('express');
const PORT = 8000;
const path = require('path');

// initialize app
const app = express();

// let the app use the folder specified to render html with css js.
app.use(express.static(path.join(__dirname, 'client', '/public')));

app.get('/', (req, res) => {
    res.sendFile('index.html');
})

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})
module.exports = app;