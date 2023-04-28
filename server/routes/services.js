const express = require('express');
const router = express.Router();
const userData = require('../data/users');
const servicesData = require('../data/services');
const validation = require('../validation');

// Get all services
router.get('/', async (req, res) => {
  // console.log(req.session.email);
  // console.log("I don't make it here");
  // if (!req.session.email) return res.status(403).json("User not logged in.");
  // try {
  //   console.log(email);
  //   let email = validation.checkEmail(req.session.email);
  //   const user = await userData.getUserByEmail(email);
  //   const listIds = user.ongoingServices;
  //   let services = [];
  //   for (let i = 0; i < listIds.length; ++i) {
  //     services.push(await servicesData.getServiceById(listIds[i]));
  //   }
  //   res.status(200).json(services);
  // } catch (e) {
  //   res.status(404).json({ message: e });
  // }
  try {
    const services = await servicesData.getServices();
    res.status(200).json(services);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

// GET a single service by ID
router.get('/:id', async (req, res) => {
  try {
    const service = await servicesData.getServiceById(req.params.id);
    res.json(service);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

// POST a new service
router.post('/', async (req, res) => {
  const { customerId, workerId, title, desc, cost } = req.body;
  if (!customerId || !workerId || !title || !desc || !cost) {
    res.status(400).json({ message: 'Invalid request body' });
    return;
  }
  try {
    const result = await servicesData.createService(customerId, workerId, title, desc, cost);
    if (result.serviceCreated) {
      res.status(201).json({ message: 'Service created successfully' });
    } else {
      res.status(400).json({ message: 'Service already exists' });
    }
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

// PUT an update to an existing service by ID
router.put('/:id', async (req, res) => {
  try {
    const service = await servicesData.getServiceById(req.params.id);
    const updatedService = { ...service, ...req.body };
    const result = await servicesData.updateService(req.params.id, updatedService);
    res.json({ message: 'Service updated successfully' });
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

module.exports = router;
