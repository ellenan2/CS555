const express = require('express');
const router = express.Router();
const { getSalesBySalesRep } = require('../data/billing');

router.get('/', async (req, res) => {
  try {
    const sales = await getSalesBySalesRep(req.user.email);
    res.json(sales);
  } catch (e) {
    console.error(e);
    res.status(500).send('Error fetching sales');
  }
});

module.exports = router;
