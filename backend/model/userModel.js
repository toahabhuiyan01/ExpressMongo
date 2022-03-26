const mongoose = require("mongoose");

function min(value) {
    if(value.length < 3) return false;
    return true;
}
function max(value) {
    if(value.langth > 20) return false;
    return true;
}
function req(value) {
    if(!value.length) return false;
    return true;
}

const validators = [
    {validator: req, msg: "This field is rquired"},
    {validator: min, msg: "Too short, minimum length 3 required"},
    {validator: max, msg: "Length should not exceed 20"},
]

const userSchema = mongoose.Schema({
    name: {
        type: String,
        validate: validators
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
        unique: true
        
    },
    password: {
        type: String,
        validate: validators
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