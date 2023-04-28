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
            return { userGenerated: false, createdUser: user };
        }
        // bcrypt hashing for passwords
        const h = await bcrypt.hash(password, 10);
        let newUser = {};
        if (userType === "0") {
            newUser = {
                password: h,
                email: email,
                phone: phone,
                firstName: fName,
                lastName: lName,
                currentOffers: [],
                ongoingServices: [],
                pendingRequests: [],
                userType: userType
            };
        } else if (userType === "1") {
            newUser = {
                password: h,
                email: email,
                phone: phone,
                firstName: fName,
                lastName: lName,
                currentOffers: [],
                currentBilling: [],
                userType: userType
            };
        } else  {
            newUser = {
                password: h,
                email: email,
                phone: phone,
                firstName: fName,
                lastName: lName,
                ongoingServices: [],
                userType: userType
            };
        } 
        

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

    async addOffer(customerId, offer) {
        // TODO: Send offer to customer
    },

    async addService(customerId, offer) {
        // TODO: Add service request to customer
    }
};

module.exports = exportedMethods;


