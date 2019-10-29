const events = require('../../models/events');
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

router.post('/addEvent', upload.single('eventFile'),async (req, res) => {
    const file = req.file;

    if (!file) {
        console.log('No image added and default one is used')
    }

    let newEvent = new events({
        image:file.filename,
        name: req.body.data.name,
        date: req.body.data.date,
        description: req.body.data.description,
        sponsor:req.body.data.sponsor
    })
    await newEvent.save();
    res.send(newEvent);
})

router.put('/updateEvent', async (req, res) => {
   let params = {
        name: req.body.name,
        date: req.body.date,
        description: req.body.description
        }
        for(let prop in params) if(!params[prop]) delete params[prop];
        console.log(params)

    let updatedEvent = await events.findByIdAndUpdate(req.body._id, params,{new:true});

    res.send(updatedEvent);
})

// Uploading image
router.put('/updateEventImage', upload.single('eventFile'), async (req, res,next) => {
    // console.log(randNum);
    const file = req.file;
    // console.log(file.filename);
    if (!file) {
        const error = new Error('No File')
        error.httpStatusCode = 400
        return next(error)
    }
    let eventImg = await events.findByIdAndUpdate(req.user._id, { image: file.filename }, { new: true });
    if (eventImg.result)
        res.send({Status:"Error"})
    else
        res.send({ status: 'done' });
})

router.delete('/deleteEvent',async(req,res)=>{
    const img = await events.findById(req.body._id,'image');
    if(img.image != 'eventDefault.png'){
    try {
        fs.unlinkSync('uploads/eventImages/'+img.image)
        console.log('file removed')
        //file removed
      } catch(err) {
        console.error(err)
      }
    }
    let deletedEvent = await events.findByIdAndDelete(req.body._id)
    res.send(deletedEvent);
})

module.exports = router;