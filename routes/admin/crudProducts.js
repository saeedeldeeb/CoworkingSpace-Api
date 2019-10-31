const forrent = require('../../models/forRent');
const cafeteria = require('../../models/cafeteria');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');
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

router.post('/addProduct', [auth,admin],upload.single('proFile'), async (req, res) => {
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
    if(data.cat == 'rent'){
     newProd = new forrent({
        image: file.filename,
        name: data.name,
        info:data.info,
        price:data.price,
        availabilityInStock:data.availabilityInStock,
        rentID:data._id
    })
}else if(data.cat == 'cafetria'){
     newProd = new cafeteria({
        image: file.filename,
        name: data.name,
        price:data.price,
        availability:data.availability,
        cafeID:data._id
    })
}
    await newProd.save();
    res.send(newProd);
})

router.put('/updateProduct', [auth,admin],async (req, res) => {
    let product;
    if(req.body.cat == 'rent'){
     product = await forrent.findByIdAndUpdate(req.body._id, {name:req.body.name},{new:true})
    }else if(req.body.cat == 'cafetria'){
     product = await cafeteria.findByIdAndUpdate(req.body._id, {name:req.body.name},{new:true})
    }
    res.send(product)
})

// Uploading image
router.put('/updateProductImage',[auth,admin], upload.single('proFile'), async (req, res) => {
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
    if (product.result)
        res.send({Status:"Error"})
    else
        res.send({ status: 'done' });
})

router.delete('/deleteProduct',[auth,admin],async(req,res)=>{
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