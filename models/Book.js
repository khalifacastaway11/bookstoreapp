//models/Book.js
const mongoose = require ("mongoose");

const bookSchema = new mongoose.Schema({
    // id: {
    //     type: Number,
    //     required: true,
    //     unique: true,
    // },

    title: {
        type: String,
        required: true,
    },

    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
      },
    price: {
        type: Number,
        required: true,
    },
    genre:{
        type:String,
        required:true
    },
    publishedDate:{
        type:Date
    },
    
    stock: {
        type: Number,
        default:0,
    },
})

bookSchema.index({title:"text",author:"text",description:"text"})

module.exports = mongoose.model("Book", bookSchema);

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2IwZjVkYTViNTMzOTZhZDk3NTY5OCIsImlhdCI6MTcyNDU4Mzc3MywiZXhwIjoxNzI0NTg3MzczfQ.uw-tskL9vt5RSBFKk3GzDyRbSnM5320psdywY6ONfQQ"