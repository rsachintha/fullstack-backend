const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/userModel')

//Generating a token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

//Creating a new user
const createUser = asyncHandler(async (req, res) => {
    const { userName, password } = req.body

    if (!userName || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if user exists
    const userExists = await User.findOne({ userName })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user
    const user = await User.create({
        userName,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            userName: user.userName,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//Login a user
const loginUser = asyncHandler(async (req, res) => {
    const { userName, password } = req.body

    //Check for user name
    const user = await User.findOne({ userName })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            userName: user.userName,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

module.exports = {
    createUser,
    loginUser
}