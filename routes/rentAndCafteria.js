const cat = require('../models/category');
const forrent = require('../models/forRent');
const cafeteria = require('../models/cafeteria');
const express = require('express');
const router = express.Router();

router.post('/forRentAndCafetriaCategory', async (req, res) => {
    const rentObject = await cat.find({ "ref.collection": req.body.ref });
    res.send(rentObject);
});

router.post('/forRentAndCafetriaItems', async (req, res) => {
    let result = null;
    const itemRef = await cat.findById(req.body._id,'ref');
    console.log(itemRef);
    console.log(itemRef.ref.collection);

    switch (itemRef.ref.collection) {
        case "rent":
            console.log(itemRef.ref.class);
            result = await forrent.find({ class: itemRef.ref.class });
            break;
        case "cafetria":
            result = await cafeteria.find({ class: itemRef.ref.class });
            break;
    }
    res.send(result)
});

module.exports = router;