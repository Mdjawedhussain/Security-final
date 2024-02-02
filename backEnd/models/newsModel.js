const mongoose = require("mongoose");

const newsSchema = new mongoose.model("news", {
  title: {
    type: String,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  excerpt: {
    type: String,
  },

  content: {
    type: String,
  },
  thumbnail: {
    type: String,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "cust",
  },
  isBreaking: {
    type: Boolean,
    default: false,
  },
  isNational: {
    type: Boolean,
    default: false,
  },
  isInternational: {
    type: Boolean,
    default: false,
  },
  isSports: {
    type: Boolean,
    default: false,
  },
  isBusiness: {
    type: Boolean,
    default: false,
  },
  Comments: [
    {
      Text: String,

      PostedBy: {
        type: mongoose.Schema.Types.ObjectId,

        ref: "cust",
      },

      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});
module.exports = newsSchema;

// const mongoose = require("mongoose");
// const Product = new mongoose.Schema({
//     title: {
//         type : String
//     },
//     createdBy : {
//         type: String
//     },
//     content : {
//         type : Number
//     },
//     createdby : {
//         type : Number
//     },
//     custId:{
//         type : mongoose.Schema.Types.ObjectId,
//         ref : 'reporter'
//     }
// })
// module.exports = mongoose.model("news, news);
