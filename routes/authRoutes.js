const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    })

    res.status(201).json({
    message: 'User created successfully',
    user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
    }
    })

  } catch (error) {
    console.error('Signup error:', error)

    res.status(500).json({
      message: 'Failed to create user',
      error: error.message
    })
  }
})


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // 1. Email se user ko MongoDB me search karo
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        message: 'Invalid email or password'
      })
    }

    //  Enter kiya hua password aur hashed password compare karo
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    )

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: 'Invalid email or password'
      })
    }

    // YAHAN JWT TOKEN BANEGА
    const token = jwt.sign(
      {
        userId: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    )

    //  Login successful
   res.json({
      message: 'Login successful',
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })

  } catch (error) {
    console.error('Login error:', error)

    res.status(500).json({
      message: 'Login failed',
      error: error.message
    })
  }
})



module.exports = router