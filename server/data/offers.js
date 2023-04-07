const mongoCollections = require('../config/mongoCollections');
const offers = mongoCollections.offers;
const { ObjectId } = require('mongodb');
const validation = require('../validation');

const exportedMethods = {
  async getOffers() {
    const offersCollection = await offers();
    const offerList = await offersCollection.find({}).toArray();
    if (!offerList) throw 'No current offers in database for user.';
    return offerList;
  },

  async getOfferById(offerId) {
    offerId = validation.checkId(offerId, 'Offer ID');

    const offersCollection = await offers();
    const offer = await offersCollection.findOne({ _id: ObjectId(offerId) });
    if (!offer) throw 'Offer not found.';
    return offer;
  },

  async createOffer(customerId, salesRepId, title, description, price) {
    validation.checkString(title, 'Title');
    validation.checkString(description, 'Description');
    validation.checkCost(price, 'Price');

    const offersCollection = await offers();
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    const newOffer = {
        customerId: customerId,
        salesRepId: salesRepId,
        title: title,
        description: description,
        fromDate: today,
        price: price
    };

    const insertInfo = await offersCollection.insertOne(newOffer);
    if (insertInfo.insertedCount === 0) throw 'Could not add offer';

    newOffer['id'] = insertInfo.insertedId;
    return { offerCreated: true, createdOffer: newOffer };
  },

  async updateOffer(id, updatedOffer) {
    if (!id) throw 'You must provide an id to update';
    if (!updatedOffer || typeof updatedOffer !== 'object') {
      throw 'You must provide an updated offer object';
    }

    const offersCollection = await offers();
    const updatedOfferData = {};

    if (updatedOffer.title && typeof updatedOffer.title === 'string') {
      updatedOfferData.title = updatedOffer.title;
    }
    if (
      updatedOffer.description &&
      typeof updatedOffer.description === 'string'
    ) {
      updatedOfferData.description = updatedOffer.description;
    }
    if (updatedOffer.price && typeof updatedOffer.price === 'number') {
      updatedOfferData.price = updatedOffer.price;
    }

    const updateInfo = await offersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedOfferData }
    );
    if (updateInfo.modifiedCount === 0) throw 'Could not update offer';

    return await this.getOfferById(id);
  },

  async deleteOffer(id) {
    if (!id) throw 'You must provide an id to delete';
    if (typeof id !== 'string' || !ObjectId.isValid(id)) {
      throw 'Invalid id';
    }

    const offersCollection = await offers();
    const deleteInfo = await offersCollection.deleteOne({ _id: new ObjectId(id) });
    if (deleteInfo.deletedCount === 0) throw `Could not delete offer with id ${id}`;
  },
};

module.exports = exportedMethods;
