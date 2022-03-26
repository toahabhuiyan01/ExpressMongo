const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

const registerUser = asyncHandler( async (req, res) => {
    const {name, email, password, gender} = req.body;

    const newUser = new User({name, email, password, gender});
    const error = await newUser.validateSync();
    console.log(error);

    if(error) {
        res.status(400).json(error.message);
    }
    const userExists = await User.findOne({email});
    
    if(userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const  user = await User.create({
        name,
        email,
        password: hashedPassword,
        gender
    });

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        console.log(user);
        res.status(400);
        throw new Error("Invalid user data");
    }
})

const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("Invalid Credentials");
    }
})

const getMe = asyncHandler( async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        email
    })
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}