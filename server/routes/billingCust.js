const mongoCollections = require('../config/mongoCollections');
const data = require('../data');
const userData = data.users;
const billingData = data.billing;
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const bills = await billingData.getbilling()
    res.status(200).json(bills);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const bills = await billingData.getbillingById(req.params.id);
    res.status(200).json(bills);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

router.post("/", async (req, res) => {
  const { title, desc, total } = req.body;
  if (!title || !desc || !total) {
    res.status(400).json({ message: "Invalid request body" });
    return;
  }
  try {
    const newbills = await billingData.createbilling(
      title,
      desc,
      total
    );
    res.status(201).json(newbills);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedbills = await billingData.updatebilling(req.params.id, req.body);
    res.json(updatedbills);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await billsData.deletebilling(req.params.id);
    res.json({ message: "bills deleted successfully" });
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

module.exports = router;
