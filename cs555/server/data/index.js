const userData = require('./users');
const serviceData = require('./services');
const offersData = require('./offers');

module.exports = {
    offers: offersData,
    services: serviceData,
    users: userData
};

