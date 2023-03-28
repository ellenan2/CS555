const mongoCollections = require('../config/mongoCollections');
const offers = mongoCollections.offers;
const { ObjectId } = require('mongodb');
const validation = require('../validation');

const exportedMethods = {
  async getOffers() {
    const offersCollection = await offers();
    const offerList = await offersCollection.find({}).toArray();
    return offerList;
  },

  async getOfferById(id) {
    if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string' || !ObjectId.isValid(id)) {
      throw 'Invalid id';
    }

    const offersCollection = await offers();
    const offer = await offersCollection.findOne({ _id: new ObjectId(id) });
    if (!offer) throw `Offer with id ${id} not found`;

    return offer;
  },

  async createOffer(title, description, price) {
    if (!title || typeof title !== 'string') throw 'You must provide a title';
    if (!description || typeof description !== 'string') {
      throw 'You must provide a description';
    }
    if (!price || typeof price !== 'number' || price <= 0) {
      throw 'You must provide a valid price';
    }

    const offersCollection = await offers();
    const newOffer = {
      title: title,
      description: description,
      price: price,
    };
    const insertInfo = await offersCollection.insertOne(newOffer);
    if (insertInfo.insertedCount === 0) throw 'Could not add offer';

    const newId = insertInfo.insertedId;
    const offer = await this.getOfferById(newId.toString());
    return offer;
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
