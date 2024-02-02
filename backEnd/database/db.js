const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
 
mongoose.connect('mongodb://localhost:27017/easy_news', {
    useNewUrlParser: true,
    useUnifiedTopology : true
})