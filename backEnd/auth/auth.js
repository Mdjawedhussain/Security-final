const jwt=require("jsonwebtoken");
const Customer=require("../models/customerModel");


module.exports.verifyCustomer=function(req,res,next){
    try{
    const tokens =req.headers.authorization.split(" ")[1];
  const data =  jwt.verify(tokens,"anysecretkey");
    // console.log(data.cusId);
    Customer.findOne({_id:data.cusId}).then (function(result){
        // console.log(result);
        req.customerInfo=result;
        next();
    })
    .catch(function(e){
        res.json({error:"Invalid access"})
    })
}
catch(e){
    res.json({error:"Invalid access"})
}
}



module.exports.verifyAdmin=function(req,res,next){
    try{
    const tokens =req.headers.authorization.split(" ")[1];
  const data =  jwt.verify(tokens,"anysecretkey");
  console.log(data.username)
    // console.log(data.cusId);
    Customer.findOne({_id:data.cusId}).then (function(result){
        // console.log(result);
        if(data.username=='admin'){
            req.customerInfo=result;
            req.adminInfo=result;
            next();
        }
        else{
        res.json({error:"Invalid access"})

        }
        
    })
    .catch(function(e){
        res.json({error:"Invalid access"})
    })
}
catch(e){
    res.json({error:"Invalid access"})
}
}