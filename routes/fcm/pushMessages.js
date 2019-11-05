const FCM = require('fcm-node');
const serverKey = require('../../config/serviceAccountKey.json') //put the generated private key path here
const auth = require('../../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.post('/pushTo', (req, res) => {
    let user;
    mongoose.connection.db.collection('users', async (err, collection) => {
        user = await collection.find({ role: req.body.role }).toArray();
        pushNotifi("c1aeMd0U1JRtsi3pBy_Ygw:APA91bFTm9TWSu5_7uoeZFq9MxVFw4pMFmKcErbSyY56l4ZbFylt6q1t-qaJHPMHR_aqZcYG4fXgXVGFcIWEHBTsjNgLegpU8TDzmc8cta-pNf9c1MOm8iGkSgqPrN45dO_ITCc4RspV")
        res.send(user);
    })
})

var fcm = new FCM(serverKey)

function pushNotifi(toTokens) {
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: toTokens,
        notification: {
            title: 'Title of your push notification',
            body: 'خووووووووود يسطا'
        },
    }
    fcm.send(message, function (err, response) {
        if (err) {
            console.log("Something has gone wrong!")
        } else {
            console.log("Successfully sent with response: ", response)
        }
    })
}

module.exports = router;