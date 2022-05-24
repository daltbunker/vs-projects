const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

authRouter.post('/signup', (req, res, next) => {
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        if (user) {
            res.status(403)
            return next(new Error("That username is already taken"))
        }
        newUser = new User(req.body)
        newUser.save((err, savedUser) => {
            if (err) {
                res.status(500)
                return next
            }

            const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
            return res.status(201).send({token, user: savedUser.withoutPassword()})
        })
    })
})

authRouter.post('/login', (req, res, next) => {
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        if (!user) {
            res.status(403)
            return next(new Error("Incorrect username or password"))
        }

        user.checkPassword(req.body.password, (err, isMatch) => {
            if (err) {
                res.status(403)
                return next(new Error("Incorrect username or password"))
            }
            if (!isMatch) {
                res.status(403)
                return next(new Error("Incorrect username or password"))
            }
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.status(201).send({token, user: user.withoutPassword()})
        })
    })
})

module.exports = authRouter
