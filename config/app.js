const { chalk, express, apiRoutes, webRoutes } = require('../exports/module');
const { connectWithDatabase } = require('./db');

class Server {

    constructor(port, app) {
        this.port = port;
        this.app = app();
    }

    start = () => {
        this._listen();
        this._displayIncommingRequest();
        this._setupRoutes();
        this._connectWithDatabase();

    }

    _listen = () => {
        // console.log("port", this.port);
        this.app.listen(this.port, () => {
            console.log(chalk.yellow.bold('Server is running on port :'), chalk.cyan.bold(this.port));
        });
    }

    _connectWithDatabase = () => {
        connectWithDatabase();
    }

    _displayIncommingRequest = () => {
        this.app.use((req, res, next) => {
            // For example, a GET request to `/test` will print "GET /test"
            var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
            console.log(chalk.yellow(`${req.method} : ${fullUrl}`));
            next();
        });

    }
    _setupRoutes = () => {

        // this.app.use(express)
        this.app.use(express.json());
        this.app.use(express.urlencoded({
            extended: true
        }));
        this.app.use('/api/v1', apiRoutes);
        this.app.use('/web/v1', webRoutes);
    }
}

module.exports = Server