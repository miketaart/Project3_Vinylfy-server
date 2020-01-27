const mongoose = require("mongoose");
const Schema = mongoose.Schema

User = mongoose.model("users", new Schema({
    username: {type: String, required: true},
    password: {
        type: String, 
        required: [true, "Password is required"],
    },
    
    email: {
        type: String, 
        required: [true, "Correct email is required"],
        validate: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/
    }
},
{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
}))

module.exports = User