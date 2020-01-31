const mongoose = require("mongoose");
const Schema = mongoose.Schema

let User = new Schema({

        email: {
            type: String,
            required: [true, "Correct email is required"],
            validate: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        }

    },

    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt"
        }
    }

)

module.exports = mongoose.model('Users', User)