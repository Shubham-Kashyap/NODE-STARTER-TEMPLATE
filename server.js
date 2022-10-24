const Server = require('./config/app');
const chalk = require('chalk');
var app = require('express');
const env = require('dotenv').config();
const port = process.env.PORT || 3000

const boot = async () => {
    try {
        const application = new Server(port, app);
        await application.start();
    } catch (error) {
        console.log(chalk.yellow.inverse.bold('boot error:'), chalk.cyan.bold(error.message));
        process.exit([0]);
    }
}

boot();