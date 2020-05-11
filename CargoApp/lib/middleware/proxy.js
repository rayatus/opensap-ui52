const httpProxy = require('http-proxy');
const dotenv = require("dotenv");

module.exports = function ({
    resources,
    options
}) {
    const proxy = new httpProxy.createProxyServer( {secure:false} );
    const routing = options.configuration;


    // Call dotenv, so that contents in the file are stored in the environment variables
    dotenv.config();

    return function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization, X-Mindflash-SessionID');
        // intercept OPTIONS method
        if ('OPTIONS' === req.method) {
            res.header(200);
            if (routing.debug) {
                console.log(req.method + '(options): ' + req.url);
            }
            next();
            return;
        }
        var dirname = req.url.replace(/^\/([^\/]*).*$/, '$1'); //get root directory name eg sdk, app, sap
        if (!routing[dirname]) {
            if (routing.debug) {
                console.log(req.method + ': ' + req.url);
            }
            next();
            return;
        }
        if (routing.debug) {
            console.log(req.method + ' (redirect): ' + routing[dirname].target + req.url);
        }

        //get specific user/pass for given service
        let username,password;
        if(routing[dirname].auth){
            if (routing.debug) console.log(`Authenticated proxy, credentials stored in .env file?: ${routing[dirname].auth.fromEnv}`);

            if (routing[dirname].auth.fromEnv){
                if (routing.debug) console.log(`Retrieving user/pass from .env.${routing[dirname].auth.user} / .env.${routing[dirname].auth.pass}`);

                username = process.env[routing[dirname].auth.user];
                password = process.env[routing[dirname].auth.pass]
            }else{
                username = routing[dirname].auth.user;
                password = routing[dirname].auth.pass;
            }     
        }    

        proxy.web(req, res, { target: routing[dirname].target, auth: username + ":" + password }, function (err) {
            if (err) {
                next(err);
            }
        });
    }
};