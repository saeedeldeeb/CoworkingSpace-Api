const cat = require('../models/category');
const express = require('express');
const router = express.Router();

router.post('/rentAndCafteria', async (req,res)=>{
const rentObject = await cat.find({"ref.collection":req.body.ref});
res.send(rentObject);
});

module.exports = router;