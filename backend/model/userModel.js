const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        min: [3, "Must be at least 3 char long, got {VALUE}"],
        max: [20, "Name length should not exceed 20"]
    },
    email: {
        type: String,
        validate: {
            validator: function(email) {
                return String(email)
                .toLowerCase()
                .match(
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
            },
            message: "Use a valid email address."
        },
        required: [true, "Email is required"],
        unique: true
        
    },
    password: {
        type: String,
        required: [true, "Name is required"],
        min: [3, "Password must be at least 3 char long, got {VALUE}"],
        max: [20, "Password length should not exceed 20"]
    },
    gender: {
        type: String,
        enum: {
            values: ["Male", "Female", "Custom"],
            message: '{VALUE} is not Gender'
        }
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);