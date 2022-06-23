const express = require('express');
const expressConfig = require('./config/express');
const databaseConfig = require('./config/database');
const routesConfig = require('./config/routes');

start();

async function start() {
    const app = express();

    expressConfig(app);
    await databaseConfig(app);
    routesConfig(app);

    // TODO delete layout: false
    // app.get('/', (req, res) => {
    //     console.log(req.session);
    //     res.render('home', { layout: false });
    // });

    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
}