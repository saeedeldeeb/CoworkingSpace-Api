const event = require('../models/events');
const auth = require('../middleware/auth')
const express = require('express');
const router = express.Router();

router.get('/allEvents', async (req, res) => {
    const allEvents = await event.find().sort('date');
    res.send(allEvents);
});

router.post('/interestinEvent', auth, async (req, res) => {
    const interestedUsers = await event.findOne({ _id: req.body.event_ID }).select('guests -_id');    
    const isUserInterest = interestedUsers.guests.includes(req.user._id);
    res.send(isUserInterest);
});

router.post('/addGuest', auth, async (req, res) => {
    console.log(req.body.event_ID)
    const newGuest = await event.findByIdAndUpdate(req.body.event_ID, 
        { $addToSet: { guests: req.user._id } },{new:true});
    if (newGuest != null)
        res.send(newGuest);
    else
        res.send('something error');
});

module.exports = router;