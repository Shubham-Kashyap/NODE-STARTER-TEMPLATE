module.exports = {
    express: require('express'),
    chalk: require('chalk'),
    apiRoutes: require('../routes/api'),
    webRoutes: require('../routes/web'),
    env: require('dotenv').config()
}