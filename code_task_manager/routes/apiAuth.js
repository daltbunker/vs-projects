const express = require("express");
const apiAuthRouter = express.Router();
const User = require("../models/user");

apiAuthRouter.put('/:userId', (req, res, next) => {
    User.findOneAndUpdate(
        {_id: req.params.userId},
        req.body, 
        {new: true},
        (err, user) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(user)
        }
    )
})

module.exports = apiAuthRouter
