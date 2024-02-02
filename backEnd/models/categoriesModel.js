const mongoose = require("mongoose");
// const Reporter = require("./reporterModel")
// const Reporter = require("./reporterModel")
const categoriesSchema = new mongoose.model("cat",{

    ctitle:{
        type: String,

    },
    ccreatedby:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "cust",
    },

    cdate:{
        type:String,
    }
});
module.exports= categoriesSchema; 