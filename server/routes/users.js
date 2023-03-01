const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const validation = require('../validation');
// const bcrypt = require('bcrypt');

router.post('/login', async (req,res) => {
    // TODO: User login
});

router.post('/signup', async (req,res) => {
    // TODO: User signup
});

router.get('/logout', async (req,res) => {
    // TODO: User logout
});


module.exports = router;