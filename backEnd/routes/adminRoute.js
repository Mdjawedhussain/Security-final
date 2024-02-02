const express= require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const admin=require("../models/adminModel");


const router= new express. Router();
// route for admin registration
router.post("/admin/register", function(req,res){

    const username=req.body.username;
    admin.findOne({username:username}).then(function(adminData){
        // if the username is in the database
        if (adminData!=null){
            res.json({mesage:"username already exists"})
            return;
        }
        // now it means we are ready for registration
        const password= req.body.password;
        bcryptjs.hash(password, 10, function(e,hashed_pw){
            const address=req.body.address;
            const phone=req.body.phone;
            const email=req.body.email;
            const firstname=req.body.firstname;
            const lastname=req.body. lastname;
            const adata=new admin({
                username:username,
                password:hashed_pw,
                phone:phone,
                address:address,
                email:email,
                firstname:firstname,
                lastname:lastname
            })
            adata.save().then(function(){
                res.json({message:"Registered Success!"})
            })

        })
    })

});




//login route- for admin
router.post("/admin/login",function(req,res){
    const username=req.body.username;
    //select * from reporter where username ='admin'
    admin.findOne({username:username}).then (function(adminData){
        // console.log(reporterData);
        if(adminData===null){
            return res.json({message:"invalid"})
        }
        //need to check pasword
        const password=req.body.password;
        bcryptjs.compare(password,adminData.password, function(e,result){
            //true-correct pw, false-incorrect pw
            if (result===false){
                return res.json({message:"Invalid"})
            }
            //ticket generate=jsonwebtoken
            const token= jwt.sign({admId:adminData._id}, "anysecretkey");
            res.json({token:token, message:"success"});
        })
    })
})
router.delete("/admin/delete",function(req,res){
    res.json({'msg':req.AdminInfo});
})

//profile update 

router.put("/admin/profile/update",function(req,res){
    // console.log(req.AdminInfo._id);

    const id= req.AdminInfo._id;
    const phone = req.body.phone;
    const address =req.body.address;
    AdminSchema.updateOne({id:id},{phone:phone,address:address})
    .then(function(){
        res.json({msg:"update!"})
    })
    .catch(function(){
        res.json({msg:"try again!"})
    })
})

// admin delete by admin themselves

router.delete("/delete/by/admin/",function(req,res){

    const id= req.AdminInfo._id;
    AdminSchema.findOneAndDelete(id)
    .then(function(){
        res.json({msg:"delete successfully"})
    })
    .catch(function(){
        res.json({msg:"not delete "})
    })
});


// router.post("/news/upload",upload.single('ab_cd'),function(req,res){
//     // console.log(req.file);
// if(File.file==undefined){
//     return res.json({
//         message:"only jpg / png allow"
//     })
// }
// })

module.exports= router;