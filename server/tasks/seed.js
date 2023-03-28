const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const services = data.services;

const main = async() => {
    // Tests with additional fields
    const user1 = await users.addUser('kinginthenorth@gmail.com', 'jonsnowspassword1',  'Jon', 'Snow', 0);
    const user2 = await users.addUser('bobross@gmail.com', 'bobrosspassword1', 'Bob', 'Ross', 1);
    const u1 = await users.getUserByEmail('kinginthenorth@gmail.com');
    const u2 = await users.getUserByEmail('bobross@gmail.com');
    console.log('User collection successfully seeded!');
    const service1 = await services.createService(u2._id, u1._id, 'Maintenance', 'Annually scheduled maintenance.', 120);
    return;
};

main().catch(console.log);