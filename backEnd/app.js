const express = require("express");
const app= express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
require("./database/db");
const customerRoute= require("./routes/customerRoute");
const adminRoute= require("./routes/adminRoute");
const newsRoute= require("./routes/newsRoute");
const categoriesRoute= require("./routes/categoriesRoute");
const commentRoute= require("./routes/commentRoute");

app.use(express.static(__dirname+'/images'))
const cors = require("cors") //Newly added
app.use(cors()) // Newly added
app.use(customerRoute);
// app.use(reporterRoute);
// app.use(adminRoute);
app.use(newsRoute);
// app.use(categoriesRoute);
// app.use(commentRoute);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});