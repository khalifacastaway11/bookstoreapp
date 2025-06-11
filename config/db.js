//db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

//const url = "mongodb+srv://khalifacastaway:asd100200@bookstore.4jgcl.mongodb.net/"
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((error) => {
    console.log("Error connecting to mongodb:", error);
  });
  

