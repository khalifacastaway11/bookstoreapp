//models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);

  //specify admin roles only to spesific emails
  const AdminEmails=["www.khalifacastaway@gmail.com"]
  if(AdminEmails.includes(this.email)){
    console.log(` setting role to admin role for email: ${this.email}`)
      this.role="admin";
  }else{
    console.log(` setting role to user role for email: ${this.email}`)
  }

  next();
});

// Method to compare hashed password
userSchema.methods.comparePasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
