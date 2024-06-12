const { urlencoded, static: staticHandler } = require('express');
const path = require('path');

function expressConfig(app) {
    app.use(urlencoded({ extended: true }));
    app.use('/static', staticHandler((__dirname, 'static')));
}

module.exports = { expressConfig };