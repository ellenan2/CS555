const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const services = data.services;
const offers = data.offers;

const main = async() => {
    // Tests with additional fields
    const user1 = await users.addUser('kinginthenorth@gmail.com', '123-123-1234', 'jonsnowspassword1',  'Jon', 'Snow', 0);
    const user2 = await users.addUser('bobross@gmail.com', '234-234-2345', 'bobrosspassword1', 'Bob', 'Ross', 1);
    const user3 = await users.addUser('nickcage@gmail.com', '345-345-3456', 'nickcagespassword1', 'Nicolas', 'Cage', 0)
    const u1 = await users.getUserByEmail('kinginthenorth@gmail.com');
    const u2 = await users.getUserByEmail('bobross@gmail.com');
    const u3 = await users.getUserByEmail('nickcage@gmail.com');
    console.log('User collection successfully seeded!');
    const service1 = await services.createService(u2._id, u1._id, 'Maintenance', 'Annually scheduled maintenance.', 120);
    const offer1 = await offers.createOffer(u3._id, u1._id, 'Installation', 'New solar panel installation', 18000);
    return;
};

main().catch(console.log);