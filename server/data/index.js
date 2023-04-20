const userData = require('./users');
const serviceData = require('./services');
const offersData = require('./offers');
const billingData = require('./billing');

module.exports = {
    offers: offersData,
    services: serviceData,
    users: userData,
    billing: billingData
};

