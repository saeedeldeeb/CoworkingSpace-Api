const event = require('../models/events');
const express = require('express');
const router = express.Router();

router.get('/allEvents', async (req, res) => {
    const allEvents = await event.find().sort('date');
    res.send(allEvents);
});

module.exports = router;