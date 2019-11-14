const RentRequests = require('../../models/rentRequests');
const CofeRequests = require('../../models/cofeRequests');
const auth = require('../../middleware/auth');
const isAdmin = require('../../middleware/admin');
const express = require('express');
const router = express.Router();

router.put('/markAsPaid',[auth,isAdmin], async (req, res) => {
    let isUpdated = false;
    switch (req.body.cat) {
        case 'rent':
            await RentRequests.findByIdAndUpdate(req.body._id, { paid: true }, (err, res) => {
                if (!err)
                    isUpdated = true;
            });
            break;
        case 'cofe':
            await CofeRequests.findByIdAndUpdate(req.body._id, { paid: true }, (err, res) => {
                if (!err)
                    isUpdated = true;
            });
            break;
        default:
            isUpdated = false;
            break;
    }

    res.send({ isUpdated });
})

router.put('/markAllAsPaid',[auth,isAdmin], async (req, res) => {
    let result;
    try {
        result = await RentRequests.updateMany({ paid: false }, { paid: true });
        result = await CofeRequests.updateMany({ paid: false }, { paid: true });
    } catch (err) {
        return res.status(400).send('Error in payment');
    }

    if (result.nModified > 0)
        res.send('Payment Done')
    else
        res.send('No Data Modified')
})

module.exports = router;