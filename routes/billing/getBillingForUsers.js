const RentRequests = require('../../models/rentRequests');
const CofeRequests = require('../../models/cofeRequests');
const auth = require('../../middleware/auth');
const express = require('express');
const router = express.Router();

let drinkTotal = rentTotal = 0;
router.post('/lastRequests',auth, async (req, res) => {
    let rents, drinks;
    
    if (!req.body._id) {
        return res.status(400).send('ID Error')
    }
    rents = await RentRequests.find({ demanderID: req.body._id })
        .populate('productID');

    drinks = await CofeRequests.find({ demanderID: req.body._id })
        .populate('productID');

    totalSum(rents, drinks);
    res.send({ drinkTotal, rentTotal, result:rents.concat(drinks) });
    drinkTotal = rentTotal = 0;
})

//total price
function totalSum(rents, drinks) {
    if (rents.length > 0)
        rents.forEach((obj) => {
            if (obj.paid)
                return;
            rentTotal += obj.NumofHours * obj.NumofItems * obj.productID.price;
        })
    console.log(rentTotal);

    drinks.forEach((obj) => {
        if (obj.paid)
            return;
        drinkTotal += obj.NumofItems * obj.productID.price;
    })
    console.log(drinkTotal);
}

module.exports = router;