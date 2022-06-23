const { getPublById } = require('../services/publications');

function preload() {
    return async function (req, res, next) {
        const id = req.params.id;
        const data = await getPublById(id);
        res.locals.data = data;
        next();
    };
}

module.exports = preload;