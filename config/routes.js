const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const publicationsController = require('../controllers/publications');

module.exports = (app) => {
    app.use(authController);
    app.use(homeController);
    app.use(publicationsController);

    // TODO add not found page
    app.get('*', (req, res) => {
        res.status(404).render('404', { title: '404 Page' });
    });
};