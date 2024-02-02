const express= require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer=require("../models/customerModel");
const auth=require("../auth/auth");
const router= new express.Router();
const upload=require("../uploads/uploads");



// route for customer registration
router.post("/customer/register", function(req,res){
    const username=req.body.username;
    Customer.findOne({username:username}).then(function(customerData){
        // if the username is in the database
        if (customerData!=null){
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
            const cdata=new Customer({
                username:username,
                password:hashed_pw,
                phone:phone,
                address:address,
                email:email,
                firstname:firstname,
                lastname:lastname
            })
            cdata.save().then(function(){
                res.json({message:"Registered Success!", success:true})
            }).catch(e=>{
                res.json({message:"Registered failed!", success:false})

            })

        })
    })

});




//login route- for customer
router.post("/customer/login",function(req,res){
    const username=req.body.username;
    console.log(username)

    //select * from customer where username ='admin'
    Customer.findOne({username:username}).then (function(customerData){
        // console.log(customerData);
        if(customerData===null){
            return res.json({message:"invalid"})
        }
        //need to check pasword
        const password=req.body.password;

        bcryptjs.compare(password,customerData.password, function(e,result){
            //true-correct pw, false-incorrect pw
            if (result===false){
                return res.json({message:"Invalid"})
            }
            //ticket generate=jsonwebtoken
            const token= jwt.sign({cusId:customerData._id,username:customerData.username }, "anysecretkey");
            res.json({token:token, message:"success",username:username, _id:customerData._id});
        })
    })
})

// get individual profile

router.get('/customer/:uid',auth.verifyCustomer, function(req,res){
    Customer.findOne({'_id':req.params.uid})
    .then((docs)=>{
        console.log(docs)
            res.json({data:docs, success:true})
    })

    });

// savelaters
    router.get('/savelaters/:uid',auth.verifyCustomer, function(req,res){
        Customer.findOne({'_id':req.params.uid})
        .populate("savelaters",'_id title thumbnail content')
        .then((docs)=>{
            console.log(docs)
                res.json({data:docs, success:true})
        })
    
        });


//customer profile update
// router.put("/customer/profile/update",auth.verifyCustomer,function(req,res){
//     // console.log(req.customerInfo);
//     const id =req.customerInfo._id;
//     const phone=req.body.phone;
//     Customer.updateOne({_id:id},{phone:phone})
//     .then(function(){
//         res.json({msg:"updated!"})
//     })
//     .catch(function(){
//         res.json({msg:"try again!"})
//     })

// })
//customer delete by customer themselves

// router.delete("/customer/profile/delete",auth.verifyCustomer,function(req,res){
//     const id =req.customerInfo._id;
//     Customer.findOneAndDelete(id)
//     .then(function(){
//         res.json({msg:"deleted!"})
//     })
//     .catch(function(){
//         res.json({msg:"try again!"})
//     })
    
   
// })


// add to savelater
router.post('/news/save', auth.verifyCustomer,(req,res)=>{
    const user = req.customerInfo._id
    const news_id = req.body.newsId
    Customer.findByIdAndUpdate(user,{
            $push:{savelaters: news_id}
    }).then((docs)=>{
        res.json({success:true})
    }).catch(e=>{
        res.json({success:false})

    })

})
// remove from savelater
router.post('/news/unsave', auth.verifyCustomer,(req,res)=>{
    const user = req.customerInfo._id
    const news_id = req.body.newsId
    Customer.findByIdAndUpdate(user,{
            $pull:{savelaters: news_id}
    }).then((docs)=>{
        res.json({success:true})
    }).catch(e=>{
        res.json({success:false})

    })

})
























module.exports= router;