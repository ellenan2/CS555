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
    
    async createOffer(customerId, salesRepId, title, desc, cost) {
        const offersCollection = await offers();
        const offer = await offersCollection.findOne(
            { 
                customerId: customerId,
                salesRepId: salesRepId
            }
        );
        if (offer) {
            return { offerCreated: false };
        }

        let today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        const newOffer = {
            customerId: customerId,
            salesRepId: salesRepId,
            title: title,
            desc: desc,
            cost: cost,
            fromDate: today
        };

        const insertInfo = await offersCollection.insertOne(newOffer);
        if (insertInfo.insertedCount === 0) throw 'Failed to create offer.';

        newOffer['id'] = insertInfo.insertedId;
        return { offerCreated: true };
    },

    async updateOffer() {
        // TODO
    }
}

module.exports = exportedMethods;