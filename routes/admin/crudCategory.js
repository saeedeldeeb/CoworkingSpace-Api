const Cat = require('../../models/category');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');
const superAdmin = require('../../middleware/superAdmin');
const multer = require('multer');
const fs = require('fs');
const express = require('express');
const router = express.Router();

var randNum = Math.floor(Math.random() * Math.floor(1000));

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads/catImages')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${randNum}CoworkingCategory_${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

router.post('/addCategory', [auth,admin,superAdmin],upload.single('catFile'), async (req, res,next) => {
    // console.log(randNum);
    const file = req.file;

    if (!file) {
        const error = new Error('No File')
        error.httpStatusCode = 400
        return next(error)
    }
    let newCat = new Cat({
        image: file.filename,
        name: JSON.parse(req.body.data).name,
        ref:  JSON.parse(req.body.data).ref
    })
    await newCat.save();
    res.send(newCat);
})

router.put('/updateCategory', [auth,admin,superAdmin],upload.single('catFile'), async (req, res) => {
    let updatedCategory = await Cat.findByIdAndUpdate(req.body._id, {name:req.body.name}, { new: true })
    res.send(updatedCategory)
})

// Uploading image
router.put('/updateCategoryImage', [auth,admin],upload.single('catFile'), async (req, res,next) => {
    // console.log(randNum);
    const file = req.file;
    // console.log(file.filename);
    if (!file) {
        const error = new Error('No File')
        error.httpStatusCode = 400
        return next(error)
    }
    let cat = await Cat.findByIdAndUpdate(req.body._id, { image: file.filename }, { new: true });
    if (cat.result)
        res.send({Status:"Error"})
    else
        res.send({ status: 'done' });
})

router.delete('/deleteCategory',[auth,admin,superAdmin],async(req,res)=>{
    const img = await Cat.findById(req.body._id,'image');
    try {
        fs.unlinkSync('uploads/catImages/'+img.image)
        console.log('file removed')
        //file removed
      } catch(err) {
        console.error(err)
      }
    let cat = await Cat.findByIdAndDelete(req.body._id)
    res.send(cat);
})
module.exports = router;