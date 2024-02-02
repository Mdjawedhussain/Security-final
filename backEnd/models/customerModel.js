

const mongoose = require("mongoose");
const CustomerSchema = new mongoose.model("cust",{

    username:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    email: {
        type:String
    },
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    address:{
        type:String
    },
    phone:{
        type: String
    },
    isAdmin:{
        type: Boolean,
        default:false
    },
    isReporter:{
        type: Boolean,
        default:false
    },
    pp:{
        type:String
    },
    
    savelaters:[
        {type: mongoose.Schema.Types.ObjectId,
         ref: 'news'}
    ]

});
module.exports= CustomerSchema;