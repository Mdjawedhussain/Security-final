//Importing libraries
const express = require('express');
const router = express.Router();
const auth = require("../auth/auth");
const searchSchema = require("../models/searchModel");

const upload = require("../uploads/upload");


router.post("/search/add", auth.verifyCustomer,upload.single('pro_image'),function(req,res){
    const newsname = req.body.newsname;
    
        
        //now it means we are ready for registerationconst
        
        // bcryptjs.hash(password,10,function(e,hashed_pw){
        const description = req.body.description;
        const cusId = req.CustomerInfo._id;
        const nimage = req.file.filename;
        const cdata = new searchSchema({
                newsname:newsname,
                description:description,
                nimage:nimage,
                cusId:cusId
            })
        cdata.save().then(function(){
            res.json({message:"Added Successfully!",success:true})
        })
        .catch(function(e){
            res.json({e})
        })

        // })
    })
;

router.get("/gym/mygym",auth.verifyCustomer,function (req,res) {

    searchSchema.find({cusId:req.CustomerInfo._id})
    .then(function(result){
        res.json(result)
    })
    .catch(function () {
        res.json({msg:"something went wrong!"});
    })
    
});






module.exports = router;
