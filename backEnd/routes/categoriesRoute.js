const express = require("express");
const router = new express.Router();
const CategoriesSchema = require("../models/categoriesModel");
const auth = require("../auth/auth");

// inserting categories
// router.post('/categories/insert', auth.verifyreporter, function(req,res){
//     const userId = req.reporterInfo._id;
//     const cdate=req.body.cdate;
//     const ctitle = req.body.ctitle;
//     const ccreatedBy = req.body.ccreatedBy;


//     const data=new CategoriesSchema({
//         userId:userId,
//         cdate :cdate,
//         ctitle:ctitle,
//         ccreatedBy:ccreatedBy

//     });
//     data.save().then(function(){
//         res.json({msg:"ok"})
//     }).catch((e)=>{
//         res.json({msg:"error"})

//     })
// })
module.exports = router;