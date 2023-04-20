const mongoCollections = require('../config/mongoCollections');
const billing = mongoCollections.billing;
const { ObjectId } = require('mongodb');
const validation = require('../validation');

const exportedMethods = {
  async getbilling() {
    const billingCollection = await billing();
    const billingList = await billingCollection.find({}).toArray();
    if (!billingList) throw 'No current billing in database for user.';
    return billingList;
  },

  async getbillingById(billingId) {
    billingId = validation.checkId(billingId, 'billing ID');

    const billingCollection = await billing();
    const billing = await billingCollection.findOne({ _id: ObjectId(billingId) });
    if (!billing) throw 'billing not found.';
    return billing;
  },

  async createbilling(title, description, Total) {
    validation.checkString(title, 'Title');
    validation.checkString(description, 'Description');
    validation.checkCost(Total, 'Total');

    const billingCollection = await billing();
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    const newbilling = {
        title: title,
        description: description,
        fromDate: today,
        Total: Total
    };

    const insertInfo = await billingCollection.insertOne(newbilling);
    if (insertInfo.insertedCount === 0) throw 'Could not add billing';

    newbilling['id'] = insertInfo.insertedId;
    return { billingCreated: true, createdbilling: newbilling };
  },

  async updatebilling(id, updatedbilling) {
    if (!id) throw 'You must provide an id to update';
    if (!updatedbilling || typeof updatedbilling !== 'object') {
      throw 'You must provide an updated billing object';
    }

    const billingCollection = await billing();
    const updatedbillingData = {};

    if (updatedbilling.title && typeof updatedbilling.title === 'string') {
      updatedbillingData.title = updatedbilling.title;
    }
    if (
      updatedbilling.description &&
      typeof updatedbilling.description === 'string'
    ) {
      updatedbillingData.description = updatedbilling.description;
    }
    if (updatedbilling.Total && typeof updatedbilling.Total === 'number') {
      updatedbillingData.Total = updatedbilling.Total;
    }

    const updateInfo = await billingCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedbillingData }
    );
    if (updateInfo.modifiedCount === 0) throw 'Could not update billing';

    return await this.getbillingById(id);
  },

  async deletebilling(id) {
    if (!id) throw 'You must provide an id to delete';
    if (typeof id !== 'string' || !ObjectId.isValid(id)) {
      throw 'Invalid id';
    }

    const billingCollection = await billing();
    const deleteInfo = await billingCollection.deleteOne({ _id: new ObjectId(id) });
    if (deleteInfo.deletedCount === 0) throw `Could not delete billing with id ${id}`;
  },
};

module.exports = exportedMethods;
