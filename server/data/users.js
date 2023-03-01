const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const { ObjectId } = require('mongodb');
const validation = require('../validation');

const exportedMethods = {
    async getAllUsers() {
        const userCollection = await users();
        const userList = await userCollection.find({}).toArray();
        if (!userList) throw 'No users in database.';
        return userList;
    },

    async getUserById(id) {
        id = validation.checkId(id, 'ID');
        const userCollection = await users();
        const user = await userCollection.findOne({ _id: ObjectId(id) });
        if (!user) throw 'User not found.';
        return user;
    },

    async addUser() {
        // TODO: Add user to database
    },

    async updateUser() {
        // TODO: Update user information
    },

};

module.exports = exportedMethods;


