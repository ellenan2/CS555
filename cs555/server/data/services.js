const mongoCollections = require("../config/mongoCollections");
const services = mongoCollections.services;
const { ObjectId } = require("mongodb");
const validation = require("../validation");

const exportedMethods = {
  async getServices(userId) {
    const serviceCollection = await services();
    const userServices = await serviceCollection.find({}).toArray();
    if (!userServices) throw "No ongoing services in database for user.";
    return userServices;
  },

  async getServiceById(serviceId) {
    serviceId = validation.checkId(serviceId, "Service ID");
    const serviceCollection = await services();
    const service = await serviceCollection.findOne({
      _id: ObjectId(serviceId),
    });
    if (!service) throw "Ongoing service not found.";
    return service;
  },

  async createService(customerId, workerId, title, desc, cost) {
    // validation needed
    const serviceCollection = await services();
    const service = await serviceCollection.findOne({
      customerId: customerId,
      workerId: workerId,
    });
    if (service) {
      return { serviceCreated: false };
    }

    let today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;
    const newService = {
      customerId: customerId,
      workerId: workerId,
      title: title,
      desc: desc,
      cost: cost,
      fromDate: today,
    };
    console.log(newService);
    const insertInfo = await serviceCollection.insertOne(newService);
    if (insertInfo.insertedCount === 0) throw "Failed to create service.";

    newService["id"] = insertInfo.insertedId;
    return { serviceCreated: true, createdService: newService };
  },

  async updateService() {
    const serviceCollection = await services();
    const userServices = await serviceCollection.findOne({
      _id: ObjectId(serviceId),
    });
    if (!userServices) throw "Ongoing service not found.";

    let updatedData = {};

    if (updatedService.customerId) {
      updatedServiceData.customerId = updatedService.customerId;
    }

    if (updatedService.workerId) {
      updatedServiceData.workerId = updatedService.workerId;
    }

    if (updatedService.title) {
      updatedServiceData.title = updatedService.title;
    }

    if (updatedService.desc) {
      updatedServiceData.desc = updatedService.desc;
    }

    if (updatedService.cost) {
      updatedServiceData.cost = updatedService.cost;
    }

    const updatedInfo = await serviceCollection.updateOne(
      { _id: ObjectId(serviceId) },
      { $set: updatedData }
    );
    if (updatedInfo.modifiedCount === 0) {
      throw "Could not update service successfully";
    }

    return await this.getServiceById(serviceId);
  },
};

module.exports = exportedMethods;
