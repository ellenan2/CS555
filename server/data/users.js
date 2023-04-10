const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const { ObjectId } = require('mongodb');
const validation = require('../validation');
const bcrypt = require('bcrypt');

const exportedMethods = {
    async getAllUsers() {
        const userCollection = await users();
        const userList = await userCollection.find({}).toArray();
        if (!userList) throw 'No users in database.';
        return userList;
    },

    async getUserByUser(username) {
        username = validation.checkString(username, 'Username');
        const userCollection = await users();
        const user = await userCollection.findOne({ username: username });
        if (!user) throw 'User not found.';
        return user;
    },

    async getUserById(id) {
        id = validation.checkId(id, 'ID');
        const userCollection = await users();
        const user = await userCollection.findOne({ _id: ObjectId(id) });
        if (!user) throw 'User not found.';
        return user;
    },
    async getUserBillingHistoryById(id) {
        const user = await this.getUserById(id);
        if(!user) throw 'getUserById failed';
        const billingHistory = user.billingHistory;
        return billingHistory;
    },

    async getUserByEmail(email) {
        email = validation.checkEmail(email, 'Email');
        const userCollection = await users();
        const user = await userCollection.findOne({ email: email });
        if (!user) throw 'User not found.';
        return user;
    },

    async addUser(email, phone, password, fName, lName, userType) {
        const userCollection = await users();
        const user = await userCollection.findOne({ email: email });
        if (user) {
            // Necessary for testing if user in db:
            // Returns Object containing boolean variable for frontend if user exists in db
            return { userGenerated: false };
        }
        // bcrypt hashing for passwords
        const h = await bcrypt.hash(password, 10);
        const newUser = {
            password: h,
            email: email,
            phone: phone,
            firstName: fName,
            lastName: lName,
            currentOffers: [],
            ongoingServices: [],
            pendingRequests: [],
            billingHistory: [],
            userType: userType
        };

        const insertInfo = await userCollection.insertOne(newUser);
        if (insertInfo.insertedCount === 0) throw 'Failed to add user.';

        newUser['id'] = insertInfo.insertedId;
        return { userGenerated: true, createdUser: newUser };
    },

    async updateUser(userId, userInfo) {
        // TODO: Update user information
        let {_id, firstName, lastName, password, email, info, currentOffers, ongoingServices, pendingRequests, userType} = userObj;
        id = validation.checkId( id, "User ID");
    },



};

module.exports = exportedMethods;


