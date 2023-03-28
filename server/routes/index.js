const usersRoutes = require('./users');
const serviceRoutes = require('./services');

const constructorMethod = (app) => {
    app.use('/', usersRoutes);
    app.use('/services', serviceRoutes);
    app.use('*', (req,res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;