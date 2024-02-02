const express = require("express");
const router = new express.Router();
const NewsSchema = require("../models/newsModel");
const auth = require("../auth/auth");
const upload = require("../uploads/uploads");
const { route } = require("express/lib/application");
// const newsSchema = require("../models/newsModel");

// get news
router.get("/news", auth.verifyCustomer, (req, res) => {
  NewsSchema.find({ isBreaking: true })
    .then((doc) => {
      res.json({ data: doc, success: true });
    })
    .catch((e) => {
      res.json({ message: "Error", success: false });
    });
});

// get admin news
router.get("/adminnews", auth.verifyAdmin, (req, res) => {
  NewsSchema.find()
    .then((doc) => {
      res.json({ data: doc, success: true });
    })
    .catch((e) => {
      res.json({ message: "Error", success: false });
    });
});

// get news by category
router.get("/news/category/:category", auth.verifyCustomer, (req, res) => {
  const category = req.params.category;
  if (category == "national") {
    NewsSchema.find({ isNational: true })
      .then((doc) => {
        res.json({ data: doc, success: true });
      })
      .catch((e) => {
        res.json({ message: "Error", success: false });
      });
  } else if (category == "international") {
    NewsSchema.find({ isInternational: true })
      .then((doc) => {
        res.json({ data: doc, success: true });
      })
      .catch((e) => {
        res.json({ message: "Error", success: false });
      });
  } else if (category == "sports") {
    NewsSchema.find({ isSports: true })
      .then((doc) => {
        res.json({ data: doc, success: true });
      })
      .catch((e) => {
        res.json({ message: "Error", success: false });
      });
  } else if (category == "business") {
    NewsSchema.find({ isBusiness: true })
      .then((doc) => {
        res.json({ data: doc, success: true });
      })
      .catch((e) => {
        res.json({ message: "Error", success: false });
      });
  }
});

const newspost = (thumbnail = {});

// inserting news
router.post(
  "/news/insert",
  auth.verifyAdmin,
  upload.single("thumbnail"),
  function (req, res) {
    console.log("you hit me", req.file);
    if (req.file == undefined) {
      return res.json({
        message: "invalid file format",
        success: false,
      });
    }

    const createdBy = req.adminInfo._id;
    const title = req.body.title;
    const excerpt = req.body.excerpt;
    const content = req.body.content;
    const thumbnail = req.file.filename;
    const isNational = req.body.isNational;
    const isInternational = req.body.isInternational;
    const isBreaking = req.body.isBreaking;
    const isSports = req.body.isSports;
    const isBusiness = req.body.isBusiness;

    const data = new NewsSchema({
      createdBy: createdBy,
      title: title,
      excerpt: excerpt,
      content: content,
      thumbnail: thumbnail,
      isNational: isNational,
      isInternational: isInternational,
      isBreaking: isBreaking,
      isSports: isSports,
      isBusiness: isBusiness,
    });
    data
      .save()
      .then(function (err) {
        res.json({ msg: "ok", success: true });
      })
      .catch((e) => {
        res.json({ msg: "error", success: false });
      });
  }
);

// get single news

router.get("/news/:nid", auth.verifyCustomer, function (req, res) {
  NewsSchema.findOne({ '_id': req.params.nid })
  .populate("Comments.PostedBy", "_id username")
  .then((docs) => {
    console.log(docs);
      res.json({ data: docs, success: true });
    }).catch(e=>{
        res.json({ message: "error", success: false });
    })
      
});

// delete news
router.delete("/news/delete/:nid", auth.verifyAdmin, (req, res) => {
  console.log(req.params.nid);

  NewsSchema.findByIdAndDelete(req.params.nid, function (err, docs) {
    if (!err) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});

// update news
router.put(
  "/news/update/:nid",
  auth.verifyAdmin,
  upload.single("thumbnail"),
  (req, res) => {
    if (req.file == undefined) {
      const title = req.body.title;
      const excerpt = req.body.excerpt;
      const content = req.body.content;

      const isNational = req.body.isNational;
      const isInternational = req.body.isInternational;
      const isBreaking = req.body.isBreaking;
      const isSports = req.body.isSports;
      const isBusiness = req.body.isBusiness;

      console.log(
        title,
        content,
        excerpt,
        isBusiness,
        isNational,
        isInternational,
        isSports,
        isBreaking
      );

      NewsSchema.findOneAndUpdate(
        { _id: req.params.nid },
        {
          title: title,
          excerpt: excerpt,
          content: content,
          isNational: isNational,
          isInternational: isInternational,
          isBreaking: isBreaking,
          isSports: isSports,
          isBusiness: isBusiness,
        }
      )
        .then((err, docs) => {
          res.json({ success: true });
        })
        .catch((e) => {
          res.json({ success: false });
        });
    } else {
      const title = req.body.title;
      const excerpt = req.body.excerpt;
      const content = req.body.content;
      const thumbnail = req.file.filename;
      const isNational = req.body.isNational;
      const isInternational = req.body.isInternational;
      const isBreaking = req.body.isBreaking;
      const isSports = req.body.isSports;
      const isBusiness = req.body.isBusiness;

      console.log(
        title,
        content,
        thumbnail,
        excerpt,
        isBusiness,
        isNational,
        isInternational,
        isSports,
        isBreaking
      );

      NewsSchema.findOneAndUpdate(
        { _id: req.params.nid },
        {
          title: title,
          excerpt: excerpt,
          content: content,
          thumbnail: thumbnail,
          isNational: isNational,
          isInternational: isInternational,
          isBreaking: isBreaking,
          isSports: isSports,
          isBusiness: isBusiness,
        }
      )
        .then((err, docs) => {
          res.json({ success: true });
        })
        .catch((e) => {
          res.json({ success: false });
        });
    }
  }
);

// search news

router.get("/search/:query", (req, res) => {
  const gquery = req.params.query;
  const regex = new RegExp(escapeRegex(gquery), "gi");
  NewsSchema.find(
    { $or: [{ title: regex }, { content: regex }, { excerpt: regex }] },
    (err, docs) => {
      res.json({ data: docs, success: true });
    }
  );
  // .catch(e=>{

  //     res.json({ 'message': 'Error', success:false, query:req.params.query })
  // })
});

// for search and Prevention for DDos Attack

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

router.post("/news/comment", auth.verifyCustomer, (req, res) => {
  const comment = { Text: req.body.commentText, PostedBy: req.customerInfo._id };

  console.log(comment, req.body.newsid);

  NewsSchema.findByIdAndUpdate(
    req.body.newsid,

    {
      $push: { Comments: comment },
    }
  )
    .populate("Comments.PostedBy", "_id username")

    // .populate("PostedBy", "_id Name")

    .then((docs) => {
      console.log("posted comment");
      res.json({ success: true, commentcount: docs.Comments.length });

    })
    .catch((e) => {
      res.json({ message: e, success: false });
    });
});

module.exports = router;
