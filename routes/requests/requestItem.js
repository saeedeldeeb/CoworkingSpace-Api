const RentRequests = require('../../models/rentRequests');
const CofeRequests = require('../../models/cofeRequests');
const auth = require('../../middleware/auth');
const express = require('express');
const router = express.Router();

let request;
router.post('/rentItem',auth,async (req,res)=>{
 request = new RentRequests({
    demanderID:req.user._id,
    productID:req.body.productId,
    NumofHours:req.body.NumofHours,
    NumofItems:req.body.NumofItems,
    place: req.body.place
 });
await request.save(function(err){
    if(err){
         console.log(err);
        res.send({status:err}) 
    } else
    res.send({status:"done"});});
})

router.post('/getCofe',auth,async(req,res)=>{
 request = new CofeRequests({
    demanderID:req.user._id,
    productID:req.body.productId,
    customDesc:req.body.customDesc,
    NumofItems:req.body.NumofItems,
    place: req.body.place
 });
 await request.save(function(err){
    if(err){
        console.log(err);
       res.send({status:err}) 
   } else
   res.send({status:"done"});});
 
})

module.exports = router;