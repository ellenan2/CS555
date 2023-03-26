const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const { ObjectId } = require("mongodb");
const validation = require("../validation");
const bcrypt = require("bcrypt");

const exportedMethods = {
  async getAllCustomers() {
    const userCollection = await users();
    const userList = await userCollection.find({}).toArray();
    if (!userList) throw "No users in database.";
    return userList;
  },

  async getCustomerByUser(username) {
    username = validation.checkString(username, "Username");
    const userCollection = await users();
    const user = await userCollection.findOne({ username: username });
    if (!user) throw "User not found.";
    return user;
  },

  async getCustomerByEmail(email) {
    email = valdiation.checkString(email, "Email");
    const userCollection = await users();
    const user = await userCollection.findOne({ email: email });
    if (!user) throw "User not found.";
    return user;
  }

  async getCustomerById(id) {
    id = validation.checkId(id, "ID");
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: ObjectId(id) });
    if (!user) throw "User not found.";
    return user;
  },

  async addCustomer(email, password, fName, lName) {
    const userCollection = await users();
    const customer = await userCollection.findOne({ email: email });
    if (user) {
      // Necessary for testing if user in db:
      // Returns Object containing boolean variable for frontend if user exists in db
      return { userGenerated: false };
    }
    // bcrypt hashing for passwords
    const h = await bcrypt.hash(password, 10);
    const newCustomer = {
      password: h,
      email: email,
      firstName: fName,
      lastName: lName,
      currentOffers: [],
      ongoingServices: [],
      currentRequsts: [],
      info: "Other user info TBD in schema, customer input required",
    };
    const insertInfo = await userCollection.insertOne(newUser);
    if (insertInfo.insertedCount === 0) throw "Failed to add user.";

    newUser["id"] = insertInfo.insertedId;
    return { userGenerated: true, createdUser: newUser };
  },

  async updateCustomer() {
    // TODO: Update user information
  },

  async addOffer(customerID, salesrepID, title, desc, offerDate, completionTime, cost) {
    customerID = validation.checkEmail(customerID, "Customer ID");
    salesrepID = validation.checkEmail(salesrepID, "Sales Rep ID");
    title = validation.checkString(title, "Title");
    desc = validation.checkString(desc, "Description");
    offerDate = validation.chcekDate(offerDate, "Offer Date");
    // Add validation for completionTime, cost
    
    const userCollection = await users();
    const customer = await this.getUserByEmail(customerID);
    if (!customer) throw "Customer not found with that email.";

    const salesRep = await this.getUserByEmail(salesrepID);
    if (!salesRep) throw "Sales Rep not found with that email.";

    for (let offer of customer.currentOffers) {
        if (salesrepID === offer.salesRep) throw "Ongoing offer to customer from same sales representative.";
    }

    const newOffer = {
        title: title,
        desc: desc,
        customer: customer.id,
        salesrep: salesRep.id,
        offerDate: offerDate,
        completionTime: completionTime,
        cost: cost
    }

    const updatedInfo = await userCollection.updateOne(
        {_id: ObjectId(customer.id)},
        {$push: {currentOffers: newOffer}}
    );
    if (!updatedInfo.matchedCount && !updatedInfo.modifiedCount) throw "Failed to add offer to customer.";
    
    return this.getCustomerById(customer.id);
  }

};

module.exports = exportedMethods;
