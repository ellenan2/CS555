const mongoCollections = require('../config/mongoCollections');
const offers = mongoCollections.offers;
const { ObjectId } = require('mongodb');
const validation = require('../validation');

const exportedMethods = {
    async getOffers(userId) {
        const offersCollection = await offers();
        const userOffers = await offersCollection.find({}).toArray();
        if (!userOffers) throw 'No offers in database for user.';
        return userOffers;
    },

    async getOfferById(offerId) {
        offerId = validation.checkId(offerId, 'Offer ID');
        const offersCollection = await offers();
        const offer = await offersCollection.findOne({ _id: ObjectId(offerId) });
        if (!offer) throw 'Offer not found.';
        return offer;
    },
    
    async createOffer() {
        // TODO
    },

    async updateOffer() {
        // TODO
    }
}

module.exports = exportedMethods;