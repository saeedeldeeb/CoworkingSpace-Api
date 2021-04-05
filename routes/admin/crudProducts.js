const forrent = require('../../models/forRent');
const cafeteria = require('../../models/cafeteria');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');
const superAdmin = require('../../middleware/superAdmin');
const fs = require('fs');
const multer = require('multer');
const express = require('express');
const router = express.Router();

var randNum = Math.floor(Math.random() * Math.floor(1000));

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads/catImages')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${randNum}Coworking_${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

router.post('/addProduct', [auth,admin,superAdmin],upload.single('proFile'), async (req, res) => {
    // console.log(randNum);
    const file = req.file;
    // console.log(file.filename);
    if (!file) {
        const error = new Error('No File')
        error.httpStatusCode = 400
        return next(error)
    }
    let newProd;
    let data = JSON.parse(req.body.data);
    console.log(data)
    if(data.cat == 'rent'){
     newProd = new forrent({
        image: file.filename,
        name: data.name,
        info:data.info,
        price:data.price,
        availabilityInStock:data.availabilityInStock,
        rentID:data.rentID
    })
}else if(data.cat == 'cafetria'){
     newProd = new cafeteria({
        image: file.filename,
        name: data.name,
        price:data.price,
        availability:data.availability,
        cafeID:data.cafeID
    })
}
    await newProd.save();
    res.send(newProd);
})

router.put('/updateProduct', [auth,admin,superAdmin],async (req, res) => {
    params = {
        name: req.body.name,
        info:req.body.info,
        price:req.body.price,
        availabilityInStock:req.body.availabilityInStock,
        availability:req.body.availability,
        cafeID:req.body.rentID,
        rentID:req.body.cafeID
    };
    for (let prop in params) if (!params[prop]) delete params[prop];
    let product;
    if(req.body.cat == 'rent'){
     product = await forrent.findByIdAndUpdate(req.body._id, params,{new:true})
    }else if(req.body.cat == 'cafetria'){
     product = await cafeteria.findByIdAndUpdate(req.body._id, params,{new:true})
    }
    res.send(product)
})

// Uploading image
router.put('/updateProductImage',[auth,admin,superAdmin], upload.single('proFile'), async (req, res) => {
    // console.log(randNum);
    const file = req.file;
    // console.log(file.filename);
    if (!file) {
        const error = new Error('No File')
        error.httpStatusCode = 400
        return next(error)
    }
    let product;
    if(req.body.cat == 'rent'){
     product = await forrent.findByIdAndUpdate(req.body._id, { image: file.filename },{new:true})
    }else if(req.body.cat == 'cafetria'){
     product = await cafeteria.findByIdAndUpdate(req.body._id, { image: file.filename },{new:true})
    }

        res.send({ status: 'done' });
})

router.delete('/deleteProduct',[auth,admin,superAdmin],async(req,res)=>{
    let product,img;
    if(req.body.cat == 'rent'){
     img = await forrent.findById(req.body._id,'image');
     product = await forrent.findByIdAndDelete(req.body._id)
    }else if(req.body.cat == 'cafetria'){
     img = await cafeteria.findById(req.body._id,'image');
     product = await cafeteria.findByIdAndDelete(req.body._id)
    }
    try {
        fs.unlinkSync('uploads/catImages/'+img.image)
        console.log('file removed')
        //file removed
      } catch(err) {
        console.error(err)
      }

    res.send(product);
})

module.exports = router;