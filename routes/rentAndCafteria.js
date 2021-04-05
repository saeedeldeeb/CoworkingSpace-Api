const cat = require('../models/category');
const forrent = require('../models/forRent');
const cafeteria = require('../models/cafeteria');
const express = require('express');
const router = express.Router();

router.post('/forRentAndCafetriaCategory', async (req, res) => {
    const rentObject = await cat.find({ "ref": req.body.ref });
    res.send(rentObject);
});

router.post('/forRentAndCafetriaItems', async (req, res) => {
    let result = null;
    const itemRef = await cat.findById(req.body._id);
    //  console.log(itemRef);
    console.log(itemRef.ref);
    switch (itemRef.ref) {
        case "rent":
            result = await forrent.find({ rentID: req.body._id });
            break;
        case "cafetria":
            result = await cafeteria.find({ cafeID: req.body._id });
            break;
    }
    res.send(result)
});

module.exports = router;
