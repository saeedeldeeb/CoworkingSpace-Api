const events = require('../../models/events');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');
const multer = require('multer');
const fs = require('fs');
const express = require('express');
const router = express.Router();

var randNum = Math.floor(Math.random() * Math.floor(1000));

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads/eventImages')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${randNum}CoworkingEvents_${file.originalname}`)
    }
})
const upload = multer({ storage: storage })

router.post('/addEvent',[auth,admin], upload.single('eventFile'), async (req, res) => {
    const file = req.file;
    let fileName = "eventDefault.png";
    if (!file) {
        console.log('No image added and default one is used')
    } else fileName = file.filename;
    console.log(JSON.parse(req.body.data));
    
    let data = JSON.parse(req.body.data);
    let newEvent = new events({
        image: fileName,
        name: data.name,
        date: data.date,
        description: data.description,
        sponsor: data.sponsor
    })
    await newEvent.save();
    console.log(newEvent)

    res.send(newEvent);
})

router.put('/updateEvent', [auth,admin],async (req, res) => {
    let params = {
        name: req.body.name,
        date: req.body.date,
        description: req.body.description
    }
    for (let prop in params) if (!params[prop]) delete params[prop];
    console.log(params)

    let updatedEvent = await events.findByIdAndUpdate(req.body._id, params, { new: true });

    res.send(updatedEvent);
})

// Uploading image
router.put('/updateEventImage', [auth,admin],upload.single('eventFile'), async (req, res, next) => {
    // console.log(randNum);
    const file = req.file;
    // console.log(file.filename);
    if (!file) {
        const error = new Error('No File')
        error.httpStatusCode = 400
        return next(error)
    }
    let eventImg = await events.findByIdAndUpdate(req.body._id, { image: file.filename }, { new: true });
    if (eventImg.result)
        res.send({ Status: "Error" })
    else
        res.send({ Status: 'Done' });
})

router.delete('/deleteEvent', [auth,admin],async (req, res) => {
    const img = await events.findById(req.body._id, 'image');
    if (img.image != 'eventDefault.png') {
        try {
            fs.unlinkSync('uploads/eventImages/' + img.image)
            console.log('file removed')
            //file removed
        } catch (err) {
            console.error(err)
        }
    }
    let deletedEvent = await events.findByIdAndDelete(req.body._id)
    res.send(deletedEvent);
})

module.exports = router;