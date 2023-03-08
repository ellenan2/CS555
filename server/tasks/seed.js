const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;

const main = async() => {
    // Tests with additional fields
    const user2 = await users.addUser('kinginthenorth@gmail.com', 'jonsnowspassword1',  'Jon', 'Snow');
    console.log('User collection successfully seeded!');
};

main().catch(console.log);