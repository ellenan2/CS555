const express = require("express");
const router = express.Router();
const {
  getOffers,
  getOfferById,
  createOffer,
  updateOfferById,
  deleteOfferById,
} = require("../data/offers");

router.get("/", async (req, res) => {
  try {
    const offers = await getOffers();
    res.status(200).json(offers);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const offer = await getOfferById(req.params.id);
    res.status(200).json(offer);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

router.post("/", async (req, res) => {
  const { customerId, salesRepId, title, desc, cost } = req.body;
  if (!customerId || !salesRepId || !title || !desc || !cost) {
    res.status(400).json({ message: "Invalid request body" });
    return;
  }
  try {
    const newOffer = await createOffer(
      customerId,
      salesRepId,
      title,
      desc,
      cost
    );
    res.status(201).json(newOffer);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedOffer = await updateOfferById(req.params.id, req.body);
    res.json(updatedOffer);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deleteOfferById(req.params.id);
    res.json({ message: "Offer deleted successfully" });
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

module.exports = router;
