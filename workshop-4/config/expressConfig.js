const { urlencoded, static: staticHandler } = require('express');
const path = require('path');
const cookieparser = require('cookie-parser');
const { session } = require('../middlewares/session');
const secret = 'What  a secret'
function expressConfig(app) {
    app.use(cookieparser(secret))
    app.use(session())
    app.use(urlencoded({ extended: true }));
    app.use('/static', staticHandler((__dirname, 'static')));
}

module.exports = { expressConfig };